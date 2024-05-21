import { AccommodationSchema, Property, PersonSchema, TEXT_TO_PLANNING_PERMISSION } from "../types";

export const getPropertyFromSchema = (accommodationSchema: AccommodationSchema, ownerSchema?: PersonSchema): Property => {
	if (!["Accommodation", "LodgingBusiness"].includes(accommodationSchema?.["@type"])) return null;
	const category = getPropertyCategory(accommodationSchema);
	const owner = getOwnerDetails(ownerSchema);
	const address = getPropertyAddress(accommodationSchema);
	const details = getPropertyDetails(accommodationSchema);
	const permissionStatus = getPlanningPermission(accommodationSchema);
	return {
		category,
		address,
		details,
		owner,
		permissionStatus
	};
};

export const getPropertyCategory = (accommodationSchema: AccommodationSchema) => {
	if (accommodationSchema["@type"] === "Accommodation" && accommodationSchema.containsPlace) return "sharedProperty";
	if (accommodationSchema["@type"] === "Accommodation" && !accommodationSchema.containsPlace) return "fullProperty";
	if (accommodationSchema["@type"] === "LodgingBusiness" && accommodationSchema.containsPlace) return "multipleUnits";
	return null;
};

export const getPropertyDetails = (accommodationSchema: AccommodationSchema) => {
	const category = getPropertyCategory(accommodationSchema);
	if (category === "sharedProperty") return getDetailsForSharedProperty(accommodationSchema);
	if (category === "fullProperty") return getDetailsForFullProperty(accommodationSchema);
	if (category === "multipleUnits") return getDetailsForMultipleUnits(accommodationSchema);
	return null;
};

export const getDetailsForSharedProperty = (accommodationSchema: AccommodationSchema) => {
	const propertyType = accommodationSchema.additionalType;
	const roomsDetails = accommodationSchema.containsPlace.reduce((acc, curr) => {
		if (curr.additionalType === "shared") {
			acc["numberOfSharedRooms"] = +curr.numberOfRooms.value;
			acc["numberOfGuestsInSharedRooms"] = +curr.amenityFeature[0].value;
			return acc;
		}
		if (curr.additionalType === "private") {
			acc["numberOfPrivateRooms"] = +curr.numberOfRooms.value;
			acc["numberOfGuestsInPrivateRooms"] = +curr.amenityFeature[0].value;
			return acc;
		}
		return acc;
	}, {});
	return { propertyType, ...roomsDetails };
};

export const getDetailsForFullProperty = (accommodationSchema: AccommodationSchema) => {
	const { additionalType, numberOfBedrooms, amenityFeature } = accommodationSchema;
	return {
		propertyType: additionalType,
		numberOfBedrooms: +numberOfBedrooms,
		numberOfGuests: +amenityFeature[0].value
	};
};

export const getDetailsForMultipleUnits = (accommodationSchema: AccommodationSchema) => {
	const units = accommodationSchema.containsPlace.reduce((acc, curr) => {
		const numberOfRooms = curr.numberOfRooms?.value ? +curr.numberOfRooms.value : 0;
		const numberOfGuests = curr.amenityFeature[0]?.value ? +curr.amenityFeature[0].value : 0;
		const propertyType = curr.additionalType;
		const unit = { propertyType, noOfGuests: numberOfGuests, noOfUnits: numberOfRooms };
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
