import { Box, Text, TextLink } from "trade-portal-components";

export const Contact = () => {
	return (
		<Box flexWrap="wrap" columns={[3, 6]} flexDirection="row" justifyContent="center" alignItems="center" gap="0.8rem">
			<Text textStyle="text_small" color="fi_text_80">
				Need help? Call us on{" "}
			</Text>
			<TextLink variant="text_link" size="small" colorCode="fi_primary_100" data-testid="phone" href="tel:+35315741990">
				+353 1 574 1990
			</TextLink>
			<Text textStyle="text_small" color="fi_text_80">
				or email{" "}
			</Text>
			<TextLink variant="text_link" size="small" colorCode="fi_primary_100" data-testid="email" href="mailto:customersupport@failteireland.ie">
				customersupport@failteireland.ie
			</TextLink>
		</Box>
	);
};
