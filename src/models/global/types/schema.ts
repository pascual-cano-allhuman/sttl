import { CategoryAsText } from "./categories";

export type OrderSchema = {
	"@context"?: string;
	"@type": "Order" | string;
	acceptedOffer: {
		"@type": "Offer" | string;
		price?: number;
		priceCurrency: string;
		itemOffered: {
			"@type": "GovernmentService" | string;
			category: CategoryAsText;
			name: "STL Registration" | string;
			isRelatedTo: PersonSchema;
		};
	}[];
	customer: PersonSchema;
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

export type AccommodationSchema = {
	"@type": "Accommodation" | "LodgingBusiness";
	additionalType?: string;
	address: AddressSchema;
	additionalProperty: { "@type"?: string; name: string; value: string }[];
	numberOfBedrooms?: string; // Accommodation only
	amenityFeature?: [
		{
			"@type": "LocationFeatureSpecification";
			name: "occupancy";
			value: string;
		}
	];
	containsPlace?: {
		"@type": "Accommodation";
		additionalType: string;
		numberOfRooms?: { "@type": "QuantitativeValue"; unitText: string; value: string };
		amenityFeature: [
			{
				"@type": "LocationFeatureSpecification";
				name: "occupancy";
				value: string;
			}
		];
	}[];
	contactPoint?: PersonSchema[];
};

export type AddressSchema = {
	"@type": "PostalAddress";
	streetAddress: string;
	postalCode: string;
	addressLocality: string;
	addressRegion: string;
	addressCountry: string;
};

export type PersonSchema = {
	"@type": "Person" | string;
	name: string;
	givenName?: string;
	familyName?: string;
	address?: AddressSchema;
	email: string;
	telephone: string;
	worksFor?: {
		"@type": "Organization" | string;
		name: string;
	};
	identifier?: [
		{
			"@type": "PropertyValue";
			propertyID: string;
			value: string;
			valueReference: string;
		}
	];
	owns?: AccommodationSchema;
};
