import React from "react";
import { Text, Box, Divider, Copycat } from "trade-portal-components";

export type RegisteredProperty = {
	address: string;
	sttlNumber: string;
	eircode: string;
};

export const PropertyEntry = (props: RegisteredProperty) => {
	const { address, eircode, sttlNumber } = props;
	return (
		<Box gap="1.6rem">
			<Box gap="0rem">
				<Text>{address}</Text>
				<Text>{eircode}</Text>
			</Box>
			<Copycat label="Property STTL number:">{sttlNumber}</Copycat>
			<Divider margin="1rem" />
		</Box>
	);
};
