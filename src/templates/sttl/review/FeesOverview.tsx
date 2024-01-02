import React from "react";
import { Box, Text, TableRows, Loader } from "trade-portal-components";

type FeeOverviewProps = {
	subtotals: Record<string, number>;
	total: number;
};

export const FeesOverview = ({ subtotals, total }: FeeOverviewProps) => {
	const rows = React.useMemo(() => {
		const list = Object.entries(subtotals || {}).map(([key, value]) => ({
			label: FEES_LABELS[key],
			value: formatCurrency(value || 0),
			weight: "normal"
		}));
		list.push({ label: "Total", value: formatCurrency(total), weight: "bold" });
		return list;
	}, [subtotals, total]);
	return (
		<Box padding="4rem 2.4rem" background="fi_surface_grey" borderRadius="4px" gap="1.6rem">
			<Box alignItems="center">
				<Text as="h2" textAlign="center" fontWeight={700} color="fi_action_primary_100" fontSize="18px">
					Fees due
				</Text>
			</Box>
			{total !== undefined && <TableRows rows={rows} />}
			{total === undefined && (
				<Box width="100%" alignItems="center">
					<Loader width={40} color="fi_accent_warning_100" />
				</Box>
			)}
		</Box>
	);
};

const FEES_LABELS = {
	rooms: "Bedroom(s) in your home",
	fullProperty: "Entire property",
	units: "Multiple units at a site"
};

const formatCurrency = (price: number): string =>
	new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(price);
