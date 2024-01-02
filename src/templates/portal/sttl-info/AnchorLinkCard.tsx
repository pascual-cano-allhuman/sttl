import { Box, Text, TextLink } from "trade-portal-components";

export const AnchorLinkCard = () => {
	const scrollIntoView = (e, view) => {
		e.preventDefault();
		const item = document.getElementById(view);
		setTimeout(() => {
			item?.scrollIntoView({ behavior: "smooth" });
		}, 200);
	};

	return (
		<Box background="fi_surface_grey" gap="1.6rem" padding="3.2rem 2rem  3rem 2.4rem">
			<Text textStyle="text_small" color="fi_text_80">
				FAQ Sections:
			</Text>
			<Box gap="1.6rem">
				<TextLink
					variant="icon_link"
					size="small"
					leadingIcon="fi-circle-exclamation"
					onClick={e => scrollIntoView(e, "about_sttl_register")}
				>
					About Short Term Tourist Letting Register
				</TextLink>
				<TextLink variant="icon_link" size="small" leadingIcon="fi-phone" onClick={e => scrollIntoView(e, "online_registration_system")}>
					About the online registration system
				</TextLink>
				<TextLink onClick={e => scrollIntoView(e, "who_needs_to_register")} variant="icon_link" size="small" leadingIcon="fi-user">
					Who needs to register?
				</TextLink>
				<TextLink variant="icon_link" size="small" onClick={e => scrollIntoView(e, "quality_assured")} leadingIcon="fi-circle-check">
					Already on NQAF / Quality Assured
				</TextLink>
				<TextLink onClick={e => scrollIntoView(e, "glossary")} variant="icon_link" size="small" leadingIcon="fi-glossary">
					Glossary
				</TextLink>
			</Box>
		</Box>
	);
};