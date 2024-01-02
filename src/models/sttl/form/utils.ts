import { FormState, PropertyData } from "../types";
import { FormStep } from "./useFormSteps";

// build a properties list from the form state
export const getPropertiesList = (formState: FormState) => {
	if (!formState) return [];
	const total = formState.property_owner_details?.length || 0;
	const list = [];
	for (let i = 0; i < total; i++) {
		const property = {
			property_type: formState.property_type[i],
			statutory_obligations: formState.statutory_obligations[i],
			property_address: formState.property_address[i],
			property_owner_details: formState.property_owner_details[i]
		};
		list.push(property);
	}
	return list as PropertyData[];
};

// check if the form state is partial
export const hasPartialState = (formState: FormState) => {
	if (!formState) return true;
	const total = formState.property_owner_details?.length || 0;
	return formState.property_type?.length > total;
};

// add step data to the form state on the current entry
export const addStepDataToState = (formState: FormState, formStep: FormStep, entry: number, stepData: Record<string, any>): FormState => {
	if (!stepData) return formState;
	if (formStep === FormStep.review) return { ...formState, ...stepData };
	const currentFormStepData = formState?.[formStep] || [];
	const newFormStepData = [...currentFormStepData];
	newFormStepData[entry || 0] = stepData;
	const newState = { ...formState, [formStep]: newFormStepData };
	return newState;
};

// delete a property on the review screen
export const deleteEntryFromState = (formState: FormState, entryIndex: number) => {
	const newState = { ...formState };
	Object.values(FormStep).forEach(step => {
		if (!newState[step] || step === FormStep.review) return;
		delete newState[step]?.[entryIndex];
		newState[step] = newState[step].filter(Boolean);
	});
	return newState;
};

// preset cypress data into the form
export const presetCypressData = (cy: any, setFormState: (state: any) => void, setOrderResult: (result: any) => void) => {
	if (!cy) return;
	setFormState(cy.env("FORM_STATE"));
	setOrderResult(cy.env("ORDER_RESULT"));
};
