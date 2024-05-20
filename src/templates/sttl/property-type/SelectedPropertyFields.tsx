import React from "react";
import { Category } from "models";
import { useFormContext } from "react-hook-form";
import { FullPropertyFields } from "./FullPropertyFields";
import { MultipleUnitsFields } from "./MultipleUnitsFields";
import { SharedPropertyFields } from "./SharedPropertyFields";

const CATEGORIES = ["sharedProperty", "fullProperty", "multipleUnits"] as Category[];

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
			const propertiesToUnregister = CATEGORIES.filter(p => p !== category);
			unregister(propertiesToUnregister);
		}
	}, [category, unregister]);

	if (category === "sharedProperty") return <SharedPropertyFields />;
	if (category === "fullProperty") return <FullPropertyFields />;
	if (category === "multipleUnits") return <MultipleUnitsFields />;
	return null;
};
