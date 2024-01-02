import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { appInsightsClient } from "lib/logger";
import { Auth, useAuth } from "lib/msal";
import { useTagManager } from "lib/tag-manager";
import { UserAccount, useSessionData, useUserAccount } from "models/global";
import { AuthRequiredError } from "app/error";

type ContextValue = {
	isLoadingAccount?: boolean;
	correlationId?: string;
	auth?: Auth;
	dataLayer?: any;
	userAccount?: UserAccount;
	isNewUser?: boolean;
	resetCorrelationId?: () => void;
};

const AppContext = React.createContext({} as ContextValue);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const router = useRouter();
	const auth = useAuth();
	const { userId, redirectUrl, getToken, provider, isNewUser, hasAuthError } = auth;
	const { correlationId, resetCorrelationId } = useSessionData();
	const { dataLayer } = useTagManager(process.env.GTM_CODE);
	const { userAccount, hasUserAccountError } = useUserAccount({ getToken, userId, correlationId, provider, isNewUser });

	// on page change focus on root element, track the page
	React.useEffect(() => {
		document.getElementById("focus-root")?.focus();
		document.title = getPageTitle(pathname);
		const correlation = { correlationId, userId, contactId: userAccount?.contactId };
		appInsightsClient?.trackPageView({ uri: pathname, name: document.title, properties: correlation });
		dataLayer?.trackPage(pathname, document.title);
	}, [pathname]);

	// is logged in event
	React.useEffect(() => {
		if (userId) dataLayer?.push({ event: "userLoggedIn" });
	}, [userId, dataLayer]);

	// redirects
	React.useEffect(() => {
		if (!userId) return;
		if (["/"].includes(pathname)) router.replace(redirectUrl > "/" ? redirectUrl : "/choose");
	}, [pathname, userId, redirectUrl]);

	// return value
	const value = React.useMemo(() => {
		if (hasAuthError || hasUserAccountError) throw new AuthRequiredError();
		if (!userAccount) return { auth, isLoadingAccount: true };
		return { dataLayer, auth, userAccount, correlationId, isNewUser, resetCorrelationId };
	}, [dataLayer, auth, userAccount, correlationId, isNewUser, resetCorrelationId]);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// useful way of accessing the context
export const useAppContext = () => React.useContext(AppContext);

// get the page title
const getPageTitle = (pathname: string) => {
	const slug = pathname?.split("/").pop();
	const step = PAGES.find(step => step.route === slug)?.label;
	return step ? `${step} | STTL - Fáilte Ireland Trade Portal` : "STTL - Fáilte Ireland Trade Portal";
};

const PAGES = [
	{ label: "Short Term Tourist Letting", route: "choose" },
	{ label: "Choose the best account for you", route: "sttl-info" }
];
