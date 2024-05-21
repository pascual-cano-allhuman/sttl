import { Box, ContentPlaybackCard, Copycat, Text, TextLink, theme } from "trade-portal-components";
import { Property, PERMISSION_STATUS_DISPLAY_TEXT } from "models";
import { NeedHelp } from "templates/global";
import { PROPERTY_STATUS, RegistrationStatus } from "../shared";
import { PropertyTickList } from "./PropertyTickList";
import { AddressDisplay } from "./AddressDisplay";

export const PropertyDetails = ({ property }: { property: Property }) => {
	if (!property) return null;
	const { sttlNumber, status, owner, address, permissionStatus } = property;
	const { borderColor } = PROPERTY_STATUS[status || "Active"];

	return (
		<Box gap="3.2rem" margin="2.7rem auto 0" columns={12} padding="1.6rem">
			<TextLink variant="icon_link" size="large" leadingIcon="fi-arrow-left" href="/dashboard/my-properties">
				Back to my properties
			</TextLink>
			<Text textStyle="heading_medium" as="h1">
				Property details
			</Text>
			<Box gap="2.4rem">
				<Box background="fi_surface_white" padding={["3.2rem 2.4rem", "3.2rem"]}>
					<Box
						paddingLeft={["2.4rem", "3.2rem"]}
						flexDirection={["column", "row"]}
						justifyContent="space-between"
						alignItems="stretch"
						gap="4rem"
						borderLeft={`2px solid ${theme.color[borderColor]}`}
					>
						<Box gap="4rem">
							<Box gap="2.4rem">
								{sttlNumber && <Copycat label="Property STTL number:">{sttlNumber}</Copycat>}
								<ContentPlaybackCard>
									<AddressDisplay address={address} />
								</ContentPlaybackCard>
							</Box>
							<ContentPlaybackCard subHeading="Property details">
								<PropertyTickList property={property} />
							</ContentPlaybackCard>
							{permissionStatus && (
								<ContentPlaybackCard subHeading="Statutory obligations">
									<Text color="fi_text_100">{PERMISSION_STATUS_DISPLAY_TEXT[permissionStatus]}</Text>
								</ContentPlaybackCard>
							)}
							{owner?.firstName && (
								<ContentPlaybackCard subHeading="Property owner details">
									<Box gap="0.8rem">
										<Text textStyle="text_large">
											{owner?.firstName} {owner?.lastName}
										</Text>
										<Text textStyle="text_large">{owner?.businessName}</Text>
										<Text textStyle="text_large">{owner?.telephone}</Text>
										<Text textStyle="text_large">{owner?.emailAddress}</Text>
										<AddressDisplay address={owner.address} />
									</Box>
								</ContentPlaybackCard>
							)}
						</Box>
						<Box justifyContent="flex-start" alignItems={["start", "end"]} gap="3rem" maxWidth="20rem">
							<Box gap="0.4rem" alignItems={["start", "end"]}>
								<Text as="span" width="fit-content" textStyle="text_small">
									Registration status:
								</Text>
								<Box flexDirection="row" alignItems="center" justifyContent={["flex-start", "flex-end"]} gap="0.8rem">
									<RegistrationStatus status={status || "Active"} />
								</Box>
							</Box>
							{/* TODO: Will get button renew now back */}
							{/* {valueReference !== cardStatus.Active && <Button>Renew now</Button>} */}
						</Box>
					</Box>
				</Box>
				{/* {property.invoiceNumber && <Invoice {...property} />} */}
			</Box>
			<NeedHelp />
		</Box>
	);
};
