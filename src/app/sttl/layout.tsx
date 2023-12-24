"use client";

import React from "react";
import { LoaderWithContent } from "templates";
import { FormContextProvider, useFormContext } from "./FormContext";

const Loading = ({ children }: { children: React.ReactNode }) => {
	const { loadingMessage } = useFormContext();
	if (loadingMessage) return <LoaderWithContent>{loadingMessage}</LoaderWithContent>;
	return children as React.ReactElement;
};

const ApplicationsLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<FormContextProvider>
			<Loading>{children}</Loading>
		</FormContextProvider>
	);
};

export default ApplicationsLayout;
