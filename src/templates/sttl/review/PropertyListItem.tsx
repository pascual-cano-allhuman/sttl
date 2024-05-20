import { PERMISSION_STATUS_DISPLAY_TEXT, PropertyData } from "models";
import { Box, Text, ContentPlaybackCard } from "trade-portal-components";
import { PropertyTickList } from "./PropertyDetails";
import { AddressDisplay } from "../shared/AddressDisplay";

type Props = {
	property: PropertyData;
	onEditClick: (step: string) => void;
};

export const PropertyListItem = ({ property, onEditClick }: Props) => {
	const {
		propertyType,
		propertyOwner: { firstName, lastName, businessName, telephone, emailAddress, countryOfResidence, ownerAddress },
		statutoryObligations: { permissionStatus },
		propertyAddress: { propertyAddress }
	} = property;
	const ownerAddressToShow = ownerAddress || propertyAddress;

	return (
		<Box gap="4rem">
			<ContentPlaybackCard onEditClick={() => onEditClick("propertyAddress")}>
				<AddressDisplay address={propertyAddress} />
			</ContentPlaybackCard>
			<ContentPlaybackCard onEditClick={() => onEditClick("propertyType")} subHeading="Property details">
				<PropertyTickList data={propertyType} />
			</ContentPlaybackCard>
			<ContentPlaybackCard onEditClick={() => onEditClick("statutoryObligations")} subHeading="Statutory obligations">
				<Text color="fi_text_100">{PERMISSION_STATUS_DISPLAY_TEXT[permissionStatus]}</Text>
			</ContentPlaybackCard>
			<ContentPlaybackCard onEditClick={() => onEditClick("propertyOwner")} subHeading="Property owner details">
				<Box gap="1.6rem">
					<Box gap="0.8rem" wordBreak="break-all">
						<Box gap="0.5rem" flexDirection="row" flexWrap="wrap">
							<Text color="#000">{firstName}</Text>
							<Text color="#000">{lastName}</Text>
						</Box>
						{businessName && <Text color="#000">{businessName}</Text>}
						<Text color="#000">{telephone}</Text>
						<Text color="#000">{emailAddress}</Text>
					</Box>
					<AddressDisplay address={ownerAddressToShow} country={countryOfResidence} />
				</Box>
			</ContentPlaybackCard>
		</Box>
	);
};
