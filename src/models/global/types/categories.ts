export enum Category {
	room = "room",
	fullProperty = "fullProperty",
	units = "units"
}

export enum CategoryAsText {
	room = "Shared property",
	fullProperty = "Entire property",
	units = "Multiple units"
}

export const CATEGORY_AS_TEXT = {
	room: CategoryAsText.room,
	fullProperty: CategoryAsText.fullProperty,
	units: CategoryAsText.units
};

export const TEXT_TO_CATEGORY = Object.entries(CATEGORY_AS_TEXT).reduce((acc, [category, text]) => {
	acc[text] = category;
	return acc;
}, {});
