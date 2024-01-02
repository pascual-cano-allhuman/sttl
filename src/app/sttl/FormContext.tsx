import React from "react";
import { useAppContext } from "app/AppContext";
import { useSttlForm } from "models/sttl";
import { logger } from "lib/logger";
import { useFormRequests } from "models/sttl";

type ContextProps = { children: React.ReactNode };
type ContextValue = {
	sttlForm: ReturnType<typeof useSttlForm>;
	correlation: { userId?: string; correlationId?: string; contactId?: string };
};
const Context = React.createContext({} as ContextValue);

export const FormContextProvider = ({ children }: ContextProps) => {
	const { auth, correlationId, userAccount, resetCorrelationId } = useAppContext();
	const { userId, hasAuthError, getToken } = auth || {}; // getToken
	const correlation = { userId, correlationId, contactId: userAccount?.contactId };

	// check we have all the data we need
	React.useEffect(() => {
		if (!userAccount?.contactId) return;
		logger.event("STTL Application Start", correlation);
	}, [hasAuthError, userAccount]);

	// attach token to requests
	const formRequests = useFormRequests({ getToken, correlation });
	const { appendFeesToOrder, createPaymentRequest, sendPaymentResponse, sendZeroPaymentOrder, retrieveOrderResult } = formRequests;
	const { loadSaveAndResumeData, updateSaveAndResume, clearSaveAndResumeData, sendQAUpsell } = formRequests;

	// manage the new applications form
	const sttlForm = useSttlForm({
		userAccount,
		resetCorrelationId,
		appendFeesToOrder,
		createPaymentRequest,
		sendPaymentResponse,
		sendZeroPaymentOrder,
		retrieveOrderResult,
		sendQAUpsell,
		loadSaveAndResumeData,
		updateSaveAndResume,
		clearSaveAndResumeData
	});

	// return value
	const value = React.useMemo(() => ({ sttlForm, correlation }), [sttlForm, correlation]);
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

// useful way of accessing the context
export const useFormContext = () => React.useContext(Context);
