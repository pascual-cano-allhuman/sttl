import { usePathname, useRouter } from "next/navigation";
import React from "react";

export enum FormStep {
	terms_and_conditions = "terms_and_conditions",
	property_type = "property_type",
	statutory_obligations = "statutory_obligations",
	property_address = "property_address",
	property_owner_details = "property_owner_details",
	review = "review",
	card_payment = "card_payment",
	confirm = "confirm"
}

export const FORM_STEPS = [
	{ id: FormStep.terms_and_conditions, label: "Terms and conditions", route: "terms-and-conditions" },
	{ id: FormStep.property_type, label: "STTL property type", route: "property-type" },
	{ id: FormStep.statutory_obligations, label: "Statutory obligations", route: "statutory-obligations" },
	{ id: FormStep.property_address, label: "STTL property address", route: "property-address" },
	{ id: FormStep.property_owner_details, label: "Property owner details", route: "property-owner-details" },
	{ id: FormStep.review, label: "Review details", route: "review" },
	{ id: FormStep.card_payment, label: "Payment details", route: "card-payment" },
	{ id: FormStep.confirm, label: "Confirm", route: "confirm" }
];

export const FORM_STEP_BY_ID = FORM_STEPS.reduce((acc, step) => {
	acc[step.id] = step;
	return acc;
}, {});

export const FORM_STEP_BY_ROUTE = FORM_STEPS.reduce((acc, step) => {
	acc[step.route] = step;
	return acc;
}, {});

export const useFormSteps = () => {
	const pathname = usePathname();
	const router = useRouter();

	// create a list of steps with their urls
	const steps = React.useMemo(() => {
		return FORM_STEPS.map((step, index) => ({ ...step, stepNumber: index, url: `/sttl/${step.route}` }));
	}, []);

	// get the current step and next/prev steps
	const { currentStep, nextStep, prevStep, isEditing } = React.useMemo(() => {
		const isEditing = pathname.includes("/review/");
		const slug = pathname.split("/").pop();
		const currentStep = FORM_STEP_BY_ROUTE[slug];
		if (!currentStep) return {};
		const nextStep = steps[currentStep.stepNumber + 1];
		const prevStep = steps[currentStep.stepNumber - 1];
		return { currentStep, nextStep, prevStep, isEditing };
	}, [pathname]);

	// compose stepper component data
	const stepper = React.useMemo(() => {
		const step = isEditing ? FORM_STEP_BY_ID[FormStep.review] : currentStep;
		return { step: step?.stepNumber, label: step?.label, total: FORM_STEPS.length - 2 }; // remove the first and last steps from the count
	}, [currentStep, isEditing]);

	return {
		goToStep: (step: FormStep) => router.push(FORM_STEP_BY_ID[step]?.url),
		goToNextStep: () => router.push(nextStep?.url),
		goToPrevStep: () => router.push(prevStep?.url),
		formStep: currentStep?.id,
		isEditing,
		stepper
	};
};
