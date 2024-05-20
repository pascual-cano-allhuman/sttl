import { TickList, Box, Text } from "trade-portal-components";
import { usePropertyDetails, Property } from "models/global";

export const PropertyTickList = ({ property }: { property: Property }) => {
	const { items, units } = usePropertyDetails({ property });
	if (items) return <TickList items={items} size="small" />;
	if (units) return <ListOfUnits units={units} />;
};

const ListOfUnits = ({ units }: { units: Record<string, string[]> }) => {
	return (
		<Box gap="4rem">
			{Object.entries(units).map(([key, value], index) => (
				<Box key={index} gap="1rem">
					<Text textStyle="text_small" color="fi_text_60">
						{key}
					</Text>
					<TickList items={value} size="small" />
				</Box>
			))}
		</Box>
	);
};
