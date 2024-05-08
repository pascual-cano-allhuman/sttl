import { Box, Pagination, Button, Text } from "trade-portal-components";

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
	if (!(properties?.length > 0)) return null;
	return (
		<Box gap="3.2rem">
			<Box flexDirection={["column", "row"]} justifyContent="space-between" alignItems="center" gap="3.2rem">
				<Box minHeight="4.6rem" flexDirection="row" alignItems="center">
					<Text textStyle="heading_medium" width="fit-content" as="h1">
						Your STTL properties
					</Text>
				</Box>
				{!hasPendingApplication && (
					<Box columns={[12, 3]}>
						<Button trailingIcon="fi-plus" variant="secondary" size="medium" as="a" href="/sttl">
							Register a new property
						</Button>
					</Box>
				)}
			</Box>
			{hasPendingApplication && <PendingApplicationCard discardSaveAndResume={discardSaveAndResume} />}
			<Box gap="2.4rem">
				{pageItems.map(item => {
					return <PropertyCard key={item.id} property={item} />;
				})}
				<Pagination totalNumberOfPages={totalNumberOfPage} currentPage={pageNumber} onPageChange={goToPage} />
			</Box>
		</Box>
	);
};
