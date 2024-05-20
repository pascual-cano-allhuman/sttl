import React from "react";
import { OrderSchema } from "models/global";

type Parameters = {
	order: OrderSchema;
	loadSaveAndResumeData: () => Promise<OrderSchema>;
	updateSaveAndResume: (order: OrderSchema) => void;
	clearSaveAndResumeData: () => Promise<void>;
};

export const useSaveAndResume = (params: Parameters) => {
	const { order, loadSaveAndResumeData, updateSaveAndResume, clearSaveAndResumeData } = params;
	const [pendingApplication, setPendingApplication] = React.useState<OrderSchema>();

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
