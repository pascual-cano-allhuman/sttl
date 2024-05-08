"use client";

import React from "react";
import { Review } from "templates";
import { useFormContext } from "app/sttl/FormContext";
import { useAppContext } from "app/AppContext";

const Page = () => {
	const { sttlForm, sttlOrder } = useFormContext();
	const { dataLayer } = useAppContext();
	const { propertiesList, stepper, alert, registerNewProperty, applyForQAMembership, deleteProperty, goToEditStep } = sttlForm;
	const { fees, createCardPayment, processZeroPayment } = sttlOrder;

	return (
		<Review
			propertiesList={propertiesList}
			fees={fees}
			stepper={stepper}
			alert={alert}
			dataLayer={dataLayer}
			createCardPayment={createCardPayment}
			processZeroPayment={processZeroPayment}
			registerNewProperty={registerNewProperty}
			applyForQAMembership={applyForQAMembership}
			goToEditStep={goToEditStep}
			deleteProperty={deleteProperty}
		/>
	);
};

export default Page;
