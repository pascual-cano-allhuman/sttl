import { UNIT_ROOM_TYPE_AS_TEXT } from "settings/propertyTypeOptions";
import { OfferItem, PostalAddress, RoomsOwns, EntirePropertyOwns, MultipleUnitsOwns, OfferOwns, ContainsPlaceItemForUnits } from "../../types/order";
import { FormState, Category, CategoryAsText, PLANNING_PERMISSION_AS_TEXT } from "../../types";

export const composeAddress = (addressInput: any, countryOfResidence: string): PostalAddress => {
	const address = { "@type": "PostalAddress" } as PostalAddress;
	const streetAddressParts = [addressInput.addressLine1, addressInput.addressLine2, addressInput.addressLine3].filter(Boolean);
	address.streetAddress = streetAddressParts.join(", ");
	address.postalCode = addressInput.postcode || addressInput.postcode;
	address.addressLocality = addressInput.town;
	address.addressRegion = addressInput.county?.replace(/^co. /i, "");
	address.addressCountry = countryOfResidence;
	return address;
};

export const getOwnerAddress = (formState: FormState, index: number) => {
	const { propertyAddress } = formState["property_address"][index];
	const { isAddressSameAsStlProperty, countryOfResidence, ownerAddress } = formState["property_owner_details"][index];
	if (isAddressSameAsStlProperty) return composeAddress(propertyAddress, countryOfResidence);
	return composeAddress(ownerAddress, countryOfResidence);
};

export const getOwns = (formState: FormState, index) => {
	const { category, room, fullProperty, units } = formState["property_type"][index];
	const { permissionStatus } = formState["statutory_obligations"][index];
	const { propertyAddress } = formState["property_address"][index];
	const address = composeAddress(propertyAddress, "Ireland");
	let result = {} as RoomsOwns | EntirePropertyOwns | MultipleUnitsOwns;
	if (category === Category.room) result = getOwnsForSharedRooms(room, address);
	if (category === Category.fullProperty) result = getOwnsForEntireProperty(fullProperty, address);
	if (category === Category.units) result = getOwnsForMultipleProperty(units, address);
	const planningPermission = {
		"@type": "PropertyValue",
		name: "Planning Permission",
		value: PLANNING_PERMISSION_AS_TEXT[permissionStatus]
	};
	return {
		...result,
		additionalProperty: [planningPermission]
	};
};

const getOwnsForSharedRooms = (room: any, address: PostalAddress): RoomsOwns => {
	const owns = { address } as RoomsOwns;
	const { numberOfSharedRooms, numberOfPrivateRooms, propertyType, customPropertyType, numberOfGuestsInSharedRooms, numberOfGuestsInPrivateRooms } =
		room;

	const isShared = numberOfSharedRooms;
	const isPrivate = numberOfPrivateRooms;
	const hasSharedOrPrivateRooms = !!isShared || !!isPrivate;
	const hasSharedAndPrivateRooms = isShared && isPrivate;
	// TODO cover with test and refactor !!
	const rooms = hasSharedAndPrivateRooms ? [{ isShared }, { isPrivate }] : hasSharedOrPrivateRooms ? [isShared ? { isShared } : { isPrivate }] : []; // eslint-disable-line

	owns["@type"] = "Accommodation";
	owns.additionalType = !customPropertyType ? propertyType : customPropertyType;
	owns.containsPlace = rooms.map(({ isShared }) => ({
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
	}));
	return owns;
};

const getOwnsForEntireProperty = (fullProperty: any, address: PostalAddress): EntirePropertyOwns => {
	const owns = { address } as EntirePropertyOwns;
	const { propertyType, numberOfGuests, numberOfBedrooms, customPropertyType } = fullProperty;

	owns["@type"] = "Accommodation";
	owns.additionalType = !customPropertyType ? propertyType : customPropertyType;
	owns.numberOfBedrooms = `${numberOfBedrooms}`;
	owns.amenityFeature = [
		{
			"@type": "LocationFeatureSpecification",
			name: "occupancy",
			value: `${numberOfGuests}`
		}
	];
	return owns;
};

const getOwnsForMultipleProperty = (units: any, address: PostalAddress): MultipleUnitsOwns => {
	const owns = { address } as MultipleUnitsOwns;
	owns["@type"] = "LodgingBusiness";

	owns.containsPlace = units.reduce((acc: ContainsPlaceItemForUnits[], next) => {
		const { propertyType, customPropertyType, noOfGuests, ...rest } = next;

		const propName = Object.keys(rest).find(key => !!UNIT_ROOM_TYPE_AS_TEXT[key]); // should always find one only
		const unitText = UNIT_ROOM_TYPE_AS_TEXT[propName];
		const unitValue = rest[propName];

		const item: ContainsPlaceItemForUnits = {
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
	}, []) as ContainsPlaceItemForUnits[];

	return owns;
};

export const getOfferItem = (
	firstName: string,
	lastName: string,
	owns: OfferOwns,
	address: PostalAddress,
	email: string,
	category: CategoryAsText,
	telephone: string,
	businessName: string
) => {
	return {
		"@type": "Offer",
		priceCurrency: "EUR",
		itemOffered: {
			category,
			"@type": "GovernmentService",
			name: "STL Registration",
			isRelatedTo: {
				"@type": "Person",
				name: `${firstName} ${lastName}`,
				givenName: firstName,
				familyName: lastName,
				address,
				email,
				telephone,
				worksFor: {
					"@type": "Organization",
					name: businessName || ""
				},
				owns
			}
		}
	} as OfferItem;
};
