"use client";

import React from "react";
import { Confirm } from "templates";
import { useFormContext } from "app/sttl/FormContext";

const Page = () => {
	const { sttlOrder } = useFormContext();
	const { orderResult } = sttlOrder;
	return <Confirm orderResult={orderResult} />;
};

export default Page;
