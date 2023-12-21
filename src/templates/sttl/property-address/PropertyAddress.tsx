import React from "react";
import { useForm, useController, FormProvider } from "react-hook-form";
import { Stepper, Box, AddressLookup } from "trade-portal-components";
import { FormFooter, FormHeader, FormStepContainer } from "templates";
import { getAutocompleteAddresses, getFormattedAddress } from "lib/autoaddress";
import { PropertyAddressStep } from "models/sttl";
import { AddressForm } from "./AddressForm";

type TemplateProps = {
	onNextBtnClick: (values: any) => void;
	onPrevBtnClick: () => void;
	defaultValues: PropertyAddressStep;
	stepper: { step: number; label: string; totalSteps: number };
	excludedEircodes?: string[];
};

export const PropertyAddress = (props: TemplateProps) => {
	const [showManualForm, setShowManualForm] = React.useState(false);
	const addressLookupRef = React.useRef(null);
	const { onNextBtnClick, onPrevBtnClick, stepper, defaultValues, excludedEircodes = ["D02 CX36"] } = props;
	const methods = useForm({ mode: "all", defaultValues });
	const { getValues, trigger, control } = methods;
	const addressField = useController({
		control,
		name: "propertyAddress",
		rules: { required: "Required", validate: address => validateAddress(address, excludedEircodes) }
	});

	const nextBtnHandler = async () => {
		const isValid = trigger();
		if (isValid) onNextBtnClick(getValues());
	};

	return (
		<FormStepContainer
			stepper={<Stepper totalSteps={stepper?.totalSteps} currentStep={stepper?.step} label={stepper.label} />}
			footer={<FormFooter onNextBtnClick={nextBtnHandler} onPrevBtnClick={onPrevBtnClick} />}
			header={
				<FormHeader
					title="Short Term Tourist Letting property address"
					subtitle="This is the address of the Short Term Tourist Letting property being registered."
				/>
			}
		>
			{!showManualForm && (
				<Box columns={4} minHeight="12rem">
					<AddressLookup
						ref={addressLookupRef}
						name="property-address"
						label="Address search"
						defaultValue={{}}
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
