import { AuthenticationResult, InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { usePathname } from "next/navigation";
import React from "react";
import { logger } from "../logger";

// REFERENCES:
// Acquire silent token: https://learn.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-acquire-token?tabs=javascript2
// SSO Silent requests: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md

const scopes = [process.env.B2C_CLIENT_ID];
// use client_id as scope https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/1506

export const useAuth = () => {
	const { instance, accounts, inProgress } = useMsal();
	const [claimsData, setClaimsData] = React.useState({ userId: "", provider: "", email: "", isNewUser: false });
	const [redirectUrl, setRedirectUrl] = React.useState<string>("");
	const [hasAuthError, setHasAuthError] = React.useState(false);
	const isAuthenticated = useIsAuthenticated();
	const isLoggedIn = React.useMemo(() => isAuthenticated && !!claimsData?.userId, [isAuthenticated, claimsData]);
	const isSetup = React.useRef(false);
	const pathname = usePathname();

	// On first load, get token claims from B2C.
	React.useEffect(() => {
		if (window["Cypress"]) return;
		if (inProgress === InteractionStatus.None && !isSetup.current) {
			isSetup.current = true;
			getAuthenticationResult()
				.then(response => {
					const claims = getClaimsData(response);
					setClaimsData(claims);
					const state = parseState(response.state);
					if (state.redirectUrl) setRedirectUrl(state.redirectUrl);
				})
				.catch(e => {
					const state = stringifyState({ redirectUrl: pathname });
					handleAuthenticationError(e, state);
				});
		}
	}, [inProgress, isAuthenticated]);

	// get an authentication response. first try from the redirect response, then from SSO silent request
	const getAuthenticationResult = async () => {
		if (!accounts[0]) throw new InteractionRequiredAuthError("No account present");
		const response = await instance.handleRedirectPromise();
		if (response) return response;
		const request = { scopes, account: accounts[0] };
		return instance.ssoSilent(request);
	};

	// if token experied redirect user to B2C
	const handleAuthenticationError = (e: Error, state?: string) => {
		if (e instanceof InteractionRequiredAuthError) {
			window.onbeforeunload = null;
			instance.acquireTokenRedirect({ scopes, state: state || "" });
		} else {
			setHasAuthError(true);
			logger.error(e);
			console.log(e); // eslint-disable-line no-console
		}
	};

	// get b2c claims data from a silent request
	const getClaimsData = (response: AuthenticationResult) => {
		if (!response) return { userId: null, provider: null, email: null, isNewUser: null, ttl: null };
		const userId = response.idTokenClaims["sub"];
		const provider = response.idTokenClaims["iss"];
		const isNewUser = response.idTokenClaims["newClaimsPrincipalCreated"];
		const ttl = response.idTokenClaims["exp"] - response.idTokenClaims["nbf"];
		const email = response.idTokenClaims["email"] || "";
		return { userId, provider, isNewUser, ttl, email };
	};

	// memoize return
	return React.useMemo(() => {
		// expose a function to request a token
		const getToken = async () => {
			if (window["Cypress"] && ["local", "dev"].includes(process.env.APP_ENV)) return "00000000-0000-0000-0000-000000000000";
			if (!claimsData.userId) return null;
			const request = { scopes, account: accounts[0] };
			try {
				const response = await instance.acquireTokenSilent(request);
				return response.idToken;
			} catch (e) {
				handleAuthenticationError(e);
			}
		};

		// redirect the user to B2C for signing in
		const login = () => {
			window.onbeforeunload = null;
			const loginRequest = { scopes };
			instance?.loginRedirect(loginRequest).catch(e => {
				logger.log(e);
			});
		};

		// redirect the user to B2C for sign out
		const logout = async () => {
			const tokenRequest = { scopes, account: accounts[0] };
			window.onbeforeunload = null;
			try {
				const { idToken } = await instance.acquireTokenSilent(tokenRequest);
				instance?.logoutRedirect({ idTokenHint: idToken });
			} catch (e) {
				instance?.logoutRedirect();
			}
		};

		return { isLoggedIn, redirectUrl, hasAuthError, login, logout, getToken, ...claimsData };
	}, [isLoggedIn, redirectUrl, claimsData, hasAuthError]);
};

// utils
const stringifyState = (state: Record<string, string>) => JSON.stringify(state);
const parseState = (state: string) => JSON.parse(state || "{}");

export type Auth = ReturnType<typeof useAuth>;
