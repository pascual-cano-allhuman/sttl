import { Box, Text } from "trade-portal-components";
import React from "react";

type FormHeaderProps = {
	title?: string;
	subtitle?: string | React.ReactNode;
	children?: React.ReactNode;
};

export const FormHeader = (props: FormHeaderProps) => {
	const { title, subtitle, children } = props;
	return (
		<Box gap="0.8rem" alignItems="center" columns={4}>
			{title && (
				<Text as="h1" textStyle="heading_small" color="fi_action_primary_100" textAlign="center">
					{title}
				</Text>
			)}
			{subtitle && typeof subtitle === "string" ? <Text textAlign="center">{subtitle}</Text> : subtitle}
			{children}
		</Box>
	);
};
