import React from "react";
import { useSearchParams } from "next/navigation";
import { transformOrderToFormState, getOrderForCardPayment, getOrderForZeroPayment, transformFormStateToOrder } from "models/sttl/mappings";
import { FormState, Order } from "models/sttl/types";
import { UserAccount } from "models/global";
import { addStepDataToState, getPropertiesList, deleteEntryFromState, presetCypressData } from "./utils";
import { useFormSteps, FormStep } from "./useFormSteps";
import { useAlert } from "./useAlert";

const hasPaymentsEnabled = process.env.ENABLE_CARD_PAYMENTS || false;
type HookProps = {
	initialState?: FormState;
	userAccount: UserAccount;
	resetCorrelationId: () => void;
	appendFeesToOrder: (order: Order, controller?: AbortController) => Promise<Order>;
	createPaymentRequest: (order: Order) => Promise<Record<string, string>>;
	sendPaymentResponse: (paymentResponse: Record<string, string>) => Promise<string>;
	sendOrderToServiceBus: (order: Order) => Promise<void>;
	retrieveOrderResult: (postCodes: string[]) => Promise<any>;
	sendQAUpsell: () => Promise<void>;
	loadSaveAndResumeData: () => Promise<Order>;
	updateSaveAndResume: (order: Order) => void;
	deleteSaveAndResumeData: () => Promise<void>;
};

export const useSttlForm = (props: HookProps) => {
	// props
	const { initialState, userAccount, resetCorrelationId, updateSaveAndResume, loadSaveAndResumeData, deleteSaveAndResumeData } = props;
	const { appendFeesToOrder, createPaymentRequest, sendPaymentResponse, sendOrderToServiceBus, retrieveOrderResult, sendQAUpsell } = props;
	// states
	const [formState, setFormState] = React.useState<FormState>(initialState);
	const [order, setOrder] = React.useState<Order>(null);
	const [paymentRequest, setPaymentRequest] = React.useState(null);
	const [orderResult, setOrderResult] = React.useState(null);
	const [isSubmittingData, setIsSubmittingData] = React.useState(false);
	const hasSentQAMembershipUpsell = React.useRef(false);
	// alerts
	const { alert, closeAlert, showPaymentRequestError, showPaymentGatewayError } = useAlert();

	// get the current step and the current entry
	const { formStep, isEditing, stepper, goToNextStep, goToPrevStep, goToStep } = useFormSteps();
	const searchParams = useSearchParams();
	const propertiesList = React.useMemo(() => getPropertiesList(formState), [formState]);
	const entry = React.useMemo(() => (isEditing ? +searchParams.get("entry") : propertiesList.length), [searchParams, propertiesList, isEditing]);

	// go to next step in the flow
	const onNextStep = (stepData?: Record<string, any>) => {
		closeAlert();
		const updatedState = addStepDataToState(formState, formStep, entry, stepData);
		setFormState(updatedState);
		goToNextStep();
	};

	// go to the previous step in the flow
	const onPrevStep = () => {
		closeAlert();
		goToPrevStep();
	};

	// go to step 1 to add a new property
	const registerNewProperty = () => goToStep(FormStep.property_type);

	// delete a property on the review screen
	const deleteProperty = async (entryIndex: number) => {
		closeAlert();
		const newState = deleteEntryFromState(formState, entryIndex);
		setFormState(newState);
		const order = transformFormStateToOrder(newState, userAccount);
		if (order) updateSaveAndResume(order);
		else deleteSaveAndResumeData();
	};

	// create an order with fees
	const getOrderWithFees = async (controller?: AbortController) => {
		const order = getOrderForCardPayment(formState, userAccount);
		return appendFeesToOrder(order, controller);
	};

	// after review create a new order at the BE and setup payment iframe
	const createPayment = async () => {
		setIsSubmittingData(true);
		const order = await getOrderWithFees();
		const paymentRequest = await createPaymentRequest(order);
		setPaymentRequest(paymentRequest || null);
		if (!paymentRequest) {
			setIsSubmittingData(false);
			showPaymentRequestError();
		} else {
			goToStep(FormStep.payment);
		}
	};

	// once the payment is done, post confirmation to BE and wait until the order data is ready
	const processPayment = async (paymentResponse: Record<string, string>) => {
		setIsSubmittingData(true);
		await sendPaymentResponse(paymentResponse);
		processOrderResult();
	};

	// Send a zero payment order to the events bus
	const sendZeroPaymentOrder = async () => {
		setIsSubmittingData(true);
		const order = getOrderForZeroPayment(formState, userAccount);
		await sendOrderToServiceBus(order);
		processOrderResult();
	};

	// poll the order status, store the result and clean up
	const processOrderResult = async () => {
		const postCodes = formState[FormStep.property_address]?.map(property => property.propertyAddress.postcode);
		// poll the status iteratively until the order is processed (or get a null if we timeout)
		const orderResult = await retrieveOrderResult(postCodes);
		setOrderResult(orderResult);
		goToStep(FormStep.confirm);
		// clean up
		deleteSaveAndResumeData();
		setFormState(null);
		resetCorrelationId();
	};

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
		const state = transformOrderToFormState(order);
		if (state) setFormState(state);
	};

	// async call to discard the remote persisted order
	const discardSaveAndResume = async () => {
		await deleteSaveAndResumeData();
		setFormState(null);
	};

	// reset form to start a new registration
	const resetForm = () => {
		setFormState(initialState);
	};

	// set initial state if necessary
	React.useEffect(() => {
		if (!userAccount) return;
		if (formStep === FormStep.review) restoreSaveAndResume();
		presetCypressData(window["Cypress"], setFormState, setOrderResult);
	}, [userAccount]);

	// on the review screen
	React.useEffect(() => {
		setIsSubmittingData(false);
		if (formStep !== FormStep.review) return;
		const controller = new AbortController();
		getOrderWithFees(controller).then(orderWithFees => setOrder(orderWithFees));
		return () => controller.abort();
	}, [formState, formStep]);

	return {
		propertiesList,
		formState,
		order,
		stepper,
		paymentRequest,
		orderResult,
		isSubmittingData,
		hasPaymentsEnabled,
		onPrevStep,
		onNextStep,
		registerNewProperty,
		deleteProperty,
		goToStep,
		createPayment,
		processPayment,
		sendZeroPaymentOrder,
		applyForQAMembership,
		checkSaveAndResume,
		restoreSaveAndResume,
		discardSaveAndResume,
		resetForm,
		alert,
		closeAlert,
		showPaymentGatewayError
	};
};

export type SttlrForm = ReturnType<typeof useSttlForm>;
