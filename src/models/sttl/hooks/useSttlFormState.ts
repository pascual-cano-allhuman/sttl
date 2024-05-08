import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getFormFromOrder } from "models/sttl/mappings";
import { FormState, Order } from "models/sttl/types";
import { useAlert, Alert } from "models/global";
import { addStepDataToState, hasPartialState, getPropertiesList, deleteEntryFromState } from "./utils";
import { formSteps, formStepById, FormStep } from "./formSteps";

type Parameters = {
	initialState?: FormState;
	sendQAUpsell: () => Promise<void>;
	resetCorrelationId: () => void;
};

export const useSttlFormState = (params: Parameters) => {
	// parameters
	const { initialState, sendQAUpsell, resetCorrelationId } = params;
	const steps = formSteps;

	// url data
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	// states
	const [formState, setFormState] = React.useState<FormState>(initialState);
	const propertiesList = React.useMemo(() => getPropertiesList(formState), [formState]);
	const hasSentQAMembershipUpsell = React.useRef(false);
	const { alert, closeAlert, showAlert } = useAlert();

	// current step data
	const { currentStep, nextStep, prevStep, isEditing, stepper } = React.useMemo(() => {
		const isEditing = pathname.includes("/review/");
		const slug = pathname.split("/").pop();
		const currentStep = steps.find(step => step.route === slug);
		if (!currentStep) return {};
		const nextStep = steps[currentStep.stepNumber + 1];
		const prevStep = steps[currentStep.stepNumber - 1];
		const displayedStep = isEditing ? formStepById[FormStep.review] : currentStep;
		const stepper = { step: displayedStep.stepNumber, label: displayedStep.label, total: steps.length - 2 };
		return { currentStep, nextStep, prevStep, isEditing, stepper };
	}, [pathname]);

	// save step data on the current entry and go to the next step
	const onNextStep = (stepData?: Record<string, any>) => {
		const updatedState = updateState(stepData);
		router.push(nextStep.url);
		if (isEditing) showAlert(alerts.PROPERTY_CHANGED);
		else if (!hasPartialState(updatedState)) showAlert(alerts.PROPERTY_ADDED);
	};

	// go to the previous step in the flow
	const onPrevStep = () => router.push(prevStep.url);

	// update form state with the data from the current step
	const updateState = (stepData: Record<string, any>) => {
		const entry = isEditing ? +searchParams.get("entry") : propertiesList.length;
		const updatedState = addStepDataToState(formState, currentStep.id, entry, stepData);
		setFormState(updatedState);
		return updatedState;
	};

	// go to particular steps
	const goToStep = (step: FormStep) => router.push(formStepById[step].url);
	const goToReview = () => goToStep(FormStep.review);
	const goToEditStep = (step: string, entry: number) => router.push(`${formStepById[step].url}?entry=${entry}`);
	const registerNewProperty = () => goToStep(FormStep.property_type);

	// delete a property on the review screen
	const deleteProperty = async (entryIndex: number) => {
		closeAlert();
		const newState = deleteEntryFromState(formState, entryIndex);
		setFormState(newState);
	};

	// send the quality assured consent
	const applyForQAMembership = async () => {
		if (!hasSentQAMembershipUpsell.current) sendQAUpsell();
		hasSentQAMembershipUpsell.current = true;
	};

	// update form state from a persisted order
	const updateFormState = (order: Order) => {
		const state = getFormFromOrder(order);
		if (state) setFormState(state);
	};

	// reset the correlation id when the user goes to the confirm page
	React.useEffect(() => {
		if (pathname.includes("/confirm")) resetCorrelationId();
	}, [pathname]);

	return {
		formState,
		propertiesList,
		stepper,
		isEditing,
		onPrevStep,
		onNextStep,
		goToStep,
		goToEditStep,
		goToReview,
		registerNewProperty,
		deleteProperty,
		applyForQAMembership,
		updateFormState,
		alert,
		closeAlert
	};
};

const alerts = {
	PROPERTY_ADDED: {
		message: "Your property has been added and your application has been saved.",
		type: "success"
	} as Alert,
	PROPERTY_CHANGED: {
		message: "Your changes have been made.",
		type: "success"
	} as Alert
};
