import React from "react";
import { useSearchParams } from "next/navigation";
import { getFormFromOrder, getOrderForCardPayment, getOrderForZeroPayment, composeOrder, getFeesFromOrder } from "models/sttl/mappings";
import { FormState, Order, PropertyData } from "models/sttl/types";
import { UserAccount } from "models/global";
import { addStepDataToState, hasPartialState, getPropertiesList, deleteEntryFromState, presetCypressData } from "./utils";
import { useFormSteps, FormStep } from "./useFormSteps";
import { useAlert } from "./useAlert";

type HookProps = {
	initialState?: FormState;
	userAccount: UserAccount;
	resetCorrelationId: () => void;
	appendFeesToOrder: (order: Order, controller?: AbortController) => Promise<Order>;
	createPaymentRequest: (order: Order) => Promise<Record<string, string>>;
	sendPaymentResponse: (paymentResponse: Record<string, string>) => Promise<string>;
	sendZeroPaymentOrder: (order: Order) => Promise<void>;
	retrieveOrderResult: (propertiesList: PropertyData[]) => Promise<any>;
	sendQAUpsell: () => Promise<void>;
	loadSaveAndResumeData: () => Promise<Order>;
	updateSaveAndResume: (order: Order) => void;
	clearSaveAndResumeData: () => Promise<void>;
};

export const useSttlForm = (props: HookProps) => {
	// props
	const { initialState, userAccount, resetCorrelationId, updateSaveAndResume, loadSaveAndResumeData, clearSaveAndResumeData } = props;
	const { appendFeesToOrder, createPaymentRequest, sendPaymentResponse, sendZeroPaymentOrder, retrieveOrderResult, sendQAUpsell } = props;
	// states
	const [formState, setFormState] = React.useState<FormState>(initialState);
	const [order, setOrder] = React.useState<Order>(null);
	const [paymentRequest, setPaymentRequest] = React.useState(null);
	const [orderResult, setOrderResult] = React.useState(null);
	const [isSubmittingData, setIsSubmittingData] = React.useState(false);
	const hasSentQAMembershipUpsell = React.useRef(false);
	const { alert, closeAlert, showPaymentRequestError, showPaymentGatewayError, showPropertyAdded, showPropertyChanged } = useAlert();
	const searchParams = useSearchParams();

	// get the current step and the already completed entries
	const { formStep, stepper, isEditing, goToNextStep, goToPrevStep, goToStep } = useFormSteps();
	const propertiesList = React.useMemo(() => getPropertiesList(formState), [formState]);
	const fees = React.useMemo(() => getFeesFromOrder(order), [order]);

	// save step data on the current entry and go to the next step
	const onNextStep = (stepData?: Record<string, any>) => {
		const updatedState = updateState(stepData);
		goToNextStep();
		if (isEditing) showPropertyChanged();
		else if (!hasPartialState(updatedState)) showPropertyAdded();
	};

	// go to the previous step in the flow
	const onPrevStep = () => goToPrevStep();

	// update form state with the data from the current step
	const updateState = (stepData: Record<string, any>) => {
		const entry = isEditing ? +searchParams.get("entry") : propertiesList.length;
		const updatedState = addStepDataToState(formState, formStep, entry, stepData);
		setFormState(updatedState);
		if (!hasPartialState(updatedState)) updateSaveAndResume(composeOrder(updatedState, userAccount));
		return updatedState;
	};

	// go to particular steps
	const goToReview = () => goToStep(FormStep.review);
	const registerNewProperty = () => goToStep(FormStep.property_type);

	// delete a property on the review screen
	const deleteProperty = async (entryIndex: number) => {
		closeAlert();
		const newState = deleteEntryFromState(formState, entryIndex);
		setFormState(newState);
		const order = composeOrder(newState, userAccount);
		if (order) updateSaveAndResume(order);
		else clearSaveAndResumeData();
	};

	// create an order with fees
	const getOrderWithFees = async (controller?: AbortController) => {
		const order = getOrderForCardPayment(formState, userAccount);
		return appendFeesToOrder(order, controller);
	};

	// after review create a new order at the BE and setup payment iframe
	const createCardPayment = async () => {
		goToStep(FormStep.card_payment);
		const order = await getOrderWithFees();
		const paymentRequest = await createPaymentRequest(order);
		setPaymentRequest(paymentRequest || null);
		if (!paymentRequest) {
			showPaymentRequestError();
			goToStep(FormStep.review);
		}
	};

	// once the payment is done, post confirmation to BE and wait until the order data is ready
	const processCardPayment = async (paymentResponse: Record<string, string>) => {
		setIsSubmittingData(true);
		await sendPaymentResponse(paymentResponse);
		processOrderResult();
	};

	// Send a zero payment order to the events bus
	const processZeroPayment = async () => {
		setIsSubmittingData(true);
		const order = getOrderForZeroPayment(formState, userAccount);
		await sendZeroPaymentOrder(order);
		processOrderResult();
	};

	// poll the order status, store the result and clean up
	const processOrderResult = async () => {
		const orderResult = await retrieveOrderResult(propertiesList);
		setOrderResult(orderResult);
		goToStep(FormStep.confirm);
		clearSaveAndResumeData();
		setFormState(null);
		setOrder(null);
		resetCorrelationId();
	};

	// remove loading state on the next page
	React.useEffect(() => setIsSubmittingData(false), [formStep]);

	// send the quality assured consent
	const applyForQAMembership = async () => {
		if (!hasSentQAMembershipUpsell.current) sendQAUpsell();
		hasSentQAMembershipUpsell.current = true;
	};

	// check if there is a pending registration
	const checkSaveAndResume = async () => {
		const order = await loadSaveAndResumeData();
		return !!order;
	};

	// restore state from a persisted order
	const restoreSaveAndResume = async () => {
		const order = await loadSaveAndResumeData();
		const state = getFormFromOrder(order);
		if (state) setFormState(state);
	};

	// async call to discard the remote persisted order
	const discardSaveAndResume = async () => {
		await clearSaveAndResumeData();
		setFormState(null);
	};

	// set initial state if necessary
	React.useEffect(() => {
		if (!userAccount) return;
		if (formStep === FormStep.review) restoreSaveAndResume();
		presetCypressData(window["Cypress"], setFormState, setOrderResult);
	}, [userAccount]);

	// on the review screen
	React.useEffect(() => {
		if (formStep !== FormStep.review) return;
		const controller = new AbortController();
		getOrderWithFees(controller).then(orderWithFees => setOrder(orderWithFees));
		return () => controller.abort();
	}, [formState, formStep]);

	return {
		formState,
		propertiesList,
		fees,
		stepper,
		paymentRequest,
		orderResult,
		isEditing,
		isSubmittingData,
		onPrevStep,
		onNextStep,
		goToReview,
		registerNewProperty,
		deleteProperty,
		createCardPayment,
		processCardPayment,
		processZeroPayment,
		applyForQAMembership,
		checkSaveAndResume,
		restoreSaveAndResume,
		discardSaveAndResume,
		alert,
		closeAlert,
		showPaymentGatewayError
	};
};

export type SttlrForm = ReturnType<typeof useSttlForm>;
