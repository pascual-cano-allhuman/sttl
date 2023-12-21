import { Category } from "./categories";
import { PermissionStatus } from "./permissionStatus";

export type FormState = {
	property_type: PropertyTypeStep[];
	planning_permission: PlanningPermissionStep[];
	property_address: PropertyAddressStep[];
	property_owner_details: PropertyOwnerDetailsStep[];
};

export type PropertyTypeStep = {
	category: Category;
	room?: {
		propertyType?: string;
		customPropertyType?: string;
		numberOfSharedRooms?: number;
		numberOfPrivateRooms?: number;
		numberOfGuestsInSharedRooms?: number;
		numberOfGuestsInPrivateRooms?: number;
	};
	full_property?: {
		propertyType?: string;
		customPropertyType?: string;
		numberOfBedrooms?: number;
		numberOfGuests?: number;
	};
	units?: Record<string, string | number>[];
};

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

export type PropertyAddressStep = {
	propertyAddress: {
		addressLine1: string;
		addressLine2?: string;
		addressLine3?: string;
		townCity: string;
		eircode: string;
		county: string;
	};
};

export type PropertyOwnerDetailsStep = {
	countryOfResidence: string;
	firstName: string;
	lastName: string;
	emailAddress: string;
	businessName: string;
	telephone: string;
	isAddressSameAsStlProperty: boolean;
	ownerAddress?: {
		addressLine1: string;
		addressLine2?: string;
		addressLine3?: string;
		townCity: string;
		postcode: string;
		county: string;
	};
};

export type PlanningPermissionStep = {
	permissionStatus: PermissionStatus;
};

export enum FormAlert {
	payment_error,
	property_added,
	property_updated
}
