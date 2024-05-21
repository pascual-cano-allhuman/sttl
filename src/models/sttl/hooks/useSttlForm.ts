import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getPropertiesFromForm, getPropertiesFromSchema } from "models/sttl/mappings";
import { FormState } from "models/sttl/types";
import { useAlert, Alert, OrderSchema } from "models/global";
import { addStepDataToState, hasPartialState, deleteEntryFromState } from "./utils";
import { formSteps, formStepById, FormStep, getEditStepUrl } from "./formSteps";
import { getFormFromProperties } from "../mappings/form/getFormFromProperties";

type Parameters = {
	initialState?: FormState;
	sendQAUpsell: () => Promise<void>;
	loadSaveAndResumeData: () => Promise<OrderSchema>;
	resetCorrelationId: () => void;
};

export const useSttlForm = (params: Parameters) => {
	// parameters
	const { initialState, sendQAUpsell, loadSaveAndResumeData, resetCorrelationId } = params;
	const steps = formSteps;

	// url data
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	// states
	const [formState, setFormState] = React.useState<FormState>(initialState);
	const propertiesList = React.useMemo(() => getPropertiesFromForm(formState), [formState]);
	const hasSentQAMembershipUpsell = React.useRef(false);
	const { alert, closeAlert, showAlertOnUrl } = useAlert();
	const isSetup = React.useRef(false);

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
		const hasCompletedProperty = !hasPartialState(updatedState);
		if (isEditing) showAlertOnUrl(alerts.PROPERTY_CHANGED, formStepById[FormStep.review].url);
		else if (hasCompletedProperty) showAlertOnUrl(alerts.PROPERTY_ADDED, formStepById[FormStep.review].url);
		else router.push(nextStep.url);
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
	const goToEditStep = (step: FormStep, entry: number) => router.push(getEditStepUrl(step, entry));
	const registerNewProperty = () => goToStep(FormStep.propertyType);
	const goToReview = () => goToStep(FormStep.review);

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

	// reset the correlation id when the user goes to the confirm page
	React.useEffect(() => {
		if (pathname.endsWith("/confirm")) resetCorrelationId();
	}, [pathname]);

	// if you land to the review page without any data, load the persisted order
	React.useEffect(() => {
		if (!pathname.endsWith("/review") || isSetup.current) return;
		isSetup.current = true;
		loadSaveAndResumeData().then(order => {
			const properties = getPropertiesFromSchema(order);
			const formState = getFormFromProperties(properties);
			if (formState) setFormState(formState);
		});
	}, []);

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
