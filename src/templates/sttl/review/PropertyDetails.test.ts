import { getListItemsForUnits, getListItemsForRoom, getListItemsForFullProperty } from "./PropertyDetails";

describe("getListItemsForRoom", () => {
	it("should return a list of tick list items for a room", () => {
		const data = {
			propertyType: "Other - specify",
			customPropertyType: "Room Special",
			numberOfSharedRooms: 1,
			numberOfGuestsInSharedRooms: 1,
			numberOfPrivateRooms: 1,
			numberOfGuestsInPrivateRooms: 1
		};
		const actual = getListItemsForRoom(data);
		const expected = ["Room Special", "1 shared rooms", "1 private rooms", "1 guests in shared rooms", "1 guests in private rooms"];
		expect(actual).toEqual(expected);
	});
});

describe("getListItemsForRoom", () => {
	it("should return a list of tick list items for a full property", () => {
		const data = {
			propertyType: "Apartment / Flat",
			numberOfBedrooms: 1,
			numberOfGuests: 1
		};
		const actual = getListItemsForFullProperty(data);
		const expected = ["Apartment / Flat", "1 bedrooms", "1 guests"];
		expect(actual).toEqual(expected);
	});
});

describe("getListItemsForUnits", () => {
	it("should return a list of tick list items for a list of units", () => {
		const units = [
			{ propertyType: "Activity or adventure centre", noOfGuests: 2, noOfRooms: 1 },
			{ propertyType: "Hostel", noOfGuests: 2 },
			{ propertyType: "Apartments - student accommodation", noOfGuests: 2, noOfOwnDoorUnits: 1 },
			{ propertyType: "Other - specify", customPropertyType: "Multiple Other Special", noOfGuests: 2, number: 1 }
		];
		const expected = [
			["Activity or adventure centre", "2 guests", "1 rooms"],
			["Hostel", "2 guests"],
			["Apartments - student accommodation", "2 guests", "1 own door units"],
			["Multiple Other Special", "2 guests", "1 units"]
		];
		const actual = getListItemsForUnits(units);

		expect(actual).toEqual(expected);
	});
});
