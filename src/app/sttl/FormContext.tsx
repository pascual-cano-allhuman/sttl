import React from "react";
import { useAppContext } from "app/AppContext";
import { useSttlForm } from "models/sttl";
import { logger } from "lib/logger";
import { useFormRequests } from "models/sttl";

type ContextProps = { children: React.ReactNode };
const Context = React.createContext({} as any);

export const FormContextProvider = ({ children }: ContextProps) => {
	const { auth, correlationId, userAccount, resetCorrelationId, isContextLoading } = useAppContext();
	const { userId, hasAuthError, getToken } = auth || {}; // getToken
	const correlation = { userId, correlationId, contactId: userAccount?.contactId };

	// check we have all the data we need
	React.useEffect(() => {
		if (!userAccount?.contactId) return;
		logger.event("STTL Application Start", correlation);
	}, [hasAuthError, userAccount]);

	// attach token to requests
	const { loadSaveAndResumeData } = useFormRequests({ getToken, correlation });

	// manage the new applications form
	const sttlForm = useSttlForm({
		userAccount,
		resetCorrelationId,
		appendFeesToOrder: async () => null,
		createPaymentRequest: async () => null,
		sendPaymentResponse: async () => null,
		sendOrderToServiceBus: async () => null,
		retrieveOrderResult: async () => null,
		sendQAUpsell: async () => {},
		loadSaveAndResumeData,
		updateSaveAndResume: () => {},
		deleteSaveAndResumeData: async () => {}
	});

	// Decide if a message needs to be shown
	const loadingMessage = React.useMemo(() => {
		if (isContextLoading) return LOADING_MESSAGE;
		if (sttlForm?.isSubmittingData) return PROCESSING_MESSAGE;
	}, [isContextLoading, sttlForm?.isSubmittingData]);

	const value = React.useMemo(() => ({ sttlForm, loadingMessage }), [sttlForm, loadingMessage]);
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

// useful way of accessing the context
export const useFormContext = () => React.useContext(Context);

// messages
const LOADING_MESSAGE = "Please wait while we are processing your data.";
const PROCESSING_MESSAGE = "Please wait while we are processing your data.";
