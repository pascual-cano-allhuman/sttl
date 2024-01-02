"use client";

import React from "react";
import { Confirm } from "templates";
import { useFormContext } from "app/sttl/FormContext";

const Page = () => {
	const { sttlForm } = useFormContext();
	const { orderResult } = sttlForm;

	return <Confirm orderResult={orderResult} />;
};

export default Page;
