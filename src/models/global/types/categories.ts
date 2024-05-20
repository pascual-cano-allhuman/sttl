export const CATEGORY_AS_TEXT = {
	sharedProperty: "Shared property",
	fullProperty: "Full property",
	multipleUnits: "Multiple units"
} as const;

export const TEXT_TO_CATEGORY = Object.entries(CATEGORY_AS_TEXT).reduce((acc, [category, text]) => {
	acc[text] = category;
	return acc;
}, {});

export type Category = keyof typeof CATEGORY_AS_TEXT;
export type CategoryAsText = (typeof CATEGORY_AS_TEXT)[Category];
