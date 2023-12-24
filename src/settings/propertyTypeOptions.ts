const ROOM_OPTIONS = [
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

const OPTIONAL_INPUTS = {
	noOfRooms: "noOfRooms",
	noOfOwnDoorUnits: "noOfOwnDoorUnits",
	noOfBedrooms: "noOfBedrooms",
	noOfPitches: "noOfPitches",
	number: "number"
};

const UNITS_OPTIONS = [
	{
		label: "Activity or adventure centre",
		value: "Activity or adventure centre",
		inputName: OPTIONAL_INPUTS.noOfRooms,
		inputLabel: "Number of rooms"
	},
	{
		label: "Apartments - student accommodation",
		value: "Apartments - student accommodation",
		inputName: OPTIONAL_INPUTS.noOfOwnDoorUnits,
		inputLabel: "Number of own door units"
	},
	{ label: "Apartments - other", value: "Apartments - other", inputName: OPTIONAL_INPUTS.noOfOwnDoorUnits, inputLabel: "Number of own door units" },
	{ label: "Hostel style", value: "Hostel" },
	{
		label: "Multiple houses on a site",
		value: "Multiple houses on a site",
		inputName: OPTIONAL_INPUTS.noOfOwnDoorUnits,
		inputLabel: "Number of own door units"
	},
	{
		label: "Site - for motor home / tent / yurt etc.",
		value: "Site - for motor home / tent / yurt etc.",
		inputName: OPTIONAL_INPUTS.noOfPitches,
		inputLabel: "Number of pitches"
	},
	{
		label: "Serviced accommodation",
		value: "Serviced accommodation",
		inputName: OPTIONAL_INPUTS.noOfOwnDoorUnits,
		inputLabel: "Number of own door units"
	},
	{ label: "Other - specify", value: "Other - specify", inputName: OPTIONAL_INPUTS.number, inputLabel: "Number" }
];

export const PROPERTY_OPTIONS = {
	room: ROOM_OPTIONS,
	fullProperty: FULL_PROPERTY_OPTIONS,
	units: UNITS_OPTIONS
};

export const PROPERTY_TYPES_NOT_REQUIRING_BEDROOMS = ["Recreational vehicle / Motor home", "Treehouse", "Yurt"];

// TODO
export const UNIT_ROOM_TYPE_AS_TEXT = {
	noOfOwnDoorUnits: "Own Door Unit",
	noOfRooms: "Room",
	noOfBedrooms: "Bedroom",
	noOfPitches: "Pitch",
	number: "Number"
};

export const TEXT_TO_UNIT_ROOM_TYPE = Object.entries(UNIT_ROOM_TYPE_AS_TEXT).reduce((acc, [key, value]) => {
	acc[value] = key;
	return acc;
}, {});
