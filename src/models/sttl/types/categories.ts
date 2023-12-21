export enum Category {
	room = "room",
	full_property = "full_property",
	units = "units"
}

export enum CategoryAsText {
	room = "Shared property",
	full_property = "Entire property",
	units = "Multiple units"
}

export const CATEGORY_AS_TEXT = {
	room: CategoryAsText.room,
	full_property: CategoryAsText.full_property,
	units: CategoryAsText.units
};

export const TEXT_TO_CATEGORY = Object.entries(CATEGORY_AS_TEXT).reduce((acc, [category, text]) => {
	acc[text] = category;
	return acc;
}, {});
