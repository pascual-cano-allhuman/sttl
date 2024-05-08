import React from "react";
import { useAppContext } from "app/AppContext";
import { useSttlFormState, useSttlOrder, useSaveAndResume } from "models/sttl";
import { logger } from "lib/logger";
import { useMiddleware } from "middleware/useMiddleware";

type ContextProps = { children: React.ReactNode };
type ContextValue = {
	sttlForm: ReturnType<typeof useSttlFormState>;
	sttlOrder: ReturnType<typeof useSttlOrder>;
	saveAndResume: ReturnType<typeof useSaveAndResume>;
	correlation: { userId?: string; correlationId?: string; contactId?: string };
};
const Context = React.createContext({} as ContextValue);

export const FormContextProvider = ({ children }: ContextProps) => {
	const { auth, correlationId, userAccount, resetCorrelationId } = useAppContext();
	const { userId, getToken } = auth || {};
	const correlation = { userId, correlationId, contactId: userAccount?.contactId };

	// check we have all the data we need
	React.useEffect(() => {
		if (!userAccount?.contactId) return;
		logger.event("STTL Application Start", correlation);
	}, [userAccount]);

	// attach token to requests
	const middleware = useMiddleware({ getToken, correlation });
	const { appendFeesToOrder, createPaymentRequest, sendPaymentResponse, sendZeroPaymentOrder, fetchOrderStatus } = middleware;
	const { loadSaveAndResumeData, updateSaveAndResume, clearSaveAndResumeData, sendQAUpsell } = middleware;

	// manage the new applications form
	const sttlForm = useSttlFormState({ sendQAUpsell, resetCorrelationId });
	const { formState, goToStep } = sttlForm;

	// manage the order and payment flow
	const sttlOrder = useSttlOrder({
		formState,
		userAccount,
		goToStep,
		appendFeesToOrder,
		createPaymentRequest,
		sendPaymentResponse,
		sendZeroPaymentOrder,
		fetchOrderStatus
	});
	const { order } = sttlOrder;

	// save and resume functionality
	const saveAndResume = useSaveAndResume({ order, loadSaveAndResumeData, updateSaveAndResume, clearSaveAndResumeData });

	// return value
	const value = React.useMemo(() => ({ sttlForm, sttlOrder, saveAndResume, correlation }), [sttlForm, saveAndResume, correlation]);
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

// useful way of accessing the context
export const useFormContext = () => React.useContext(Context);
