"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { StatutoryObligations } from "templates";
import { useAppContext } from "app/AppContext";
import { useFormContext } from "app/sttl/FormContext";
import { StatutoryObligationsStep } from "models/sttl";

const Page = () => {
	const searchParams = useSearchParams();
	const { sttlForm } = useFormContext();
	const { dataLayer } = useAppContext();
	const { formState, stepper, onNextStep, onPrevStep, isEditing, propertiesList } = sttlForm;
	const entry = searchParams.get("entry") && isEditing ? +searchParams.get("entry") : propertiesList.length;
	const defaultValues = React.useMemo(() => formState?.statutoryObligations?.[entry] || ({} as StatutoryObligationsStep), [entry, formState]);

	return (
		<StatutoryObligations
			onNextBtnClick={onNextStep}
			onPrevBtnClick={onPrevStep}
			isEditing={isEditing}
			dataLayer={dataLayer}
			defaultValues={defaultValues}
			stepper={stepper}
		/>
	);
};

export default Page;
