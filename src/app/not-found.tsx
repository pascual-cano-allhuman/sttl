"use client";

import { Box, Text, Button, TextLink, Icon } from "trade-portal-components";

const TRADE_PORTAL_LEGACY_SITE_URL = process.env.TRADE_PORTAL_LEGACY_SITE_URL?.replace(/\/$/, "") || "";

const NotFound = () => {
	return (
		<Box
			background="white"
			borderRadius="0.8rem"
			columns={[4, 5]}
			margin="0 auto 16rem"
			padding="4.8rem"
			justifyContent="center"
			alignItems="center"
			gap="2.4rem"
		>
			<Box justifyContent="center" alignItems="center" gap="1.6rem">
				<Icon size={[36, 72]} codename="fi-telescope-spot" color="fi_action_primary_100" />
				<Text textAlign="center" color="fi_text_100" textStyle="heading_extra_small">
					404 error - page not found
				</Text>
				<Text textAlign="center" color="fi_text_80" textStyle="text_small">
					The page you are looking for cannot be found or another error has occurred
				</Text>
			</Box>
			<Button size="large" variant="primary" href={process.env.TRADE_PORTAL_LEGACY_SITE_URL} as="a">
				Trade Portal home
			</Button>
			<TextLink variant="text_link" color="fi_primary_100" href={`${TRADE_PORTAL_LEGACY_SITE_URL}/profile`}>
				Go to your account
			</TextLink>
		</Box>
	);
};

export default NotFound;
