"use client";

import { Box, Button, Text } from "trade-portal-components";
import { useRouter } from "next/navigation";

export const HeadingCard = () => {
	const router = useRouter();
	const redirectToSignUp = () => {
		router.push(`${process.env.TRADE_PORTAL_STTL_APP_URL}/sttlr`);
	};

	return (
		<Box columns={4} alignItems="center" padding="0" gap="2.4rem">
			<Box gap="0.8rem">
				<Text textStyle="heading_small" as="h1" color="fi_action_primary_100" textAlign="center">
					Short Term Tourist Letting Register
				</Text>
				<Text textStyle="text_large" textAlign="center">
					All short term accommodation providers are now required to register on the Short Term Tourist Letting Register (STTLR),
					registering a property is very simple and can be done online to generate your STTLR number.
				</Text>
			</Box>
			<Box alignItems="center">
				<Button size="medium" trailingIcon="fi-arrow-right" onClick={redirectToSignUp}>
					Register here
				</Button>
			</Box>
		</Box>
	);
};
