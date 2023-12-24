import { useState } from "react";

export type Alert = {
	type: "success" | "error";
	title: string;
	message: string;
};

export const useAlert = () => {
	const [alert, setAlert] = useState<Alert | null>(null);

	const closeAlert = () => {
		setAlert(null);
	};

	const showError = ({ title, message }) => {
		const alert = { title, message, type: "error" } as Alert;
		setAlert(alert);
		window.scroll(0, 0);
	};

	const showPaymentRequestError = () =>
		showError({
			title: "Provider unavailable",
			message: "The payment provider is currently unavailable. Please try again later."
		});

	const showPaymentGatewayError = () =>
		showError({
			title: "Provider unavailable",
			message: "There was an error processing your payment. Please contact support."
		});

	return {
		alert,
		closeAlert,
		showPaymentGatewayError,
		showPaymentRequestError
	};
};

export type AlertReturnType = ReturnType<typeof useAlert>;
