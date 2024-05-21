"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { PropertyAddress } from "templates";
import { useFormContext } from "app/sttl/FormContext";
import { PropertyAddressStep, Property } from "models";

const Page = () => {
	const searchParams = useSearchParams();
	const { sttlForm } = useFormContext();
	const { formState, stepper, onNextStep, onPrevStep, isEditing, propertiesList } = sttlForm;
	const entry = searchParams.get("entry") && isEditing ? +searchParams.get("entry") : propertiesList.length;
	const defaultValues = React.useMemo(() => formState?.propertyAddress?.[entry] || ({} as PropertyAddressStep), [entry, formState]);
	const excludedEircodes = React.useMemo(() => {
		return propertiesList.filter((_: any, i: number) => i !== entry).map((property: Property) => property.address?.postcode);
	}, [entry, propertiesList]);

	return (
		<PropertyAddress
			onNextBtnClick={onNextStep}
			onPrevBtnClick={onPrevStep}
			isEditing={isEditing}
			defaultValues={defaultValues}
			stepper={stepper}
			excludedEircodes={excludedEircodes}
		/>
	);
};

export default Page;
