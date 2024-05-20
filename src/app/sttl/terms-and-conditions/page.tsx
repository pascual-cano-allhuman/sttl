"use client";

import React from "react";

import { TermsAndConditions } from "templates";
import { useFormContext } from "app/sttl/FormContext";
import { useAppContext } from "app/AppContext";

const Page = () => {
	const { isNewUser } = useAppContext();
	const { sttlForm, saveAndResume } = useFormContext();
	const { onNextStep, goToReview } = sttlForm;

	return (
		<TermsAndConditions
			onNextBtnClick={onNextStep}
			resumeRegistration={goToReview}
			hasPendingApplication={!!saveAndResume.pendingApplication}
			isNewUser={isNewUser}
		/>
	);
};

export default Page;
