import React from "react";
import { usePathname } from "next/navigation";
import { FORM_STEP_BY_ID, FormStep } from "./useFormSteps";

export type Alert = {
	type?: "success" | "error";
	title?: string;
	message: string;
	step?: FormStep;
};

export const useAlert = () => {
	const [alert, setAlert] = React.useState<Alert | null>(null);
	const pathname = usePathname();

	const closeAlert = () => {
		setAlert(null);
	};

	const showError = (alert: Alert) => {
		setAlert({ ...alert, type: "error" });
		window.scroll(0, 0);
	};

	const showSuccess = (alert: Alert) => {
		setAlert({ ...alert, type: "success", step: FormStep.review });
	};

	const showPaymentRequestError = () =>
		showError({
			title: "Provider unavailable",
			message: "The payment provider is currently unavailable. Please try again later.",
			step: FormStep.review
		});

	const showPaymentGatewayError = () =>
		showError({
			title: "Provider unavailable",
			message: "There was an error processing your payment. Please try again.",
			step: FormStep.card_payment
		});

	const showPropertyAdded = () => showSuccess({ message: "Your property has been added and your application has been saved." });

	const showPropertyChanged = () => showSuccess({ message: "Your changes have been made." });

	React.useEffect(() => {
		if (pathname.split("/").pop() === FORM_STEP_BY_ID[alert?.step]?.route) return;
		closeAlert();
	}, [pathname]);

	return {
		alert,
		closeAlert,
		showPaymentGatewayError,
		showPaymentRequestError,
		showPropertyAdded,
		showPropertyChanged
	};
};

export type AlertReturnType = ReturnType<typeof useAlert>;
