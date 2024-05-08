import { Box, Pagination, Button, Text, theme } from "trade-portal-components";
import { usePagination, Property } from "models/dashboard";
import { PropertyCard } from "./PropertyCard";
import { PendingApplicationCard } from "./PendingApplicationCard";

type Props = {
	properties: Property[];
	totalNumberOfPage: number;
	hasPendingApplication?: boolean;
	discardSaveAndResume?: () => void;
};

export const MyProperties = (props: Props) => {
	const { properties, totalNumberOfPage, hasPendingApplication, discardSaveAndResume } = props;
	const { pageItems, pageNumber, goToPage } = usePagination(properties);

	return (
		<Box gap="3.2rem">
			<Box flexDirection={["column", "row"]} justifyContent="space-between" alignItems="center" gap="3.2rem">
				<Box minHeight="4.6rem" flexDirection="row" alignItems="center">
					<Text textStyle="heading_medium" width="fit-content" as="h1">
						Your STTL properties
					</Text>
				</Box>
				{!hasPendingApplication && pageItems.length > 0 && (
					<Box columns={[12, 3]}>
						<Button trailingIcon="fi-plus" variant="secondary" size="medium" as="a" href="/sttl">
							Register a new property
						</Button>
					</Box>
				)}
			</Box>
			{hasPendingApplication && <PendingApplicationCard discardSaveAndResume={discardSaveAndResume} />}
			{properties.length > 0 && (
				<Box gap="2.4rem">
					{pageItems.map(item => {
						return <PropertyCard key={item.id} property={item} />;
					})}
					<Pagination totalNumberOfPages={totalNumberOfPage} currentPage={pageNumber} onPageChange={goToPage} />
				</Box>
			)}
			{!hasPendingApplication && properties.length === 0 && <EmptyCard />}
		</Box>
	);
};

const EmptyCard = () => (
	<Box padding={["3.2rem 2.4rem", "3.2rem"]} background="fi_surface_white">
		<Box
			paddingLeft={["2.4rem", "3.2rem"]}
			flexDirection={["column", "row"]}
			justifyContent="space-between"
			alignItems={["start", "center"]}
			gap="3.2rem"
			borderLeft={`2px solid ${theme.color.fi_secondary_sea_100}`}
		>
			<Text>You have no properties registered, register one now</Text>
			<Button size="large" as="a" href="/sttl">
				Register a property now
			</Button>
		</Box>
	</Box>
);
