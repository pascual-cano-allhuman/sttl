import { PropertyData } from "models/sttl";
import { AccommodationSchema, Category, PLANNING_PERMISSION_AS_TEXT, AddressSchema } from "models/global";
// TODO: move PLANNING_PERMISSION_AS_TEXT to settings
import { UNIT_ROOM_TYPE_AS_TEXT } from "settings/propertyTypeOptions";

export const composeAccommodation = (property: PropertyData) => {
	const accommodation = getAccommodationByType(property);
	const { propertyAddress } = property.property_address;
	const { permissionStatus } = property.statutory_obligations;
	const address = getPostalAddress(propertyAddress, "Ireland");
	const planningPermission = {
		"@type": "PropertyValue",
		name: "Planning Permission",
		value: PLANNING_PERMISSION_AS_TEXT[permissionStatus]
	};
	return { ...accommodation, address, additionalProperty: [planningPermission] } as AccommodationSchema;
};

export const getAccommodationByType = (property: PropertyData) => {
	const { category, room, fullProperty, units } = property.property_type;
	if (category === Category.room) return getSharedRooms(room);
	if (category === Category.fullProperty) return getEntireProperty(fullProperty);
	if (category === Category.units) return getMultipleUnitsProperty(units);
};

const getPostalAddress = (addressInput: any, countryOfResidence: string): AddressSchema => {
	const address = { "@type": "PostalAddress" } as AddressSchema;
	const streetAddressParts = [addressInput.addressLine1, addressInput.addressLine2, addressInput.addressLine3].filter(Boolean);
	address.streetAddress = streetAddressParts.join(", ");
	address.postalCode = addressInput.postcode || addressInput.postcode;
	address.addressLocality = addressInput.town;
	address.addressRegion = addressInput.county?.replace(/^co. /i, "");
	address.addressCountry = countryOfResidence;
	return address;
};

const getSharedRooms = (room: any) => {
	const { propertyType, customPropertyType } = room;
	const { numberOfSharedRooms, numberOfPrivateRooms, numberOfGuestsInSharedRooms, numberOfGuestsInPrivateRooms } = room;
	const isShared = numberOfSharedRooms;
	const isPrivate = numberOfPrivateRooms;
	const hasSharedOrPrivateRooms = !!isShared || !!isPrivate;
	const hasSharedAndPrivateRooms = isShared && isPrivate;
	const rooms = hasSharedAndPrivateRooms ? [{ isShared }, { isPrivate }] : hasSharedOrPrivateRooms ? [isShared ? { isShared } : { isPrivate }] : []; // eslint-disable-line
	return {
		"@type": "Accommodation",
		additionalType: !customPropertyType ? propertyType : customPropertyType,
		containsPlace: rooms.map(({ isShared }) => ({
			additionalType: isShared ? "shared" : "private",
			numberOfRooms: {
				"@type": "QuantitativeValue",
				unitText: isShared ? "shared" : "private",
				value: isShared ? `${numberOfSharedRooms}` : `${numberOfPrivateRooms}`
			},
			amenityFeature: [
				{
					"@type": "LocationFeatureSpecification",
					name: "occupancy",
					value: isShared ? `${numberOfGuestsInSharedRooms}` : `${numberOfGuestsInPrivateRooms}`
				}
			]
		}))
	};
};

const getEntireProperty = (fullProperty: any) => {
	const { propertyType, numberOfGuests, numberOfBedrooms, customPropertyType } = fullProperty;
	return {
		"@type": "Accommodation",
		additionalType: !customPropertyType ? propertyType : customPropertyType,
		numberOfBedrooms: `${numberOfBedrooms}`,
		amenityFeature: [
			{
				"@type": "LocationFeatureSpecification",
				name: "occupancy",
				value: `${numberOfGuests}`
			}
		]
	};
};

const getMultipleUnitsProperty = (units: any) => {
	return {
		"@type": "LodgingBusiness",
		containsPlace: units.reduce((acc, next) => {
			const { propertyType, customPropertyType, noOfGuests, ...rest } = next;
			const propName = Object.keys(rest).find(key => !!UNIT_ROOM_TYPE_AS_TEXT[key]); // should always find one only
			const unitText = UNIT_ROOM_TYPE_AS_TEXT[propName];
			const unitValue = rest[propName];
			const item = {
				"@type": "Accommodation",
				additionalType: !customPropertyType ? propertyType : customPropertyType,
				amenityFeature: [
					{
						"@type": "LocationFeatureSpecification",
						name: "occupancy",
						value: `${noOfGuests}`
					}
				],
				// this is optional. Include if field is available
				...(unitText
					? {
							numberOfRooms: {
								"@type": "QuantitativeValue",
								unitText,
								value: `${unitValue}`
							}
						}
					: {})
			};
			acc.push(item);
			return acc;
		}, [])
	};
};
