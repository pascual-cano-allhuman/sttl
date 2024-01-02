import { Box } from "trade-portal-components";
import {
	AboutCard,
	AnchorLinkCard,
	Contact,
	GlossaryOfTerms,
	HeadingCard,
	OnlineRegistrationSystemCard,
	QualityAssured,
	WhoNeedsToRegister
} from "templates/portal";

export const SttlInfo = () => {
	return (
		<Box alignItems="center" justifyContent="center" gap="4rem" margin="5rem 0 16rem 0" id="sttl-info">
			<Box
				columns={[4, 8]}
				background="fi_surface_white"
				padding={["4rem 2.4rem 4.8rem 2.4rem", "4rem 4rem 4.8rem 4rem"]}
				gap="4rem"
				borderRadius="0.8rem"
				alignItems="center"
			>
				<Box gap="4.8rem" columns={4} alignItems="center">
					<HeadingCard />
					<AnchorLinkCard />
					<AboutCard />
					<OnlineRegistrationSystemCard />
					<WhoNeedsToRegister />
					<QualityAssured />
					<GlossaryOfTerms />
				</Box>
			</Box>
			<Contact />
		</Box>
	);
};
