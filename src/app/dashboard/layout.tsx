"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Dashboard } from "templates";
import { DashboardContext } from "./DashboardContext";

export const TABS = [
	{ name: "My Properties", url: "/dashboard" },
	{ name: "Payment History", url: "/dashboard/payment-history" }
];

const Layout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const currentTabIndex = TABS.findIndex(tab => tab.url === pathname) || 0;
	return (
		<DashboardContext>
			<Dashboard tabs={TABS} currentTabIndex={currentTabIndex}>
				{children}
			</Dashboard>
		</DashboardContext>
	);
};

export default Layout;
