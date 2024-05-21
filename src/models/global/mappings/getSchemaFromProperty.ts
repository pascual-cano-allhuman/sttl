import { AccommodationSchema, AddressSchema, PersonSchema, Property } from "../types";
import { FullPropertyDetails, MultipleUnitsDetails, SharedPropertyDetails, PLANNING_PERMISSION_AS_TEXT } from "../types";

export const getSchemaFromProperty = (property: Property) => {
	const accommodationSchema = getAccommodationSchema(property);
	const ownerSchema = getPersonSchema(property);
	return { accommodationSchema, ownerSchema };
};

export const getAccommodationSchema = (property: Property) => {
	const { category } = property;
	let accommodationSchema = null;
	if (category === "sharedProperty") accommodationSchema = getSharedPropertySchema(property);
	if (category === "fullProperty") accommodationSchema = getFullPropertySchema(property);
	if (category === "multipleUnits") accommodationSchema = getMultipleUnitsSchema(property);
	if (!accommodationSchema) return null;
	const address = getAddressSchema(property.address);
	const planningPermission = PLANNING_PERMISSION_AS_TEXT[property.permissionStatus];
	const additionalProperty = [{ "@type": "PropertyValue", name: "Planning Permission", value: planningPermission }];
	return { ...accommodationSchema, address, additionalProperty } as AccommodationSchema;
};

export const getSharedPropertySchema = (property: Property) => {
	const details = property.details as SharedPropertyDetails;
	const { propertyType } = details;
	const { numberOfSharedRooms, numberOfPrivateRooms, numberOfGuestsInSharedRooms, numberOfGuestsInPrivateRooms } = details;
	const containsPlace = [];
	if (numberOfSharedRooms) {
		containsPlace.push({
			"@type": "Accommodation",
			additionalType: "shared",
			numberOfRooms: { "@type": "QuantitativeValue", unitText: "shared", value: `${numberOfSharedRooms}` },
			amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "occupancy", value: `${numberOfGuestsInSharedRooms}` }]
		});
	}
	if (numberOfPrivateRooms) {
		containsPlace.push({
			"@type": "Accommodation",
			additionalType: "private",
			numberOfRooms: { "@type": "QuantitativeValue", unitText: "private", value: `${numberOfPrivateRooms}` },
			amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "occupancy", value: `${numberOfGuestsInPrivateRooms}` }]
		});
	}
	return {
		"@type": "Accommodation",
		additionalType: propertyType,
		containsPlace
	};
};

export const getFullPropertySchema = (property: Property) => {
	const { propertyType, numberOfGuests, numberOfBedrooms } = property.details as FullPropertyDetails;
	return {
		"@type": "Accommodation",
		additionalType: propertyType,
		numberOfBedrooms: `${numberOfBedrooms}`,
		amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "occupancy", value: `${numberOfGuests}` }]
	};
};

export const getMultipleUnitsSchema = (property: Property) => {
	const { units } = property.details as MultipleUnitsDetails;
	const containsPlace = units.map(unit => {
		const { propertyType, noOfGuests, noOfUnits } = unit;
		const unitText = UNIT_ROOM_TYPE_AS_TEXT[propertyType] || "Number";
		const data = { "@type": "Accommodation", additionalType: propertyType };
		data["amenityFeature"] = [{ "@type": "LocationFeatureSpecification", name: "occupancy", value: `${noOfGuests}` }];
		if (+noOfUnits > 0) data["numberOfRooms"] = { "@type": "QuantitativeValue", unitText: `${unitText}`, value: `${noOfUnits || ""}` };
		return data;
	});
	return {
		"@type": "LodgingBusiness",
		containsPlace
	};
};

export const UNIT_ROOM_TYPE_AS_TEXT = {
	"Activity or adventure centre": "Room",
	"Apartments - student accommodation": "Own Door Unit",
	"Apartments - other": "Own Door Unit",
	"Multiple houses on a site": "Own Door Unit",
	"Site - for motor home / tent / yurt etc.": "Pitch",
	"Serviced accommodation": "Own Door Unit"
};

export const getPersonSchema = (property: Property) => {
	const { firstName, lastName, emailAddress, telephone, businessName } = property.owner;
	const ownerAddress = property.owner.address || property.address;
	const ownerCountry = property.owner.countryOfResidence;
	return {
		"@type": "Person",
		name: `${firstName} ${lastName}`,
		givenName: firstName,
		familyName: lastName,
		address: getAddressSchema(ownerAddress, ownerCountry),
		email: emailAddress,
		telephone,
		worksFor: {
			"@type": "Organization",
			name: businessName || ""
		}
	} as PersonSchema;
};

export const getAddressSchema = (addressInput: any, country?: string) => {
	const address = { "@type": "PostalAddress" } as AddressSchema;
	const streetAddressParts = [addressInput.addressLine1, addressInput.addressLine2, addressInput.addressLine3].filter(Boolean);
	address.streetAddress = streetAddressParts.join(", ");
	address.postalCode = addressInput.postcode || addressInput.postcode;
	address.addressLocality = addressInput.town;
	address.addressRegion = addressInput.county?.replace(/^co. /i, "");
	address.addressCountry = country || "Ireland";
	return address;
};
