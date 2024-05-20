"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { DashboardTabs } from "templates";

export const TABS = [
	{ name: "My Properties", url: "/dashboard/my-properties" },
	{ name: "Payment History", url: "/dashboard/payment-history" }
];

const Layout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const currentTabIndex = TABS.findIndex(tab => tab.url === pathname) || 0;
	return (
		<DashboardTabs tabs={TABS} currentTabIndex={currentTabIndex}>
			{children}
		</DashboardTabs>
	);
};

export default Layout;
