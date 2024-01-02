import React from "react";
import { Box, Dropdown, Input } from "trade-portal-components";
import { useFormContext } from "react-hook-form";
import { counties } from "settings/counties";
import { validateTextInput } from "lib/react-hook-form";

type AddressFormProps = {
	isIrishAddress?: boolean;
	addressFieldsPrefix?: string;
	excludedEircodes?: string[];
};
export const AddressForm = (props: AddressFormProps) => {
	const { addressFieldsPrefix, isIrishAddress = false, excludedEircodes } = props;
	const { register, formState } = useFormContext();
	const errors = addressFieldsPrefix ? formState?.errors?.[addressFieldsPrefix] : formState?.errors;
	const defaultValues = React.useMemo(() => (addressFieldsPrefix ? formState?.defaultValues?.[addressFieldsPrefix] : formState?.defaultValues), []);
	const getFieldName = (fieldName: string) => (addressFieldsPrefix ? `${addressFieldsPrefix}.${fieldName}` : fieldName);

	return (
		<Box gap="2.4rem">
			<Input
				label="Address line 1"
				{...register(getFieldName(`addressLine1`), validateTextInput({ min: 0, max: 200 }))}
				error={errors?.["addressLine1"]?.message}
			/>
			<Input
				label="Address line 2 (optional)"
				{...register(getFieldName(`addressLine2`), validateTextInput({ min: 0, max: 200, required: false }))}
				error={errors?.["addressLine2"]?.message}
			/>
			<Input
				label="Town/City"
				id="town"
				{...register(getFieldName(`town`), validateTextInput({ min: 0, max: 200 }))}
				error={errors?.["town"]?.message}
			/>
			{isIrishAddress ? (
				<>
					<Dropdown
						{...register(getFieldName(`county`), { required: "This field is required" })}
						options={counties}
						label="County"
						error={errors?.["county"]?.message}
						defaultValue={defaultValues?.county}
					/>
					<Input
						label="Eircode"
						{...register(getFieldName(`postcode`), {
							...validateTextInput({ min: 0, max: 200 }),
							validate: postcode => validateAddress(postcode, excludedEircodes)
						})}
						error={errors?.["postcode"]?.message}
					/>
				</>
			) : (
				<>
					<Input
						label="State/Province/Region"
						{...register(getFieldName(`county`), validateTextInput({ min: 0, max: 200 }))}
						error={errors?.["county"]?.message}
					/>
					<Input
						label="Zip/Postal Code"
						{...register(getFieldName(`postcode`), {
							...validateTextInput({ min: 0, max: 200 }),
							validate: postcode => validateAddress(postcode, excludedEircodes)
						})}
						error={errors?.["postcode"]?.message}
					/>
				</>
			)}
		</Box>
	);
};

const validateAddress = (postcode: string, excludedEircodes: string[]) => {
	if (excludedEircodes?.includes(postcode)) return "You have already added a property with this Eircode";
	return true;
};

AddressForm.displayName = "AddressForm";
export default AddressForm;
