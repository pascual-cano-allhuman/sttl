import React from "react";
import { Box, Text } from "trade-portal-components";
import { Address } from "models/sttl";

type Props = {
	address: Address;
	country?: string;
	hasBackground?: boolean;
};

export const AddressDisplay = (props: Props) => {
	const { address, country, hasBackground } = props;
	return (
		<>
			{!hasBackground && (
				<Box gap="0.8rem">
					<AddressList address={address} country={country} />
				</Box>
			)}
			{hasBackground && (
				<Box padding="2.4rem" background="fi_surface_grey" borderRadius="0.8rem">
					<AddressList address={address} country={country} />
				</Box>
			)}
		</>
	);
};

const AddressList = ({ address, country }: { address: Address; country: string }) => {
	const { addressLine1, addressLine2, addressLine3, town, postcode, county } = address || {};
	const countyWithPrefix = !county || county.startsWith("Co. ") || (country && country !== "Ireland") ? county : `Co. ${county}`;
	const fields = [country, addressLine1, addressLine2, addressLine3, town, postcode, countyWithPrefix].filter(Boolean);
	const fieldsWithComma = fields.map((field, index) => (index < fields.length - 1 ? `${field},` : field));
	return fieldsWithComma.map((field: string, index: number) => (
		<Text key={index} color="#000">
			{field}
		</Text>
	));
};
