import React from "react";
import { AuthenticationResult, InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { usePathname, useRouter } from "next/navigation";
import { b2cPolicies } from "settings/authConfig";
import { logger } from "../logger";

// REFERENCES:
// Acquire silent token: https://learn.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-acquire-token?tabs=javascript2
// SSO Silent requests: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md

const scopes = [process.env.B2C_CLIENT_ID];
// use client_id as scope https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/1506

type Claims = { userId: string; provider?: string; email?: string; isNewUser?: boolean };
type Params = { mustLogInPaths?: RegExp };

export const useAuth = (params?: Params) => {
	const { mustLogInPaths } = params || {};
	const { instance, accounts, inProgress } = useMsal();
	const [claimsData, setClaimsData] = React.useState<Claims>();
	const [hasError, setHasAuthError] = React.useState(false);
	const isLoggedIn = React.useMemo(() => (claimsData ? !!claimsData?.userId : undefined), [claimsData]);
	const isSetup = React.useRef(false);
	const pathname = usePathname();
	const router = useRouter();

	// On first load, get token claims from B2C.
	React.useEffect(() => {
		if (window["Cypress"]) return;
		// if (process.env.SHOULD_MOCK_MIDDLEWARE) return setClaimsData({ userId: "00000000-0000-0000-0000-000000000000" });
		if (inProgress === InteractionStatus.None && !isSetup.current) {
			isSetup.current = true;
			getAuthenticationResult()
				// successful authentication, setup the claims
				.then(response => {
					const account = accounts.find(acc => acc.localAccountId === response.account.localAccountId) || accounts[0];
					if (account) instance?.setActiveAccount(account);
					const state = parseState(response.state);
					if (state.redirectUrl && state.redirectUrl !== pathname) router.replace(state.redirectUrl);
					const claims = getClaimsData(response);
					setClaimsData(claims);
				})
				// handle authentication errors
				.catch(e => {
					const state = stringifyState({ redirectUrl: pathname });
					handleAuthenticationError(e, state);
					setClaimsData({ userId: null, provider: null, email: null, isNewUser: null });
				});
		}
	}, [inProgress]);

	// get an authentication response. first try from the redirect response, then from silent requests
	const getAuthenticationResult = async () => {
		// check first if we had a response attached to a redirect
		const response = await instance.handleRedirectPromise();
		if (response) return response;
		// if not try to authenticate through a silent request
		const request = { scopes };
		return instance.ssoSilent(request);
	};

	// check why the authentication failed and redirect the user to B2C if needed
	const handleAuthenticationError = (e: Error, state?: string) => {
		if (e instanceof InteractionRequiredAuthError) {
			// the user needs to sign in, exclude some pages though
			if (!mustLogInPaths || mustLogInPaths?.test(pathname)) {
				window.onbeforeunload = null;
				instance.acquireTokenRedirect({ scopes, state: state || "" });
			}
		} else {
			// unexpected error, log it and set the error state
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
			// if (process.env.SHOULD_MOCK_MIDDLEWARE) return "00000000-0000-0000-0000-000000000000";
			if (!claimsData?.userId) return null;
			const account = instance.getActiveAccount() || accounts[0];
			const request = { scopes, account };
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
				setHasAuthError(true);
				logger.error(e);
				console.log(e); // eslint-disable-line no-console
			});
		};

		// redirect the user to B2C for signing up
		const signUp = () => {
			const { authority } = b2cPolicies.authorities?.signUp || {};
			const loginRequest = { scopes, authority };
			instance?.loginRedirect(loginRequest).catch(e => {
				logger.error(e);
				console.log(e); // eslint-disable-line no-console
			});
		};

		// redirect the user to B2C for sign out
		const logout = async () => {
			router.push("/");
			const account = instance.getActiveAccount() || accounts[0];
			const tokenRequest = { scopes, account };
			window.onbeforeunload = null;
			try {
				const { idToken } = await instance.acquireTokenSilent(tokenRequest);
				await instance?.logoutRedirect({ idTokenHint: idToken });
			} catch (e) {
				await instance?.logoutRedirect();
			}
		};

		// has the initial setup been done
		if (isLoggedIn === undefined) return;
		return { isLoggedIn, hasError, login, logout, signUp, getToken, ...claimsData };
	}, [isLoggedIn, claimsData, hasError, claimsData]);
};

// utils
const stringifyState = (state: Record<string, string>) => JSON.stringify(state);
const parseState = (state: string) => JSON.parse(state || "{}");

export type Auth = ReturnType<typeof useAuth>;
