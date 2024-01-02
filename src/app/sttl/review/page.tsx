"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { FORM_STEP_BY_ID } from "models/sttl";
import { Review } from "templates";
import { useFormContext } from "app/sttl/FormContext";
import { useAppContext } from "app/AppContext";

const Page = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { sttlForm } = useFormContext();
	const { dataLayer } = useAppContext();
	const { propertiesList, stepper, alert, fees } = sttlForm;
	const { createCardPayment, processZeroPayment, registerNewProperty, applyForQAMembership, deleteProperty } = sttlForm;
	const goToEditStep = (formStep: string, entry: number) => router.push(`${pathname}/${FORM_STEP_BY_ID[formStep].route}?entry=${entry}`);

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
