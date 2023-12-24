import { usePathname, useRouter } from "next/navigation";
import React from "react";

export enum FormStep {
	terms_and_conditions = "terms_and_conditions",
	property_type = "property_type",
	statutory_obligations = "statutory_obligations",
	property_address = "property_address",
	property_owner_details = "property_owner_details",
	review = "review",
	payment = "payment",
	confirm = "confirm"
}

export const FORM_STEPS = [
	{ id: FormStep.terms_and_conditions, label: "Terms and conditions", route: "terms-and-conditions" },
	{ id: FormStep.property_type, label: "STTL property type", route: "property-type" },
	{ id: FormStep.statutory_obligations, label: "Statutory obligations", route: "statutory-obligations" },
	{ id: FormStep.property_address, label: "STTL property address", route: "property-address" },
	{ id: FormStep.property_owner_details, label: "Property owner details", route: "property-owner-details" },
	{ id: FormStep.review, label: "Review details", route: "review" },
	{ id: FormStep.payment, label: "Payment details", route: "payment" },
	{ id: FormStep.confirm, label: "Confirm", route: "confirm" }
];
export const FORM_STEP_BY_ROUTE = FORM_STEPS.reduce((acc, step) => {
	acc[step.route] = step;
	return acc;
}, {});

export const useFormSteps = () => {
	const pathname = usePathname();
	const router = useRouter();

	// create step list based on workflow and statutory status
	const steps = React.useMemo(() => {
		return FORM_STEPS.map(step => ({ ...step, url: `/sttl/${step.route}` }));
	}, []);

	const reviewStep = React.useMemo(() => steps.find(step => step.id === FormStep.review), [steps]);

	// get the current step and next/prev steps
	const { stepNumber, currentStep, nextStep, prevStep, isEditing } = React.useMemo(() => {
		const isEditing = pathname.includes("/review/");
		const url = isEditing ? pathname.replace("/review/", "/") : pathname;
		const stepNumber = steps.findIndex(step => step.url === url);
		const nextStep = isEditing ? reviewStep : steps[stepNumber + 1];
		const prevStep = isEditing ? reviewStep : steps[stepNumber - 1];
		return { stepNumber, currentStep: steps[stepNumber], nextStep, prevStep, isEditing };
	}, [pathname, steps]);

	// compose stepper component data
	const stepper = React.useMemo(() => {
		return { step: stepNumber, label: currentStep?.label, total: steps.length - 2 }; // remove the first and last steps from the count
	}, [stepNumber, isEditing]);

	return {
		goToStep: (step: FormStep) => router.push(steps.find(s => step === s.id)?.url),
		goToNextStep: () => router.push(nextStep?.url),
		goToPrevStep: () => router.push(prevStep?.url),
		formStep: currentStep?.id,
		isEditing,
		stepper
	};
};
