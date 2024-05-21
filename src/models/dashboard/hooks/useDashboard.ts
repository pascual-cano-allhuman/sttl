import React from "react";
import { Property, getPropertyFromSchema } from "models/global";
import { Payment } from "models/dashboard/types";
import { getPaymentFromSchema, getPropertyCardFromSchema } from "models/dashboard/mappings";

type Parameters = {
	isLoggedIn: boolean;
	loadSaveAndResumeData: () => Promise<any>;
	clearSaveAndResumeData: () => Promise<void>;
	loadDashboardProperties: () => Promise<any>;
	loadDashboardPayments: () => Promise<any>;
	loadPropertyDetails: (propertyId: string) => Promise<any>;
};

export const useDashboard = (params: Parameters) => {
	// params
	const { isLoggedIn, loadSaveAndResumeData, clearSaveAndResumeData, loadDashboardPayments, loadDashboardProperties, loadPropertyDetails } = params;
	// states
	const isSetup = React.useRef(false);
	const [hasPendingApplication, setHasPendingRegistration] = React.useState(false);
	const [properties, setProperties] = React.useState<Property[]>();
	const [payments, setPayments] = React.useState<Payment[]>();

	// retrieve data
	React.useEffect(() => {
		if (!isLoggedIn || isSetup.current) return;
		isSetup.current = true;
		loadSaveAndResumeData().then((data: any) => {
			setHasPendingRegistration(!!data);
		});
		loadDashboardProperties().then((data: any) => {
			const properties = data?.value?.reverse().map(getPropertyCardFromSchema) || [];
			setProperties(properties);
		});
		loadDashboardPayments().then((data: any) => {
			const payments = data?.value?.reverse().map(getPaymentFromSchema) || [];
			setPayments(payments);
		});
	}, [isLoggedIn]);

	// load property details
	const getPropertyDetails = async (propertyId: string) => {
		const data = await loadPropertyDetails(propertyId);
		const property = getPropertyFromSchema(data);
		if (!property) return null;
		const { sttlNumber, status } = getPropertyCardFromSchema(data);
		return { ...property, sttlNumber, status };
	};

	// save and resume
	const discardSaveAndResume = () => {
		setHasPendingRegistration(false);
		clearSaveAndResumeData();
	};

	return {
		hasPendingApplication,
		properties,
		payments,
		getPropertyDetails,
		discardSaveAndResume
	};
};

export type DashboardHook = ReturnType<typeof useDashboard>;
