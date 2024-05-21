import { PERMISSION_STATUS_DISPLAY_TEXT, Property } from "models";
import { Box, Text, ContentPlaybackCard } from "trade-portal-components";

import { PropertyTickList } from "./PropertyTickList";
import { AddressDisplay } from "../shared/AddressDisplay";

type Props = {
	property: Property;
	onEditClick: (step: string) => void;
};

export const PropertyListItem = ({ property, onEditClick }: Props) => {
	const { address, owner, permissionStatus } = property;
	return (
		<Box gap="4rem">
			<ContentPlaybackCard onEditClick={() => onEditClick("propertyAddress")}>
				<AddressDisplay address={address} />
			</ContentPlaybackCard>
			<ContentPlaybackCard onEditClick={() => onEditClick("propertyType")} subHeading="Property details">
				<PropertyTickList property={property} />
			</ContentPlaybackCard>
			<ContentPlaybackCard onEditClick={() => onEditClick("statutoryObligations")} subHeading="Statutory obligations">
				<Text color="fi_text_100">{PERMISSION_STATUS_DISPLAY_TEXT[permissionStatus]}</Text>
			</ContentPlaybackCard>
			<ContentPlaybackCard onEditClick={() => onEditClick("propertyOwner")} subHeading="Property owner details">
				<Box gap="1.6rem">
					<Box gap="0.8rem" wordBreak="break-all">
						<Box gap="0.5rem" flexDirection="row" flexWrap="wrap">
							<Text color="#000">{owner.firstName}</Text>
							<Text color="#000">{owner.lastName}</Text>
						</Box>
						{owner.businessName && <Text color="#000">{owner.businessName}</Text>}
						<Text color="#000">{owner.telephone}</Text>
						<Text color="#000">{owner.emailAddress}</Text>
					</Box>
					<AddressDisplay address={owner.address} country={owner.countryOfResidence} />
				</Box>
			</ContentPlaybackCard>
		</Box>
	);
};
