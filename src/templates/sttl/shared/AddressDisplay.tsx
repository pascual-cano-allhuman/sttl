import React from "react";
import { Box, Text } from "trade-portal-components";

type Props = {
	propertyAddress: Record<string, string>;
};

export const AddressDisplay = (props: Props) => {
	const { propertyAddress } = props;
	const propertyAddressValues = Object.values(propertyAddress).filter(Boolean);

	if (propertyAddressValues?.length === 0) return null;

	return (
		<Box padding="2.4rem" background="fi_surface_grey" borderRadius="0.8rem">
			<div>
				{propertyAddressValues.map((value, index) => {
					const postfix = propertyAddressValues.length - 1 === index ? "" : ",";
					return (
						<Text key={index} color="#000">
							{value}
							{postfix}
						</Text>
					);
				})}
			</div>
		</Box>
	);
};
