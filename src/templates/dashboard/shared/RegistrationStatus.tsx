import { Box, Icon, Text } from "trade-portal-components";

export const RegistrationStatus = ({ status }: { status: string }) => {
	const { icon, color, text } = PROPERTY_STATUS[status] || PROPERTY_STATUS.Active;
	return (
		<Box flexDirection="row" alignItems="center" justifyContent={["flex-start", "flex-end"]} gap="0.8rem">
			<Icon codename={icon} size={16} color={color} />
			<Text textStyle="link_large" textDecoration="none" color={color} as="span">
				{text}
			</Text>
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
