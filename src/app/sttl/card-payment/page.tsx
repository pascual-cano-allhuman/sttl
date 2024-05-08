"use client";

import React from "react";
import { CardPayment } from "templates";
import { useFormContext } from "app/sttl/FormContext";

const Page = () => {
	const { sttlOrder, correlation } = useFormContext();
	const { paymentRequest, processCardPayment, alert, showPaymentGatewayError, closeAlert, createCardPayment } = sttlOrder;

	const onSuccess = async paymentResponse => {
		await processCardPayment(paymentResponse);
	};

	const onError = async () => {
		showPaymentGatewayError();
		await createCardPayment();
	};

	return (
		<CardPayment
			alert={alert}
			closeAlert={closeAlert}
			onSuccess={onSuccess}
			onError={onError}
			paymentRequest={paymentRequest}
			correlation={correlation}
		/>
	);
};

export default Page;
