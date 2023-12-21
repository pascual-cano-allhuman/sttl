"use client";

import React from "react";
import { StatutoryObligations } from "templates";
import { StatutoryObligationsStep } from "models/sttl";

const Page = () => {
	const defaultValues = React.useMemo(() => ({}) as StatutoryObligationsStep, []);
	const stepper = { step: 2, label: "Statutory Obligations", totalSteps: 3 };

	if (!defaultValues) return null;
	return (
		<StatutoryObligations onNextBtnClick={() => {}} onPrevBtnClick={() => {}} dataLayer={{}} defaultValues={defaultValues} stepper={stepper} />
	);
};

export default Page;
