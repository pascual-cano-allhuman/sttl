import { CategoryAsText } from "./categories";
import { Accommodation } from "./accommodation";

export type Order = {
	"@context": "https://schema.org" | string;
	"@type": "Order" | string;
	acceptedOffer: Offer[];
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

export type Offer = {
	"@type": "Offer";
	price?: number;
	priceCurrency: "EUR";
	itemOffered: {
		category: CategoryAsText;
		"@type": "GovernmentService";
		name: "STL Registration";
		isRelatedTo: Person;
	};
};

export type Person = {
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
	owns: Accommodation;
};

export type PostalAddress = {
	"@type": "PostalAddress";
	streetAddress: string;
	postalCode: string;
	addressLocality: string;
	addressRegion: string;
	addressCountry: string;
};
