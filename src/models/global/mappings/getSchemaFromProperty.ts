import { AccommodationSchema, AddressSchema, PersonSchema, Property } from "../types";
import { FullPropertyDetails, MultipleUnitsDetails, SharedPropertyDetails } from "../types";

export const getSchemaFromProperty = (property: Property) => {
	const accommodationSchema = {} as AccommodationSchema;
	const ownerSchema = getPersonSchema(property);
	return { accommodationSchema, ownerSchema };
};

export const getSharedPropertySchema = (property: Property) => {
	const details = property.details as SharedPropertyDetails;
	const { propertyType } = details;
	const { numberOfSharedRooms, numberOfPrivateRooms, numberOfGuestsInSharedRooms, numberOfGuestsInPrivateRooms } = details;
	const containsPlace = [];
	if (numberOfSharedRooms) {
		containsPlace.push({
			additionalType: "shared",
			numberOfRooms: { "@type": "QuantitativeValue", unitText: "shared", value: `${numberOfSharedRooms}` },
			amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "occupancy", value: `${numberOfGuestsInSharedRooms}` }]
		});
	}
	if (numberOfPrivateRooms) {
		containsPlace.push({
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
		return {
			"@type": "Accommodation",
			additionalType: propertyType,
			amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "occupancy", value: `${noOfGuests}` }],
			numberOfRooms: { "@type": "QuantitativeValue", unitText: `${unitText}`, value: `${noOfUnits || ""}` }
		};
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

export const getAddressSchema = (addressInput: any, countryOfResidence: string) => {
	const address = { "@type": "PostalAddress" } as AddressSchema;
	const streetAddressParts = [addressInput.addressLine1, addressInput.addressLine2, addressInput.addressLine3].filter(Boolean);
	address.streetAddress = streetAddressParts.join(", ");
	address.postalCode = addressInput.postcode || addressInput.postcode;
	address.addressLocality = addressInput.town;
	address.addressRegion = addressInput.county?.replace(/^co. /i, "");
	address.addressCountry = countryOfResidence;
	return address;
};
