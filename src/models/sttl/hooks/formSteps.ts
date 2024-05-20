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

export const FORM_STEPS_DATA = [
	{ id: FormStep.terms_and_conditions, label: "Terms and conditions", route: "terms-and-conditions" },
	{ id: FormStep.property_type, label: "STTL property type", route: "property-type" },
	{ id: FormStep.statutory_obligations, label: "Statutory obligations", route: "statutory-obligations" },
	{ id: FormStep.property_address, label: "STTL property address", route: "property-address" },
	{ id: FormStep.property_owner_details, label: "Property owner details", route: "property-owner-details" },
	{ id: FormStep.review, label: "Review details", route: "review" },
	{ id: FormStep.card_payment, label: "Payment details", route: "card-payment" },
	{ id: FormStep.confirm, label: "Confirm", route: "confirm" }
];

export const formSteps = FORM_STEPS_DATA.map((step, index) => ({ ...step, url: `/sttl/${step.route}`, stepNumber: index }));

export const formStepById = formSteps.reduce((acc, step) => {
	acc[step.id] = step;
	return acc;
}, {});

export const formStepByRoute = formSteps.reduce((acc, step) => {
	acc[step.route] = step;
	return acc;
}, {});

export const getEditStepUrl = (step: FormStep, entry: number) => `/sttl/review/${formStepById[step].route}?entry=${entry}`;
