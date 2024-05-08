import { Box, Icon, Text, TextLink, theme } from "trade-portal-components";

export const NeedHelp = () => {
	return (
		<Box padding={["3.2rem 0.8rem", "3.2rem 2.4rem"]}>
			<Box
				paddingLeft={["2.4rem", "3.2rem"]}
				justifyContent="space-between"
				borderLeft={`2px solid ${theme.color.fi_secondary_sea_100}`}
				gap="3.4rem"
			>
				<Box
					flexDirection={["column", "column", "row"]}
					justifyContent="space-between"
					alignItems="start"
					gap={["2.4rem", "2.4rem", "6.4rem"]}
				>
					<Box gap="2.4rem">
						<Box flexDirection="row" alignItems="center" gap="1.6rem">
							<Icon codename="fi-spot-question" size={36} />
							<Text textStyle="heading_small" color="fi_text_90">
								Have a question?
							</Text>
						</Box>
						<Box alignItems="start" columns={[0, 0, 5]}>
							<Text textStyle="text_large" color="fi_text_90">
								If you have a question, Fáilte Ireland Customer Support are here to help. You can contact us by email or phone.
							</Text>
						</Box>
					</Box>
					<Box alignItems="flex-end" width={["100%", "fit-content"]} gap="1.6rem">
						<Box flexDirection="column" gap="0.8rem">
							<TextLink variant="icon_link" leadingIcon="fi-envelope" size="large" href="mailto:customersupport@failteireland.ie">
								customersupport@failteireland.ie
							</TextLink>
							<Box flexDirection="row" alignItems="center" gap="0.4rem">
								<TextLink variant="icon_link" leadingIcon="fi-phone" size="large" href="tel:0818888800">
									0818 888800
								</TextLink>
								<Text textStyle="text_label" as="span" color="fi_action_primary_100" fontWeight={700}>
									or
								</Text>
								<TextLink variant="icon_link" size="large" href="tel:+35315741990">
									+353 1 574 1990
								</TextLink>
							</Box>
						</Box>
						<Box>
							<Text color="fi_text_80" textStyle="text_large" fontWeight={700}>
								Opening hours
							</Text>
							<Box color="fi_text_80" textStyle="text_large">
								Monday to Friday, 9am - 5pm
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
