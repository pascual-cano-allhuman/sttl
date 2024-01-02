"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "app/AppContext";
import { useFormContext } from "app/sttl/FormContext";
import { PropertyOwnerDetails } from "templates";
import { PropertyOwnerDetailsStep } from "models/sttl";

const Page = () => {
	const searchParams = useSearchParams();
	const { userAccount } = useAppContext();
	const { sttlForm } = useFormContext();
	const { formState, stepper, onNextStep, onPrevStep, isEditing, propertiesList } = sttlForm;
	const entry = searchParams.get("entry") && isEditing ? +searchParams.get("entry") : propertiesList.length;
	const defaultValues = React.useMemo(() => formState?.property_owner_details?.[entry] || ({} as PropertyOwnerDetailsStep), [entry, formState]);
	const propertyAddress = React.useMemo(() => formState?.property_address?.[entry]?.propertyAddress, []);

	return (
		<PropertyOwnerDetails
			onNextBtnClick={onNextStep}
			onPrevBtnClick={onPrevStep}
			isEditing={isEditing}
			defaultValues={defaultValues}
			stepper={stepper}
			userAccount={userAccount}
			propertyAddress={propertyAddress}
		/>
	);
};

export default Page;
