import { Box, Text } from "trade-portal-components";

type Props = {
	address: { country?: string; county: string; town: string; addressLine1: string; postcode: string };
};

export const AddressDisplay = ({ address }: Props) => {
	const lines = [address.addressLine1, address.county, address.town, address.postcode, address.country].filter(Boolean);
	return (
		<Box gap="0.8rem">
			{lines.map((line, i) => (
				<Text key={i} textStyle="text_large">
					{line}
				</Text>
			))}
		</Box>
	);
};
