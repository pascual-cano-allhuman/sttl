import { Box, Button, Copycat, Text, theme } from "trade-portal-components";
import { Property } from "models";
import { PROPERTY_STATUS, RegistrationStatus } from "../shared";

export const PropertyCard = ({ property }: { property: Property }) => {
	const { address, status = "Active", sttlNumber } = property;
	const { postcode, addressLine1 } = address || {};
	const id = property.id || "";
	const { borderColor } = PROPERTY_STATUS[status];

	return (
		<Box background="fi_surface_white" padding={["3.2rem 2.4rem", "3.2rem"]}>
			<Box
				borderLeft={`2px solid ${theme.color[borderColor]}`}
				paddingLeft={["2.4rem", "3.2rem"]}
				minHeight="15.4rem"
				justifyContent="space-between"
				gap="2.4rem"
				flexDirection={["column", "row"]}
			>
				<Box justifyContent="space-between" minHeight="15.4rem" alignItems="stretch" gap="2.4rem">
					<Box>
						<Text textStyle="text_large" color="fi_text_90">
							{addressLine1}
						</Text>
						<Text textStyle="text_large" color="fi_text_90">
							{postcode}
						</Text>
					</Box>
					<Copycat label="Property STTL number:">{sttlNumber}</Copycat>
				</Box>
				<Box justifyContent="space-between" height={["100%", "15.4rem"]} alignItems="stretch" gap="1.6rem">
					<Box alignItems={["start", "end"]} gap="0.4rem">
						<Text color="fi_text_60" textStyle="text_small" width="fit-content">
							Registration status:
						</Text>
						<RegistrationStatus status={status} />
					</Box>
					<Box justifyContent="flex-end" alignItems={["flex-start", "center"]} flexDirection={["column", "row"]}>
						{/* TODO: Will get Renew now button back */}
						{/* {valueReference !== cardStatus.Active && ( */}
						{/*	<Button variant="tertiary" size="large"> */}
						{/*		Renew now */}
						{/*	</Button> */}
						{/* )} */}
						<Button size="large" variant="primary" as="a" href={`/dashboard/property-details?id=${id}`}>
							View property details
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
