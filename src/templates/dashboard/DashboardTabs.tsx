import React from "react";
import { Box, Tabs } from "trade-portal-components";
import { NeedHelp } from "templates/global";

type Props = {
	children: React.ReactNode;
	tabs: Record<string, string>[];
	currentTabIndex: number;
};

export const DashboardTabs = ({ children, tabs, currentTabIndex }: Props) => {
	return (
		<Box padding="0 1.6rem 8rem">
			<Box columns={12} alignItems="left" margin="0 auto">
				<Tabs tabs={tabs} defaultTabIndex={currentTabIndex} />
				<Box gap="3.2rem" minHeight={["0", "51rem"]} justifyContent="space-between">
					{children}
					<NeedHelp />
				</Box>
			</Box>
		</Box>
	);
};
