import { FormState, PropertyData } from "../types";
import { FormStep } from "./formSteps";

// build a properties list from the form state
export const getPropertiesList = (formState: FormState) => {
	if (!formState) return [];
	const total = formState.propertyOwner?.length || 0;
	const list = [];
	for (let i = 0; i < total; i++) {
		const property = {
			propertyType: formState.propertyType[i],
			statutoryObligations: formState.statutoryObligations[i],
			propertyAddress: formState.propertyAddress[i],
			propertyOwner: formState.propertyOwner[i]
		};
		list.push(property);
	}
	return list as PropertyData[];
};

// check if the form state is partial
export const hasPartialState = (formState: FormState) => {
	if (!formState) return true;
	const total = formState.propertyOwner?.length || 0;
	return formState.propertyType?.length > total;
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

// retry mechanism for fetching order status
export const retry = async (callback: () => Promise<any>) => {
	for (let i = 0; i < 15; i++) {
		try {
			const result = await callback(); // eslint-disable-line no-await-in-loop
			if (result) return result;
		} finally {
			await sleep(2000); // eslint-disable-line no-await-in-loop
		}
	}
};

// delay for retry
const sleep = (ms: number): Promise<void> => {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
};
