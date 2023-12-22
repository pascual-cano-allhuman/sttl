import { CategoryAsText } from "./categories";

export type PropertyName = string;

type PostalAddress = {
	"@type": "PostalAddress";
	streetAddress: string;
	postalCode: string;
	addressLocality: string;
	addressRegion: string;
	addressCountry: string;
};

export type RoomsOwns = {
	"@type": PropertyName;
	additionalType?: PropertyName;
	address: PostalAddress;
	containsPlace: ContainsPlaceItemForRooms[];
};

export type EntirePropertyOwns = {
	"@type": PropertyName;
	additionalType?: PropertyName;
	address: PostalAddress;
	numberOfBedrooms: string;
	amenityFeature: [
		{
			"@type": "LocationFeatureSpecification";
			name: "occupancy";
			value: string;
		}
	];
};

export type MultipleUnitsOwns = {
	"@type": "LodgingBusiness";
	address: PostalAddress;
	containsPlace: ContainsPlaceItemForMultipleUnits[];
};

export type AdditionalProperty = { "@type": string; name: string; value: string }[];

export type OfferOwns = (RoomsOwns | EntirePropertyOwns | MultipleUnitsOwns) & { additionalProperty: AdditionalProperty };

export type ContainsPlaceItemForRooms = {
	additionalType: "shared" | "private";
	numberOfRooms: { "@type": "QuantitativeValue"; unitText: string; value: string };
	amenityFeature: [
		{
			"@type": "LocationFeatureSpecification";
			name: string;
			value: string;
		}
	];
};

export type ContainsPlaceItemForMultipleUnits = {
	"@type": PropertyName;
	additionalType: PropertyName;
	amenityFeature: [
		{
			"@type": "LocationFeatureSpecification";
			name: "occupancy";
			value: string;
		}
	];
	numberOfRooms?: {
		"@type": "QuantitativeValue";
		unitText: string;
		value: string;
	};
};

export type OfferItem = {
	"@type": "Offer";
	price?: number;
	priceCurrency: "EUR";
	itemOffered: {
		category: CategoryAsText;
		"@type": "GovernmentService";
		name: "STL Registration";
		isRelatedTo: {
			"@type": "Person";
			name: string;
			givenName: string;
			familyName: string;
			address: PostalAddress;
			email: string;
			telephone: string;
			worksFor: {
				"@type": "Organization";
				name: string;
			};
			owns: OfferOwns;
		};
	};
};

export type Order = {
	"@context": "https://schema.org" | string;
	"@type": "Order" | string;
	acceptedOffer: OfferItem[];
	customer: {
		"@type": "Person";
		email: string;
		name: string;
		telephone: string;
		identifier: [
			{
				"@type": "PropertyValue";
				propertyID: string;
				value: string;
				valueReference: string;
			}
		];
		worksFor: {
			"@type": "Organization";
			name: string;
		};
	};
	partOfInvoice: {
		"@type": "Invoice";
		totalPaymentDue: {
			"@type": "PriceSpecification";
			price?: number;
			priceCurrency: string;
		};
	};
	orderNumber?: string;
	orderDate?: string;
	orderStatus?: string;
};
