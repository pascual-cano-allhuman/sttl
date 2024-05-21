import React from "react";
import { usePathname } from "next/navigation";
import { getOrderForCardPayment, getOrderForZeroPayment, composeOrder, getFeesFromOrder, getOrderResultFromStatus } from "models/sttl/mappings";
import { FormState, getPropertiesFromForm } from "models/sttl";
import { UserAccount, useAlert, Alert, OrderSchema, Property } from "models/global";
import { retry, hasPartialState } from "./utils";
import { FormStep, formStepById } from "./formSteps";

type Parameters = {
	formState: FormState;
	userAccount: UserAccount;
	goToStep: (step: FormStep) => void;
	appendFeesToOrder: (order: OrderSchema, controller?: AbortController) => Promise<OrderSchema>;
	createPaymentRequest: (order: OrderSchema) => Promise<Record<string, string>>;
	sendPaymentResponse: (paymentResponse: Record<string, string>) => Promise<string>;
	sendZeroPaymentOrder: (order: OrderSchema) => Promise<void>;
	fetchOrderStatus: (propertiesList: Property[]) => Promise<any>;
};

export const useSttlOrder = (params: Parameters) => {
	// parameters
	const { formState, userAccount, goToStep } = params;
	const { appendFeesToOrder, createPaymentRequest, sendPaymentResponse, sendZeroPaymentOrder, fetchOrderStatus } = params;

	// states
	const pathname = usePathname();
	const order = React.useMemo(() => composeOrder(formState), [formState]);
	const [paymentRequest, setPaymentRequest] = React.useState(null);
	const [orderResult, setOrderResult] = React.useState(null);
	const [isSubmittingData, setIsSubmittingData] = React.useState(false);
	const [fees, setFees] = React.useState(null);

	// alerts
	const { alert, closeAlert, showAlertOnUrl } = useAlert();
	const showPaymentGatewayError = () => showAlertOnUrl(alerts.PAYMENT_GATEWAY_ERROR, formStepById[FormStep.card_payment].url);

	// after review create a new order at the BE and setup payment iframe
	const createCardPayment = async () => {
		goToStep(FormStep.card_payment);
		const order = getOrderForCardPayment(formState, userAccount);
		const orderWithFees = await appendFeesToOrder(order);
		const paymentRequest = await createPaymentRequest(orderWithFees);
		setPaymentRequest(paymentRequest);
		if (!paymentRequest) showAlertOnUrl(alerts.PAYMENT_REQUEST_ERROR, formStepById[FormStep.review].url);
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
		const callback = async () => {
			const propertiesList = getPropertiesFromForm(formState);
			const status = await fetchOrderStatus(propertiesList);
			if (status) return getOrderResultFromStatus(status, propertiesList);
		};
		const orderResult = await retry(callback);
		setOrderResult(orderResult);
		goToStep(FormStep.confirm);
	};

	// calculate fees on form state change
	React.useEffect(() => {
		if (hasPartialState(formState)) return;
		const order = composeOrder(formState);
		const controller = new AbortController();
		appendFeesToOrder(order, controller).then(orderWithFees => setFees(getFeesFromOrder(orderWithFees)));
		setFees(fees);
		return () => controller.abort();
	}, [formState]);

	// remove loading state on the next page
	React.useEffect(() => setIsSubmittingData(false), [pathname]);

	return {
		order,
		fees,
		paymentRequest,
		orderResult,
		isSubmittingData,
		alert,
		createCardPayment,
		processCardPayment,
		processZeroPayment,
		closeAlert,
		showPaymentGatewayError
	};
};

export const alerts = {
	PAYMENT_REQUEST_ERROR: {
		title: "Provider unavailable",
		message: "The payment provider is currently unavailable. Please try again later.",
		type: "error"
	} as Alert,
	PAYMENT_GATEWAY_ERROR: {
		title: "Provider unavailable",
		message: "There was an error processing your payment. Please try again.",
		type: "error"
	} as Alert
};
