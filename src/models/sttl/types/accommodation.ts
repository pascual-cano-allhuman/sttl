export type Rooms = {
	"@type": string;
	additionalType?: string;
	containsPlace: ContainsPlaceForRooms[];
};

export type EntireProperty = {
	"@type": string;
	additionalType?: string;
	numberOfBedrooms: string;
	amenityFeature: [
		{
			"@type": "LocationFeatureSpecification";
			name: "occupancy";
			value: string;
		}
	];
};

export type MultipleUnits = {
	"@type": "LodgingBusiness";
	containsPlace: ContainsPlaceForUnits[];
};

export type ContainsPlaceForRooms = {
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

export type ContainsPlaceForUnits = {
	"@type": string;
	additionalType: string;
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

export type AdditionalProperty = { "@type": string; name: string; value: string }[];

type PostalAddress = {
	"@type": "PostalAddress";
	streetAddress: string;
	postalCode: string;
	addressLocality: string;
	addressRegion: string;
	addressCountry: string;
};

export type Accommodation = (Rooms | EntireProperty | MultipleUnits) & { additionalProperty: AdditionalProperty; address: PostalAddress };
