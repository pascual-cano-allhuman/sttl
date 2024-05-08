"use client";

import { PaymentHistory } from "templates";
import { useDashboardContext } from "../DashboardContext";

const Page = () => {
	const { dashboard } = useDashboardContext();
	const { payments } = dashboard || {};
	return <PaymentHistory payments={payments} />;
};

export default Page;
