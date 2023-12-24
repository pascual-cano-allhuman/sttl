import { PostalAddress, ContainsPlaceItemForRooms, EntirePropertyOwns, MultipleUnitsOwns, OfferItem, Order, RoomsOwns } from "../../types/order";

type PermissionProperty = {
	"@type": string;
	name: string;
	value: PermissionStatus;
};
type QuantitativeValue = {
	"@type": "QuantitativeValue";
	unitText: string;
	value: string;
};

type LocationFeatureSpecification = {
	"@type": "LocationFeatureSpecification";
	name: string;
	value: string;
};

export const isValidOrder = (obj: any): obj is Order => {
	const order =
		typeof obj === "object" &&
		typeof obj["@context"] === "string" &&
		obj["@type"] === "Order" &&
		Array.isArray(obj.acceptedOffer) &&
		obj.acceptedOffer?.every(offer => isOfferItem(offer)) &&
		isCustomer(obj.customer) &&
		isPartOfInvoice(obj.partOfInvoice);
	return order;
};

export const isCustomer = (obj: any): obj is Order["customer"] => {
	const customer =
		typeof obj === "object" &&
		typeof obj["@type"] === "string" &&
		typeof obj.email === "string" &&
		typeof obj.name === "string" &&
		typeof obj.telephone === "string" &&
		Array.isArray(obj.identifier) &&
		obj.identifier.every(
			(id: any) =>
				typeof id === "object" &&
				typeof id["@type"] === "string" &&
				typeof id.propertyID === "string" &&
				typeof id.value === "string" &&
				typeof id.valueReference === "string"
		) &&
		typeof obj.worksFor === "object" &&
		typeof obj.worksFor["@type"] === "string" &&
		typeof obj.worksFor.name === "string";
	return customer;
};

export const isPartOfInvoice = (obj: any): obj is Order["partOfInvoice"] => {
	const partOfInvoice =
		typeof obj === "object" &&
		typeof obj["@type"] === "string" &&
		typeof obj.totalPaymentDue === "object" &&
		typeof obj.totalPaymentDue["@type"] === "string" &&
		typeof obj.totalPaymentDue.priceCurrency === "string" &&
		(typeof obj.totalPaymentDue.price === "number" || typeof obj.totalPaymentDue.price === "undefined");
	return partOfInvoice;
};

export const isOfferItem = (obj: any): obj is OfferItem => {
	const offerItem =
		typeof obj === "object" &&
		obj?.["@type"] === "Offer" &&
		obj?.priceCurrency === "EUR" &&
		obj?.itemOffered?.["@type"] === "GovernmentService" &&
		obj?.itemOffered?.name === "STL Registration" &&
		obj?.itemOffered?.isRelatedTo?.["@type"] === "Person" &&
		typeof obj?.itemOffered?.isRelatedTo?.name === "string" &&
		typeof obj?.itemOffered?.isRelatedTo?.givenName === "string" &&
		typeof obj?.itemOffered?.isRelatedTo?.familyName === "string" &&
		typeof obj?.itemOffered?.isRelatedTo?.email === "string" &&
		typeof obj?.itemOffered?.isRelatedTo?.telephone === "string" &&
		typeof obj?.itemOffered?.isRelatedTo?.address === "object" &&
		typeof obj.itemOffered.isRelatedTo.address.streetAddress === "string" &&
		typeof obj.itemOffered.isRelatedTo.address.postalCode === "string" &&
		typeof obj.itemOffered.isRelatedTo.address.addressLocality === "string" &&
		typeof obj.itemOffered.isRelatedTo.address.addressRegion === "string" &&
		typeof obj.itemOffered.isRelatedTo.address.addressCountry === "string" &&
		obj?.itemOffered?.isRelatedTo?.worksFor?.["@type"] === "Organization" &&
		typeof obj?.itemOffered?.isRelatedTo?.worksFor?.name === "string" &&
		typeof obj.itemOffered.isRelatedTo.owns === "object" &&
		obj.itemOffered.isRelatedTo.owns.additionalProperty?.every((item: PermissionProperty) => isPermissionStatus(item.value)) &&
		(isRoomsOwns(obj.itemOffered.isRelatedTo.owns) ||
			isEntirePropertyOwns(obj.itemOffered.isRelatedTo.owns) ||
			isMultipleUnitsOwns(obj.itemOffered.isRelatedTo.owns));

	return offerItem;
};

const isPermissionStatus = (value: any): value is PermissionStatus => value === "Granted" || value === "Outstanding";

const isLocationFeatureSpecification = (feature: any): feature is LocationFeatureSpecification =>
	typeof feature === "object" &&
	feature["@type"] === "LocationFeatureSpecification" &&
	typeof feature.name === "string" &&
	typeof feature.value === "string";

const isQuantitativeValue = (value: any): value is QuantitativeValue =>
	typeof value === "object" && value !== null && value["@type"] === "QuantitativeValue" && typeof value.unitText === "string";

const isContainsPlaceItemForRooms = (item: any): item is ContainsPlaceItemForRooms =>
	typeof item === "object" &&
	item !== null &&
	typeof item.additionalType === "string" &&
	typeof item.numberOfRooms === "object" &&
	isQuantitativeValue(item.numberOfRooms) &&
	Array.isArray(item.amenityFeature) &&
	item.amenityFeature.every(isLocationFeatureSpecification);

const isRoomsOwns = (obj: any): obj is RoomsOwns => {
	return (
		typeof obj === "object" &&
		typeof obj["@type"] === "string" &&
		isAddress(obj.address) &&
		Array.isArray(obj.containsPlace) &&
		obj.containsPlace.every((item: any) => isContainsPlaceItemForRooms(item))
	);
};

const isEntirePropertyOwns = (obj: any): obj is EntirePropertyOwns => {
	return (
		typeof obj === "object" &&
		typeof obj["@type"] === "string" &&
		isAddress(obj.address) &&
		typeof obj.numberOfBedrooms === "string" &&
		Array.isArray(obj.amenityFeature) &&
		obj.amenityFeature.length > 0 &&
		obj.amenityFeature[0]["@type"] === "LocationFeatureSpecification" &&
		obj.amenityFeature[0].name === "occupancy" &&
		typeof obj.amenityFeature[0].value === "string"
	);
};

const isMultipleUnitsOwns = (obj: any): obj is MultipleUnitsOwns => {
	return obj != null && typeof obj === "object" && typeof obj["@type"] === "string" && isAddress(obj.address);
};

export const isAddress = (obj: any): obj is PostalAddress => {
	return (
		typeof obj === "object" &&
		obj["@type"] === "PostalAddress" &&
		typeof obj.streetAddress === "string" &&
		typeof obj.postalCode === "string" &&
		typeof obj.addressLocality === "string" &&
		typeof obj.addressRegion === "string" &&
		typeof obj.addressCountry === "string"
	);
};
