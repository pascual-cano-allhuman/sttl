"use client";

import { MyProperties } from "templates";
import { useDashboardContext } from "../../DashboardContext";

const Page = () => {
	const { dashboard } = useDashboardContext();
	const { properties, hasPendingApplication, discardSaveAndResume } = dashboard || {};
	return (
		<MyProperties
			properties={properties}
			totalNumberOfPage={1}
			hasPendingApplication={hasPendingApplication}
			discardSaveAndResume={discardSaveAndResume}
		/>
	);
};

export default Page;
