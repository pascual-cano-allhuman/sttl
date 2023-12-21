"use client";

import React from "react";
import { PropertyAddress } from "templates";
import { PropertyAddressStep } from "models/sttl";

const Page = () => {
	const defaultValues = React.useMemo(() => ({}) as PropertyAddressStep, []);
	const stepper = { step: 3, label: "Property Address", totalSteps: 3 };

	if (!defaultValues) return null;
	return <PropertyAddress onNextBtnClick={() => {}} onPrevBtnClick={() => {}} defaultValues={defaultValues} stepper={stepper} />;
};

export default Page;
