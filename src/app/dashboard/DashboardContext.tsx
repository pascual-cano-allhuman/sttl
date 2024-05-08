import React from "react";
import { useMiddleware } from "middleware";
import { useDashboard, DashboardHook } from "models/dashboard";
import { useAppContext } from "app/AppContext";

type ContextProps = { children: React.ReactNode };
type ContextValue = {
	dashboard?: DashboardHook;
	isLoadingData?: boolean;
	openInvoice: (invoiceUrl: string) => void;
};
const Context = React.createContext({} as ContextValue);

export const DashboardContext = ({ children }: ContextProps) => {
	// requests
	const { auth, correlationId, userAccount } = useAppContext();
	const { userId, isLoggedIn, getToken } = auth || {};
	const correlation = { userId, correlationId, contactId: userAccount?.contactId };
	const { loadSaveAndResumeData, clearSaveAndResumeData, loadDashboardPayments } = useMiddleware({ getToken, correlation });

	// hook
	const dashboard = useDashboard({
		isLoggedIn,
		loadSaveAndResumeData,
		clearSaveAndResumeData,
		loadDashboardPayments
	});

	// return value
	const value = React.useMemo(() => {
		const openInvoice = async (invoiceUrl: string) => {
			const token = await auth?.getToken?.();
			window.open(`${invoiceUrl}?authorization=${token || ""}`);
		};
		return { dashboard, openInvoice };
	}, [dashboard, auth]);
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

// useful way of accessing the context
export const useDashboardContext = () => React.useContext(Context);
