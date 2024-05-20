"use client";

import React from "react";
import { useSearchParams, notFound } from "next/navigation";
import { PropertyDetails } from "templates";
import { Property } from "models";
import { useDashboardContext } from "../DashboardContext";

const Page = () => {
	const [property, setProperty] = React.useState<Property>();
	const isSetup = React.useRef(false);
	const params = useSearchParams();
	const id = params.get("id");
	const { dashboard } = useDashboardContext();

	React.useEffect(() => {
		if (isSetup.current) return;
		isSetup.current = true;
		dashboard.getPropertyDetails(id).then(property => {
			setProperty(property);
		});
	}, [id]);

	if (property === undefined) return null;
	if (property === null) return notFound();
	return <PropertyDetails property={property} />;
};

export default Page;
