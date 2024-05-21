import { Property, SharedPropertyDetails, FullPropertyDetails, MultipleUnitsDetails } from "../types";

export const usePropertyDetails = ({ property }: { property: Property }) => {
	switch (property.category) {
		case "sharedProperty": {
			const items = getItemsForSharedProperty(property.details as SharedPropertyDetails);
			return { items };
		}
		case "fullProperty": {
			const items = getItemsForFullProperty(property.details as FullPropertyDetails);
			return { items };
		}
		case "multipleUnits": {
			const units = getListItemsForUnits(property.details as MultipleUnitsDetails);
			return { units };
		}
		default:
			return {};
	}
};

export const getItemsForSharedProperty = (details: SharedPropertyDetails) => {
	const { propertyType, numberOfSharedRooms, numberOfPrivateRooms, numberOfGuestsInSharedRooms, numberOfGuestsInPrivateRooms } = details;
	const items = [];
	if (propertyType) items.push(propertyType);
	if (numberOfSharedRooms) items.push(`${numberOfSharedRooms} shared rooms`);
	if (numberOfPrivateRooms) items.push(`${numberOfPrivateRooms} private rooms`);
	if (numberOfGuestsInSharedRooms) items.push(`${numberOfGuestsInSharedRooms} guests in shared rooms`);
	if (numberOfGuestsInPrivateRooms) items.push(`${numberOfGuestsInPrivateRooms} guests in private rooms`);
	return items;
};

export const getItemsForFullProperty = (details: FullPropertyDetails) => {
	const { propertyType, numberOfBedrooms, numberOfGuests } = details;
	const items = [];
	if (propertyType) items.push(propertyType);
	if (numberOfBedrooms) items.push(`${numberOfBedrooms} bedrooms`);
	if (numberOfGuests) items.push(`${numberOfGuests} guests`);
	return items;
};

export const getListItemsForUnits = (details: MultipleUnitsDetails) => {
	const { units } = details;
	return units.reduce(
		(acc, unit, i) => {
			const propertyType = unit.customPropertyType || unit.propertyType;
			const numberOfGuests = unit.noOfGuests;
			const numberOfRoomsField = Object.keys(unit).find(field => !!unitTypeToRoomDescription[field]);
			const numberOfRooms = unit[numberOfRoomsField];
			const unitTypeDesc = unitTypeToRoomDescription[numberOfRoomsField];
			const items = [];
			if (propertyType) items.push(propertyType);
			if (numberOfGuests) items.push(`${numberOfGuests} guests`);
			if (numberOfRooms && unitTypeDesc) items.push(`${numberOfRooms} ${unitTypeDesc}`);
			acc[`Unit ${i + 1}`] = items;
			return acc;
		},
		{} as Record<string, string[]>
	);
};

const unitTypeToRoomDescription = {
	noOfOwnDoorUnits: "own door units",
	noOfRooms: "rooms",
	noOfBedrooms: "bedrooms",
	noOfPitches: "pitches",
	number: "units"
};
