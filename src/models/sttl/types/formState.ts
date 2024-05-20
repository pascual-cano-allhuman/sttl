import { Category, PermissionStatus } from "models/global";

export type FormState = {
	property_type: PropertyTypeStep[];
	statutory_obligations: StatutoryObligationsStep[];
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
	fullProperty?: {
		propertyType?: string;
		customPropertyType?: string;
		numberOfBedrooms?: number;
		numberOfGuests?: number;
	};
	units?: Record<string, string | number>[];
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
	property_type: PropertyTypeStep;
	statutory_obligations: StatutoryObligationsStep;
	property_address: PropertyAddressStep;
	property_owner_details: PropertyOwnerDetailsStep;
};
