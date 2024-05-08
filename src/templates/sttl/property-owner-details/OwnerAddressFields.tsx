"use client";

import React from "react";
import { useFormContext, useController } from "react-hook-form";
import { AddressLookup } from "trade-portal-components";
import { getAutocompleteAddresses, getFormattedAddress } from "lib/autoaddress";
import { AddressForm } from "../shared/AddressForm";

export const OwnerAddressFields = () => {
	const [showManualForm, setShowManualForm] = React.useState(false);
	const { formState, watch } = useFormContext();
	const { defaultValues, isDirty } = formState;
	const addressField = useController({ name: "ownerAddress", rules: { validate: value => !!value?.addressLine1 || "Required" } });
	const countryOfResidence = watch(`countryOfResidence`);
	const isIreland = countryOfResidence === "Ireland";

	if (showManualForm || !isIreland) return <AddressForm key={countryOfResidence} isIrishAddress={isIreland} addressFieldsPrefix="ownerAddress" />;
	return (
		<AddressLookup
			name="ownerAddress"
			label="Address search"
			inputRef={addressField.field.ref}
			defaultAddress={!isDirty ? defaultValues?.ownerAddress : null}
			getAutocompleteAddresses={getAutocompleteAddresses}
			getFormattedAddress={getFormattedAddress}
			onEditAddress={() => setShowManualForm(true)}
			onChange={addressField.field.onChange}
			error={addressField.fieldState.error?.message}
		/>
	);
};
