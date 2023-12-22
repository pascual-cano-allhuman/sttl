"use client";

import React from "react";
import { PropertyOwnerDetails } from "templates";
import { Address, PropertyOwnerDetailsStep } from "models/sttl";
import { UserAccount } from "models/global";

const Page = () => {
	const defaultValues = React.useMemo(() => ({}) as PropertyOwnerDetailsStep, []);
	const stepper = { step: 4, label: "Property Address", totalSteps: 4 };

	if (!defaultValues) return null;
	return (
		<PropertyOwnerDetails
			onNextBtnClick={() => {}}
			onPrevBtnClick={() => {}}
			defaultValues={defaultValues}
			stepper={stepper}
			accountData={{} as UserAccount}
			propertyAddress={{} as Address}
		/>
	);
};

export default Page;
