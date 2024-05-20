"use client";

import { PaymentHistory } from "templates";
import { useDashboardContext } from "../../DashboardContext";

const Page = () => {
	const { dashboard, openInvoice } = useDashboardContext();
	const { payments } = dashboard || {};
	return <PaymentHistory payments={payments} openInvoice={openInvoice} />;
};

export default Page;
