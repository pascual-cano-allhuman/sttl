import { Box, Divider, Icon, Text } from "trade-portal-components";
import { ReactNode } from "react";
import { BackToTop } from "./BackToTop";

type TitleCardProps = {
	hasDivider?: boolean;
	title: string;
	icon?: string;
	id: string;
	children: ReactNode;
};

export const TitleCard = ({ title, children, hasDivider = false, icon = "fi-circle-exclamation", id }: TitleCardProps) => {
	return (
		<Box gap="1.6rem" id={id}>
			<Box gap="0.8rem">
				<Icon size={16} codename={icon} as="span" />
				<Text textStyle="heading_extra_small" color="fi_action_primary_100">
					{title}
				</Text>
			</Box>
			<Box gap="0.8rem">
				<Box margin={`0 0 ${hasDivider ? "2.4rem" : "0"} 0`}>{children}</Box>
				<Box gap="0.8rem">
					{hasDivider && <Divider color="fi_action_primary_40" />}
					<BackToTop />
				</Box>
			</Box>
		</Box>
	);
};
