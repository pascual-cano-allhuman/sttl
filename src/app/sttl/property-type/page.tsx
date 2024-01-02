"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { PropertyType } from "templates";
import { useFormContext } from "app/sttl/FormContext";
import { PropertyTypeStep } from "models/sttl";

const Page = () => {
	const searchParams = useSearchParams();
	const { sttlForm } = useFormContext();
	const { formState, stepper, onNextStep, onPrevStep, isEditing, propertiesList } = sttlForm;
	const entry = searchParams.get("entry") && isEditing ? +searchParams.get("entry") : propertiesList.length;
	const defaultValues = React.useMemo(() => formState?.property_type?.[entry] || ({} as PropertyTypeStep), [entry, formState]);

	return (
		<PropertyType onNextBtnClick={onNextStep} onPrevBtnClick={onPrevStep} isEditing={isEditing} defaultValues={defaultValues} stepper={stepper} />
	);
};

export default Page;
