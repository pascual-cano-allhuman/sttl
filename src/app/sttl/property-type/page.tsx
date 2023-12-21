"use client";

import React from "react";
import { PropertyType } from "templates";
import { PropertyTypeStep } from "models/sttl";

const Page = () => {
	const defaultValues = React.useMemo(() => ({}) as PropertyTypeStep, []);
	const stepper = { step: 1, label: "Property Type", totalSteps: 3 };

	if (!defaultValues) return null;
	return <PropertyType onNextBtnClick={() => {}} defaultValues={defaultValues} stepper={stepper} />;
};

export default Page;
