const SHARED_PROPERTY_OPTIONS = [
	{ label: "Apartment / Flat", value: "Apartment / Flat" },
	{ label: "B&B", value: "B&B" },
	{ label: "House", value: "House" },
	{ label: "Other - specify", value: "Other - specify" }
];

const FULL_PROPERTY_OPTIONS = [
	{ label: "Apartment / Flat", value: "Apartment / Flat" },
	{ label: "Barn", value: "Barn" },
	{ label: "Boat", value: "Boat" },
	{ label: "Cabin", value: "Cabin" },
	{ label: "Castle", value: "Castle" },
	{ label: "Chalet", value: "Chalet" },
	{ label: "Cruisers", value: "Cruisers" },
	{ label: "House", value: "House" },
	{ label: "Lighthouse", value: "Lighthouse" },
	{ label: "Lodge", value: "Lodge" },
	{ label: "Recreational vehicle / Motor home", value: "Recreational vehicle / Motor home" },
	{ label: "Shepherds hut", value: "Shepherds hut" },
	{ label: "Treehouse", value: "Treehouse" },
	{ label: "Yurt", value: "Yurt" },
	{ label: "Other - specify", value: "Other - specify" }
];

const MULTIPLE_UNITS_OPTIONS = [
	{
		label: "Activity or adventure centre",
		value: "Activity or adventure centre",
		inputLabel: "Number of rooms"
	},
	{
		label: "Apartments - student accommodation",
		value: "Apartments - student accommodation",
		inputLabel: "Number of own door units"
	},
	{ label: "Apartments - other", value: "Apartments - other", inputLabel: "Number of own door units" },
	{ label: "Hostel style", value: "Hostel" },
	{
		label: "Multiple houses on a site",
		value: "Multiple houses on a site",
		inputLabel: "Number of own door units"
	},
	{
		label: "Site - for motor home / tent / yurt etc.",
		value: "Site - for motor home / tent / yurt etc.",
		inputLabel: "Number of pitches"
	},
	{
		label: "Serviced accommodation",
		value: "Serviced accommodation",
		inputLabel: "Number of own door units"
	},
	{ label: "Other - specify", value: "Other - specify", inputLabel: "Number" }
];

export const PROPERTY_OPTIONS = {
	sharedProperty: SHARED_PROPERTY_OPTIONS,
	fullProperty: FULL_PROPERTY_OPTIONS,
	multipleUnits: MULTIPLE_UNITS_OPTIONS
};

export const PROPERTY_TYPES_NOT_REQUIRING_BEDROOMS = ["Recreational vehicle / Motor home", "Treehouse", "Yurt"];
