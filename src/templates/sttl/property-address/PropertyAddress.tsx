import React from "react";
import { useForm, useController, FormProvider } from "react-hook-form";
import { Stepper, Box, AddressLookup } from "trade-portal-components";
import { FormFooter, FormHeader, FormStepContainer } from "templates";
import { getAutocompleteAddresses, getFormattedAddress } from "lib/autoaddress";
import { PropertyAddressStep } from "models/sttl";
import { AddressForm } from "../shared/AddressForm";

type TemplateProps = {
	onNextBtnClick: (values: any) => void;
	onPrevBtnClick: () => void;
	isEditing: boolean;
	defaultValues: PropertyAddressStep;
	stepper: { step: number; label: string; total: number };
	excludedEircodes?: string[];
};

export const PropertyAddress = (props: TemplateProps) => {
	const { onNextBtnClick, onPrevBtnClick, stepper, defaultValues, excludedEircodes = [], isEditing } = props;
	const [showManualForm, setShowManualForm] = React.useState(false);
	const nextLabel = isEditing ? "Save & continue" : "Next";
	const backLabel = isEditing ? "Cancel" : "Back";
	const title = "Short Term Tourist Letting property address";
	const subtitle = "This is the address of the Short Term Tourist Letting property being registered.";

	const methods = useForm({ mode: "all", defaultValues });
	const { getValues, trigger, control } = methods;
	const addressField = useController({
		control,
		name: "propertyAddress",
		rules: { required: "Required", validate: address => validateAddress(address, excludedEircodes) }
	});

	const nextBtnHandler = async () => {
		const isValid = await trigger(null, { shouldFocus: true });
		if (isValid) onNextBtnClick(getValues());
	};

	return (
		<FormStepContainer
			stepper={<Stepper totalSteps={stepper?.total} currentStep={stepper?.step} label={stepper.label} />}
			footer={<FormFooter onNextBtnClick={nextBtnHandler} onPrevBtnClick={onPrevBtnClick} nextBtnLabel={nextLabel} backBtnLabel={backLabel} />}
			header={<FormHeader title={title} subtitle={subtitle} />}
		>
			{!showManualForm && (
				<Box columns={4} minHeight="10rem">
					<AddressLookup
						name="propertyAddress"
						label="Address search"
						inputRef={addressField.field.ref}
						defaultAddress={defaultValues?.propertyAddress}
						getAutocompleteAddresses={getAutocompleteAddresses}
						getFormattedAddress={getFormattedAddress}
						onEditAddress={() => setShowManualForm(true)}
						onChange={addressField.field.onChange}
						error={addressField.fieldState.error?.message}
					/>
				</Box>
			)}
			{showManualForm && (
				<Box columns={4}>
					<FormProvider {...methods}>
						<AddressForm isIrishAddress addressFieldsPrefix="propertyAddress" excludedEircodes={excludedEircodes} />
					</FormProvider>
				</Box>
			)}
		</FormStepContainer>
	);
};

const validateAddress = (address, excludedEircodes) => {
	if (excludedEircodes.includes(address?.postcode)) return "You have already added a property with this Eircode";
	return true;
};

export default PropertyAddress;
