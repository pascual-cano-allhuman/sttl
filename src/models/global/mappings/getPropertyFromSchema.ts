import { PROPERTY_OPTIONS, TEXT_TO_UNIT_ROOM_TYPE } from "settings/propertyTypeOptions";
import { AccommodationSchema, Property, PersonSchema, TEXT_TO_PLANNING_PERMISSION, Category } from "../types";

export const getPropertyFromSchema = (accommodationSchema: AccommodationSchema, ownerSchema?: PersonSchema): Property => {
	if (!["Accommodation", "LodgingBusiness"].includes(accommodationSchema?.["@type"])) return null;
	const category = getPropertyCategory(accommodationSchema);
	const owner = getOwnerDetails(ownerSchema);
	const { propertyType, customPropertyType } = getPropertyType(accommodationSchema, category);
	const address = getPropertyAddress(accommodationSchema);
	const details = getPropertyDetails(accommodationSchema);
	const permissionStatus = getPlanningPermission(accommodationSchema);
	return {
		category,
		propertyType,
		customPropertyType,
		address,
		details,
		owner,
		permissionStatus
	};
};

export const getPropertyCategory = (accommodationSchema: AccommodationSchema) => {
	if (accommodationSchema["@type"] === "Accommodation" && accommodationSchema.containsPlace) return Category.room;
	if (accommodationSchema["@type"] === "Accommodation" && !accommodationSchema.containsPlace) return Category.fullProperty;
	if (accommodationSchema["@type"] === "LodgingBusiness" && accommodationSchema.containsPlace) return Category.units;
	return null;
};

const getPropertyType = (accommodationSchema: AccommodationSchema, category: Category) => {
	const { additionalType } = accommodationSchema;
	if (!additionalType) return { propertyType: null, customPropertyType: null };
	const hasKnownOption = PROPERTY_OPTIONS[category]?.some(({ value }) => value === additionalType);
	const propertyType = hasKnownOption ? additionalType : "Other - specify";
	const customPropertyType = hasKnownOption ? null : additionalType;
	return { propertyType, customPropertyType };
};

export const getPropertyDetails = (accommodationSchema: AccommodationSchema) => {
	const category = getPropertyCategory(accommodationSchema);
	if (category === Category.room) return getDetailsForSharedProperty(accommodationSchema);
	if (category === Category.fullProperty) return getDetailsForFullProperty(accommodationSchema);
	if (category === Category.units) return getDetailsForMultipleUnits(accommodationSchema);
	return null;
};

export const getDetailsForSharedProperty = (accommodationSchema: AccommodationSchema) => {
	return accommodationSchema.containsPlace.reduce((acc, curr) => {
		const numberOfRooms = +curr.numberOfRooms.value;
		const numberOfGuests = +curr.amenityFeature[0].value;
		if (curr.additionalType === "shared") {
			acc["numberOfSharedRooms"] = numberOfRooms;
			acc["numberOfGuestsInSharedRooms"] = numberOfGuests;
			return acc;
		}
		if (curr.additionalType === "private") {
			acc["numberOfPrivateRooms"] = numberOfRooms;
			acc["numberOfGuestsInPrivateRooms"] = numberOfGuests;
			return acc;
		}
		return acc;
	}, {});
};

export const getDetailsForFullProperty = (accommodationSchema: AccommodationSchema) => {
	const { numberOfBedrooms, amenityFeature } = accommodationSchema;
	return {
		numberOfBedrooms: +numberOfBedrooms,
		numberOfGuests: +amenityFeature[0].value
	};
};

export const getDetailsForMultipleUnits = (accommodationSchema: AccommodationSchema) => {
	const units = accommodationSchema.containsPlace.reduce((acc, curr) => {
		const unitText = curr.numberOfRooms?.unitText;
		const numberOfRooms = curr.numberOfRooms?.value ? +curr.numberOfRooms.value : 0;
		const numberOfGuests = curr.amenityFeature[0]?.value ? +curr.amenityFeature[0].value : 0;
		const { propertyType, customPropertyType } = getPropertyType(curr as AccommodationSchema, Category.units);
		const unit = { propertyType, customPropertyType, noOfGuests: numberOfGuests };
		if (unitText) {
			const prop = TEXT_TO_UNIT_ROOM_TYPE[unitText];
			unit[prop] = numberOfRooms;
		}
		acc.push(unit);
		return acc;
	}, []);
	return { units };
};

const getPropertyAddress = (accommodation: AccommodationSchema) => {
	const { addressLocality, addressRegion, postalCode, streetAddress } = accommodation.address;
	const propertyAddress = {
		addressLine1: streetAddress,
		addressLine2: "", // will never know
		addressLine3: "", // will never know
		town: addressLocality,
		postcode: postalCode,
		county: addressRegion?.replace(/^co. /i, "")
	};
	return propertyAddress;
};

const getOwnerDetails = (owner: PersonSchema) => {
	if (!owner) return null;
	const { givenName, familyName, email, telephone, address } = owner;
	const businessName = owner.worksFor?.name || "";
	return {
		countryOfResidence: address.addressCountry,
		firstName: givenName,
		lastName: familyName,
		emailAddress: email,
		telephone,
		businessName,
		ownerAddress: {
			addressLine1: address.streetAddress,
			addressLine2: "", // will never know
			addressLine3: "", // will never know
			town: address.addressLocality,
			postcode: address.postalCode,
			county: address.addressRegion?.replace(/^co. /i, "")
		}
	};
};

const getPlanningPermission = (accommodationSchema: AccommodationSchema) => {
	const { additionalProperty } = accommodationSchema;
	const value = additionalProperty?.find(ap => ap.name === "Planning Permission")?.value;
	return TEXT_TO_PLANNING_PERMISSION[value] ?? "";
};
