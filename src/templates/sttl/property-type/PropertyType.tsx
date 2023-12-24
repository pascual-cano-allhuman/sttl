import React from "react";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Stepper, Alert, Box, CardSelector, CardSelectorGroup } from "trade-portal-components";
import { FormFooter, FormHeader, FormStepContainer } from "templates";
import { PropertyTypeStep, Category } from "models/sttl";
import { SelectedPropertyFields } from "./SelectedPropertyFields";

type TemplateProps = {
	onNextBtnClick: (values: any) => void;
	onPrevBtnClick: () => void;
	defaultValues: PropertyTypeStep;
	stepper: { step: number; label: string; totalSteps: number };
};

export const PropertyType = (props: TemplateProps) => {
	const [showAlert, setShowAlert] = React.useState(true);
	const { defaultValues, stepper, onNextBtnClick, onPrevBtnClick } = props;
	const methods = useForm({ mode: "all", defaultValues });
	const { getValues, trigger, register, watch } = methods;
	const category = watch("category");

	const nextBtnHandler = async () => {
		const isValid = await trigger(null, { shouldFocus: true });
		if (isValid) onNextBtnClick(getValues());
	};

	if (!defaultValues) return null;
	return (
		<FormProvider {...methods}>
			<FormStepContainer
				stepper={<Stepper totalSteps={stepper?.totalSteps} currentStep={stepper?.step} label={stepper.label} />}
				footer={<FormFooter onNextBtnClick={nextBtnHandler} isNextBtnDisabled={!category} onPrevBtnClick={onPrevBtnClick} />}
				header={<FormHeader title="About the property" subtitle="Select the type of Short Term Tourist Letting property being registered" />}
			>
				<Box alignItems="center" columns={[4, 6]}>
					<CardSelectorGroup onChange={() => setShowAlert(true)}>
						{cards.map(card => (
							<CardSelector card={card} key={card.id} {...register(`category`)} />
						))}
					</CardSelectorGroup>
				</Box>
				{category && showAlert && (
					// TODO remove marginTop
					<Box columns={6} marginTop="-1rem">
						<Alert size="sm" status="info" onClose={setShowAlert}>
							{infoAlertText[category]}
						</Alert>
					</Box>
				)}
				<SelectedPropertyFields />
			</FormStepContainer>
		</FormProvider>
	);
};

const infoAlertText = {
	[Category.room]: `NB: The host resides on the premises during provision of accommodation and it is their primary residence.`,
	[Category.fullProperty]: `NB: The host does not reside at the premises (it is a secondary property).`,
	[Category.units]: `NB: If you have several different types of accommodations at the same address or Eircode you can ‘add another unit type’.`
};

const cards = [
	{ id: Category.room, icon: "fi-bed", title: "Bedroom(s) in your home", ariaLabel: "Bedrooms in your home" },
	{ id: Category.fullProperty, icon: "fi-bed", title: "Entire property" },
	{ id: Category.units, icon: "fi-camp-spot", title: "Multiple units at a site / Complex" }
];
