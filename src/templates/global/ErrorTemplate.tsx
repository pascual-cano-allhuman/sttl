import { Box, Button, Text, Icon } from "trade-portal-components";

type ErrorTemplateProps = {
	children: any;
};

export const ErrorTemplate = (props: ErrorTemplateProps) => {
	const { children } = props;
	return (
		<Box justifyContent="center" alignItems="center">
			<Box
				padding="2.4rem  2.4rem  3.2rem 2.4rem"
				justifyContent="center"
				alignItems="center"
				columns={[4, 5]}
				background="fi_surface_white"
				borderRadius="0.8rem"
				gap="2.4rem"
			>
				<Box justifyContent="center" alignItems="center" gap="1.6rem">
					<Icon size={36} codename="fi-telescope-spot" />
					<Text textStyle="heading_extra_small">Uh, oh! </Text>
					<Text textStyle="text_small" textAlign="center">
						{children}
					</Text>
				</Box>
				<Button href={process.env.TRADE_PORTAL_LEGACY_SITE_URL} as="a">
					Trade Portal home
				</Button>
			</Box>
		</Box>
	);
};

export default ErrorTemplate;
