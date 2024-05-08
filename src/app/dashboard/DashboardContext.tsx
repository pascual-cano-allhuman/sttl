import React from "react";
import { useMiddleware } from "middleware";
import { useDashboard, DashboardHook } from "models/dashboard";
import { useAppContext } from "app/AppContext";

type ContextProps = { children: React.ReactNode };
type ContextValue = {
	dashboard?: DashboardHook;
	isLoadingData?: boolean;
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
		return { dashboard };
	}, [dashboard]);
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

// useful way of accessing the context
export const useDashboardContext = () => React.useContext(Context);
