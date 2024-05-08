import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { appInsightsClient } from "lib/logger";
import { Auth, useAuth } from "lib/msal";
import { useTagManager } from "lib/tag-manager";
import { UserAccount, useSessionData, useUserAccount } from "models/global";
import { formSteps } from "models/sttl";
import { AuthRequiredError } from "app/error";

type ContextValue = {
	isLoadingData?: boolean;
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
	const auth = useAuth({ mustLogInPaths: /^\/(sttl|dashboard)\/?.*$/ });
	const { correlationId, resetCorrelationId } = useSessionData();
	const { dataLayer } = useTagManager(process.env.GTM_CODE);
	const userAccount = useUserAccount({ auth, correlationId });
	const correlation = React.useMemo(
		() => ({ correlationId, userId: auth?.userId, contactId: userAccount?.contactId }),
		[correlationId, auth, userAccount]
	);

	// on page change focus on root element, track the page
	React.useEffect(() => {
		document.getElementById("focus-root")?.focus();
		document.title = getPageTitle(pathname);
		appInsightsClient?.trackPageView({ uri: pathname, name: document.title, properties: correlation });
		dataLayer?.trackPage(pathname, document.title);
	}, [pathname, dataLayer, appInsightsClient]);

	// is logged in event
	React.useEffect(() => {
		if (auth?.userId) dataLayer?.push({ event: "userLoggedIn" });
	}, [auth?.userId, dataLayer]);

	// redirects
	React.useEffect(() => {
		if (!auth?.userId) return;
		if (["/"].includes(pathname)) router.replace("/dashboard");
		if (["/sttl"].includes(pathname)) router.replace("/sttl/terms-and-conditions");
	}, [pathname, auth?.userId]);

	// return value
	const value = React.useMemo(() => {
		if (auth?.hasError || userAccount?.hasError) throw new AuthRequiredError();
		if (!userAccount) return { isLoadingData: true };
		return { dataLayer, auth, userAccount, correlationId, resetCorrelationId };
	}, [dataLayer, auth, userAccount, correlationId, resetCorrelationId]);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// useful way of accessing the context
export const useAppContext = () => React.useContext(AppContext);

// get the page title
const getPageTitle = (pathname: string) => {
	const slug = pathname?.split("/").pop();
	const step = formSteps.find(step => step.route === slug)?.label;
	return step ? `${step} - STTL` : "Short Term Tourist Letting - Fáilte Ireland";
};
