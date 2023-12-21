import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { appInsightsClient } from "lib/logger";
import { Auth, useAuth } from "lib/msal";
import { useTagManager } from "lib/tag-manager";
import { useSessionData } from "models/global";

type ContextValue = {
	correlationId?: string;
	auth: Auth;
	dataLayer?: any;
};

const AppContext = React.createContext({} as ContextValue);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const router = useRouter();
	const auth = useAuth();
	const { userId, redirectUrl } = auth;
	const { correlationId } = useSessionData();
	const { dataLayer } = useTagManager(process.env.GTM_CODE);

	// on page change focus on root element, track the page
	React.useEffect(() => {
		document.getElementById("focus-root")?.focus();
		document.title = getPageTitle(pathname);
		appInsightsClient?.trackPageView({ uri: pathname, name: document.title, properties: { correlationId, userId } });
		dataLayer?.trackPage(pathname, document.title);
	}, [pathname]);

	// is logged in event
	React.useEffect(() => {
		if (userId) dataLayer?.push({ event: "userLoggedIn" });
	}, [userId, dataLayer]);

	// redirects
	React.useEffect(() => {
		if (!userId) return;
		if (pathname === "/") router.replace(redirectUrl > "/" ? redirectUrl : "/sttl");
	}, [pathname, userId, redirectUrl]);

	// return value
	const value = React.useMemo(() => {
		return { dataLayer, auth, correlationId };
	}, [dataLayer, auth, correlationId]);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// useful way of accessing the context
export const useAppContext = () => React.useContext(AppContext);

// index steps by route
const STEPS = [];
export const FORM_STEP_BY_ROUTE = STEPS.reduce((acc, step) => {
	acc[step.route] = step;
	return acc;
}, {});

// get the page title
const getPageTitle = (pathname: string) => {
	const workflow = pathname.split("/").filter(Boolean)[0] || "";
	const workflowName = workflow.charAt(0).toUpperCase() + workflow.slice(1);
	const slug = pathname.split("/").filter(Boolean).pop();
	const step = FORM_STEP_BY_ROUTE[slug]?.label;
	return step ? `${step} - QA ${workflowName}` : "Short Term Tourist Letting - Fáilte Ireland";
};
