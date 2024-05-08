"use client";

import React from "react";
import { LoaderWithContent } from "templates";
import { FormContextProvider, useFormContext } from "./FormContext";

const Loading = ({ children }: { children: React.ReactNode }) => {
	const { sttlOrder } = useFormContext();
	if (sttlOrder.isSubmittingData) return <LoaderWithContent>Please wait while we are processing your data.</LoaderWithContent>;
	return children;
};

const ApplicationsLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<FormContextProvider>
			<Loading>{children}</Loading>
		</FormContextProvider>
	);
};

export default ApplicationsLayout;
