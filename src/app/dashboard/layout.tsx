"use client";

import { DashboardContext } from "./DashboardContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return <DashboardContext>{children}</DashboardContext>;
};

export default Layout;
