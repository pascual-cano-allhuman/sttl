import React from "react";
import { useFormContext } from "react-hook-form";
import { Category } from "models/sttl";
import { EntirePropertyFields } from "./EntirePropertyFields";
import { MultipleUnitsFields } from "./MultipleUnitsFields";
import { PrimaryResidenceFields } from "./PrimaryResidenceFields";

const propertyTypes = Object.values(Category) as Category[];

export const SelectedPropertyFields = () => {
	const { watch, unregister } = useFormContext();
	const category = watch(`category`) as Category;

	React.useEffect(() => {
		if (!category) return;
		// scrolling behavior to first element (dropdown) on mobile device
		if (window?.matchMedia("(max-width: 767px)")?.matches) {
			const name = `${category}.propertyType`;
			const dropdownElement = document.getElementById(name);
			const hasReducedMotion = !!window?.matchMedia("(prefers-reduced-motion: reduce)")?.matches;
			const behavior = hasReducedMotion ? "smooth" : "auto";
			dropdownElement?.scrollIntoView({ behavior, block: "center" });
		}
	}, [category]);

	React.useEffect(() => {
		if (category) {
			// unregister all other category types/category fields other than currently selected
			const propertiesToUnregister = propertyTypes.filter(p => p !== category);
			unregister(propertiesToUnregister);
		}
	}, [category, unregister]);

	if (category === Category.room) return <PrimaryResidenceFields category={category} />;
	if (category === Category.full_property) return <EntirePropertyFields category={category} />;
	if (category === Category.units) return <MultipleUnitsFields category={category} />;
	return null;
};
