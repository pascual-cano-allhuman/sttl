import React from "react";
import { Payment, Property } from "models/dashboard/types";
import { getPaymentFromSchema } from "models/dashboard/mappings";

type Parameters = {
	isLoggedIn: boolean;
	loadSaveAndResumeData: () => Promise<any>;
	clearSaveAndResumeData: () => Promise<void>;
	loadDashboardPayments: () => Promise<any>;
};

export const useDashboard = (params: Parameters) => {
	// params
	const { isLoggedIn, loadSaveAndResumeData, clearSaveAndResumeData, loadDashboardPayments } = params;
	// states
	const isSetup = React.useRef(false);
	const [hasPendingApplication, setHasPendingRegistration] = React.useState(false);
	const [properties, setProperties] = React.useState<Property[]>(PROPERTIES); // eslint-disable-line
	const [payments, setPayments] = React.useState<Payment[]>();

	// retrieve data
	React.useEffect(() => {
		if (!isLoggedIn || isSetup.current) return;
		isSetup.current = true;
		loadSaveAndResumeData().then((data: any) => {
			setHasPendingRegistration(!!data);
		});
		loadDashboardPayments().then((data: any) => {
			if (!data?.value?.length) return [];
			const payments = data.value.reverse().map(getPaymentFromSchema);
			setPayments(payments);
		});
	}, [isLoggedIn]);

	// save and resume
	const discardSaveAndResume = () => {
		setHasPendingRegistration(false);
		clearSaveAndResumeData();
	};

	return {
		hasPendingApplication,
		properties,
		payments,
		discardSaveAndResume
	};
};

export type DashboardHook = ReturnType<typeof useDashboard>;

const PROPERTIES = [
	{
		address: { postalCode: "D00 001", streetAddress: "10 Westland Square, Pearse Street, Dublin 2" },
		id: "1",
		sttlNumber: "STTL-123456"
	}
] as Property[];
