"use client";

import React from "react";

import { TermsAndConditions } from "templates";
import { useFormContext } from "app/sttl/FormContext";
import { useAppContext } from "app/AppContext";

const Page = () => {
	const { isNewUser } = useAppContext();
	const { sttlForm, saveAndResume } = useFormContext();
	const { onNextStep, goToReview, updateFormState } = sttlForm;
	const { pendingApplication } = saveAndResume;

	const resumeRegistration = () => {
		if (!pendingApplication) return;
		updateFormState(pendingApplication);
		goToReview();
	};

	return (
		<TermsAndConditions
			onNextBtnClick={onNextStep}
			resumeRegistration={resumeRegistration}
			hasPendingApplication={!!pendingApplication}
			isNewUser={isNewUser}
		/>
	);
};

export default Page;
