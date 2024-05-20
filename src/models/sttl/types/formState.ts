import { Category, PermissionStatus } from "models/global";

export type FormState = {
	propertyType: PropertyTypeStep[];
	statutoryObligations: StatutoryObligationsStep[];
	propertyAddress: PropertyAddressStep[];
	propertyOwner: PropertyOwnerDetailsStep[];
};

export type PropertyTypeStep = {
	category: Category;
	sharedProperty?: {
		propertyType?: string;
		customPropertyType?: string;
		numberOfSharedRooms?: number;
		numberOfPrivateRooms?: number;
		numberOfGuestsInSharedRooms?: number;
		numberOfGuestsInPrivateRooms?: number;
	};
	fullProperty?: {
		propertyType?: string;
		customPropertyType?: string;
		numberOfBedrooms?: number;
		numberOfGuests?: number;
	};
	multipleUnits?: Record<string, string | number>[];
};

type Address = {
	addressLine1: string;
	addressLine2?: string;
	addressLine3?: string;
	town: string;
	postcode: string;
	county: string;
};

export type PropertyAddressStep = {
	propertyAddress: Address;
};

export type PropertyOwnerDetailsStep = {
	firstName: string;
	lastName: string;
	emailAddress: string;
	businessName: string;
	telephone: string;
	countryOfResidence: string;
	isAddressSameAsStlProperty: boolean;
	ownerAddress?: Address;
};

export type StatutoryObligationsStep = {
	permissionStatus: PermissionStatus;
};

export type PropertyData = {
	propertyType: PropertyTypeStep;
	statutoryObligations: StatutoryObligationsStep;
	propertyAddress: PropertyAddressStep;
	propertyOwner: PropertyOwnerDetailsStep;
};
