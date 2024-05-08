import React from "react";
import { Order } from "../types";

type Parameters = {
	order: Order;
	loadSaveAndResumeData: () => Promise<Order>;
	updateSaveAndResume: (order: Order) => void;
	clearSaveAndResumeData: () => Promise<void>;
};

export const useSaveAndResume = (params: Parameters) => {
	const { order, loadSaveAndResumeData, updateSaveAndResume, clearSaveAndResumeData } = params;
	const [pendingApplication, setPendingApplication] = React.useState<Order>();

	// discard the currently saved application
	const discardSaveAndResume = () => {
		clearSaveAndResumeData();
		setPendingApplication(null);
	};

	// load the saved application on mount
	React.useEffect(() => {
		loadSaveAndResumeData().then(order => {
			setPendingApplication(order || null);
		});
	}, []);

	// update the saved application when the order changes
	React.useEffect(() => {
		if (!order) return;
		updateSaveAndResume(order);
		setPendingApplication(order);
	}, [order]);

	return {
		discardSaveAndResume,
		pendingApplication
	};
};
