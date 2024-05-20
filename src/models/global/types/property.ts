import { Category } from "./categories";
import { PermissionStatus } from "./permissionStatus";

export type Property = {
	category: Category;
	propertyType?: string;
	customPropertyType?: string;
	address: Address;
	owner: {
		firstName: string;
		lastName: string;
		emailAddress: string;
		businessName: string;
		telephone: string;
		countryOfResidence: string;
		address?: Address;
	};
	details?: SharedPropertyDetails | FullPropertyDetails | MultipleUnitsDetails;
	permissionStatus?: PermissionStatus;
	id?: string; // TODO to Property summary
	status?: string;
	sttlNumber?: string;
};

export type Address = {
	addressLine1: string;
	addressLine2?: string;
	addressLine3?: string;
	town: string;
	postcode: string;
	county: string;
	country?: string;
};
export type SharedPropertyDetails = {
	numberOfSharedRooms?: number;
	numberOfPrivateRooms?: number;
	numberOfGuestsInSharedRooms?: number;
	numberOfGuestsInPrivateRooms?: number;
};

export type FullPropertyDetails = {
	numberOfBedrooms?: number;
	numberOfGuests?: number;
};

export type MultipleUnitsDetails = {
	units: Record<string, string | number>[];
};
