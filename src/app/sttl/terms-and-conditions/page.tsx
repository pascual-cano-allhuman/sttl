"use client";

import React from "react";

import { TermsAndConditions } from "templates";
import { useFormContext } from "app/sttl/FormContext";
import { useAppContext } from "app/AppContext";

const Page = () => {
	const { isNewUser } = useAppContext();
	const { sttlForm } = useFormContext();
	const { onNextStep, checkSaveAndResume, restoreSaveAndResume, goToReview } = sttlForm;
	const [hasPendingRegistration, setHasPendingRegistration] = React.useState<boolean>(false);

	const resumeRegistration = () => {
		restoreSaveAndResume?.();
		goToReview();
	};

	React.useEffect(() => {
		(async () => {
			const check = await checkSaveAndResume?.();
			setHasPendingRegistration(check);
		})();
	}, []);

	return (
		<TermsAndConditions
			onNextBtnClick={onNextStep}
			resumeRegistration={resumeRegistration}
			hasPendingRegistration={hasPendingRegistration}
			isNewUser={isNewUser}
		/>
	);
};

export default Page;
