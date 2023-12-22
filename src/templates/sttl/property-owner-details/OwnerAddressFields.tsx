import React from "react";
import { useFormContext, useController } from "react-hook-form";
import { AddressLookup } from "trade-portal-components";
import { getAutocompleteAddresses, getFormattedAddress } from "lib/autoaddress";
import { AddressForm } from "../shared/AddressForm";

export const OwnerAddressFields = () => {
	const [showManualForm, setShowManualForm] = React.useState(false);
	const { watch } = useFormContext();
	const addressField = useController({ name: "ownerAddress", rules: { required: "Required" } });
	const countryOfResidence = watch(`countryOfResidence`) || "Ireland";
	const isIreland = countryOfResidence === "Ireland";

	if (showManualForm || !isIreland) return <AddressForm isIrishAddress={isIreland} addressFieldsPrefix="ownerAddress" />;

	return (
		<AddressLookup
			name="ownerAddress"
			label="Address search"
			defaultValue={{}}
			getAutocompleteAddresses={getAutocompleteAddresses}
			getFormattedAddress={getFormattedAddress}
			onEditAddress={() => setShowManualForm(true)}
			onChange={addressField.field.onChange}
			error={addressField.fieldState.error?.message}
		/>
	);
};
