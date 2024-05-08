import { Box, Button, Copycat, Icon, Text, theme } from "trade-portal-components";
import { Property } from "models/dashboard";

export const PropertyCard = ({ property }: { property: Property }) => {
	const { address, status = "Active", sttlNumber } = property;
	const { postalCode, streetAddress } = address || {};
	const id = property.id || "";
	const { borderColor, icon, color, text } = PROPERTY_STATUS[status];

	return (
		<Box background="fi_surface_white" padding={["3.2rem 2.4rem", "3.2rem"]}>
			<Box
				borderLeft={`2px solid ${theme.color[borderColor]}`}
				paddingLeft={["2.4rem", "3.2rem"]}
				minHeight="15.4rem"
				justifyContent="space-between"
				gap="2.4rem"
				flexDirection={["column", "row"]}
			>
				<Box justifyContent="space-between" minHeight="15.4rem" alignItems="stretch" gap="2.4rem">
					<Box>
						<Text textStyle="text_large" color="fi_text_90">
							{streetAddress}
						</Text>
						<Text textStyle="text_large" color="fi_text_90">
							{postalCode}
						</Text>
					</Box>
					<Copycat label="Property STTL number:">{sttlNumber}</Copycat>
				</Box>
				<Box justifyContent="space-between" height={["100%", "15.4rem"]} alignItems="stretch" gap="1.6rem">
					<Box alignItems={["start", "end"]} gap="0.4rem">
						<Text color="fi_text_60" textStyle="text_small" width="fit-content">
							Registration status:
						</Text>
						<Box flexDirection="row" alignItems="center" justifyContent={["flex-start", "flex-end"]} gap="0.8rem">
							<Icon codename={icon} size={16} color={color} />
							<Text textStyle="link_large" textDecoration="none" color={color} as="span">
								{text}
							</Text>
						</Box>
					</Box>
					<Box justifyContent="flex-end" alignItems={["flex-start", "center"]} flexDirection={["column", "row"]}>
						{/* TODO: Will get Renew now button back */}
						{/* {valueReference !== cardStatus.Active && ( */}
						{/*	<Button variant="tertiary" size="large"> */}
						{/*		Renew now */}
						{/*	</Button> */}
						{/* )} */}
						<Button size="large" variant="primary" as="a" href={`/dashboard/${id}`}>
							View property details
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export const PROPERTY_STATUS = {
	Renew: {
		color: "fi_accent_info_100",
		icon: "fi-circle-exclamation",
		text: "Ready for renewal",
		borderColor: "fi_accent_info_80"
	},
	Expired: {
		color: "fi_accent_error_100",
		icon: "fi-circle-exclamation",
		text: "Expired",
		borderColor: "fi_accent_error_60"
	},
	Withdrawn: {
		color: "fi_accent_error_100",
		icon: "fi-circle-exclamation",
		text: "Withdrawn",
		borderColor: "fi_accent_error_100"
	},
	Active: {
		color: "fi_action_primary_100",
		icon: "fi-circle-check",
		text: "Active",
		borderColor: "fi_secondary_sea_100"
	}
};
