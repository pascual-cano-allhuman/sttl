import { PROPERTY_OPTIONS, TEXT_TO_UNIT_ROOM_TYPE } from "settings/propertyTypeOptions";
import { RoomsOwns, EntirePropertyOwns, MultipleUnitsOwns, OfferItem, AdditionalProperty } from "../../types/order";
import { TEXT_TO_CATEGORY, Category, TEXT_TO_PLANNING_PERMISSION } from "../../types";

export const getPlanningPermissionFromOfferItem = (item: OfferItem) => {
	const permission = item.itemOffered.isRelatedTo.owns.additionalProperty?.find(ap => ap.name === "Planning Permission");
	return { permissionStatus: TEXT_TO_PLANNING_PERMISSION[permission.value] ?? "" };
};
export const getPlanningPermission = (additionalProperty: AdditionalProperty) => {
	const value = additionalProperty?.find(ap => ap.name === "Planning Permission")?.value;
	return TEXT_TO_PLANNING_PERMISSION[value] ?? "";
};

export const getPropertyType = (item: OfferItem) => {
	const {
		itemOffered: { category: categoryAsText }
	} = item;

	const category = TEXT_TO_CATEGORY[categoryAsText];
	const stepOneArrayItem = { category };

	if (category === Category.room) {
		const owns = item.itemOffered.isRelatedTo.owns as RoomsOwns;
		const { containsPlace } = owns;
		const hasRoomProperty = PROPERTY_OPTIONS.room.some(({ value }) => value === owns.additionalType);
		const propertyType = hasRoomProperty ? owns.additionalType : "Other - specify";
		const customPropertyType = hasRoomProperty ? undefined : owns.additionalType;

		const baseProps = { propertyType, ...(customPropertyType ? { customPropertyType } : {}) };

		const propertyDetails = containsPlace.reduce(
			(acc, next) => {
				const numberOfRooms = +next.numberOfRooms.value;
				const numberOfGuests = +next.amenityFeature[0].value;
				if (next.additionalType === "shared") {
					acc["numberOfSharedRooms"] = numberOfRooms;
					acc["numberOfGuestsInSharedRooms"] = numberOfGuests;
					return acc;
				}
				if (next.additionalType === "private") {
					acc["numberOfPrivateRooms"] = numberOfRooms;
					acc["numberOfGuestsInPrivateRooms"] = numberOfGuests;
					return acc;
				}
				return acc;
			},
			{ ...baseProps }
		);

		stepOneArrayItem[category] = propertyDetails;
		return stepOneArrayItem;
	}

	if (category === Category.fullProperty) {
		const owns = item.itemOffered.isRelatedTo.owns as EntirePropertyOwns;
		const hasFullProperty = PROPERTY_OPTIONS.fullProperty.some(({ value }) => value === owns.additionalType);
		const propertyType = hasFullProperty ? owns.additionalType : "Other - specify";
		const customPropertyType = hasFullProperty ? undefined : owns.additionalType;

		const baseProps = { propertyType, ...(customPropertyType ? { customPropertyType } : {}) };

		const propertyDetails = {
			...baseProps,
			numberOfBedrooms: +owns.numberOfBedrooms,
			numberOfGuests: +owns.amenityFeature[0].value
		};
		stepOneArrayItem[category] = propertyDetails;
		return stepOneArrayItem;
	}

	if (category === Category.units) {
		const owns = item.itemOffered.isRelatedTo.owns as MultipleUnitsOwns;

		const propertyDetails = owns.containsPlace.reduce((acc, next) => {
			const unitText = next.numberOfRooms?.unitText;
			const numberOfRooms = next.numberOfRooms?.value ? +next.numberOfRooms.value : 0;
			const numberOfGuests = next.amenityFeature[0]?.value ? +next.amenityFeature[0].value : 0;
			const hasUnitsProperty = PROPERTY_OPTIONS.units.some(({ value }) => value === next.additionalType);
			const propertyType = hasUnitsProperty ? next.additionalType : "Other - specify";
			const customPropertyType = hasUnitsProperty ? undefined : next.additionalType;

			const baseProps = { propertyType, ...(customPropertyType ? { customPropertyType } : {}) };

			const item = { ...baseProps, noOfGuests: numberOfGuests };
			if (unitText) {
				const prop = TEXT_TO_UNIT_ROOM_TYPE[unitText];
				item[prop] = numberOfRooms;
			}
			acc.push(item);
			return acc;
		}, []);

		stepOneArrayItem[category] = propertyDetails;
		return stepOneArrayItem;
	}
};

export const getPropertyAddress = (item: OfferItem) => {
	const { addressLocality, addressRegion, postalCode, streetAddress } = item.itemOffered.isRelatedTo.owns.address;

	const propertyAddress = {
		addressLine1: streetAddress,
		addressLine2: "", // will never know
		addressLine3: "", // will never know
		town: addressLocality,
		postcode: postalCode,
		county: `Co. ${addressRegion}`
	};
	return { propertyAddress };
};

export const getOwnerDetails = (item: OfferItem) => {
	const { address } = item.itemOffered.isRelatedTo;
	const businessName = item.itemOffered.isRelatedTo?.worksFor?.name || "";
	const { owns } = item.itemOffered.isRelatedTo;
	const ownsAddress = owns.address;
	const { givenName, familyName, email, telephone } = item.itemOffered.isRelatedTo;
	const isAddressSameAsStlProperty = address.streetAddress.trim() === ownsAddress.streetAddress.trim();
	if (isAddressSameAsStlProperty)
		return {
			countryOfResidence: address.addressCountry,
			firstName: givenName,
			lastName: familyName,
			emailAddress: email,
			telephone,
			businessName,
			isAddressSameAsStlProperty: true
		};
	return {
		countryOfResidence: address.addressCountry,
		firstName: givenName,
		lastName: familyName,
		emailAddress: email,
		telephone,
		businessName,
		isAddressSameAsStlProperty: false,
		ownerAddress: {
			addressLine1: address.streetAddress,
			addressLine2: "", // will never know
			addressLine3: "", // will never know
			town: address.addressLocality,
			postcode: address.postalCode,
			county: address.addressCountry.includes("Ireland") ? `Co. ${address.addressRegion}` : address.addressRegion
		}
	};
};
