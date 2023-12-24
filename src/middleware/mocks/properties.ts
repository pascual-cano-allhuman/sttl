export const sharedRoom = {
	"@type": "House",
	identifier: [{ valueReference: "Active", value: "ABC123" }],
	numberOfBedrooms: 0,
	containsPlace: [
		{
			"@type": "Room",
			additionalType: "shared",
			numberOfRooms: {
				"@type": "QuantitativeValue",
				unitText: "shared",
				value: "1"
			},
			amenityFeature: [
				{
					"@type": "LocationFeatureSpecification",
					name: "occupancy",
					value: 1
				}
			]
		},
		{
			"@type": "Room",
			additionalType: "private",
			numberOfRooms: {
				"@type": "QuantitativeValue",
				unitText: "private",
				value: "1"
			},
			amenityFeature: [
				{
					"@type": "LocationFeatureSpecification",
					name: "occupancy",
					value: 1
				}
			]
		}
	]
};

export const fullProperty = {
	"@type": "Apartment / Flat",
	identifier: [{ valueReference: "Active", value: "ABC123" }],
	numberOfBedrooms: 1,
	amenityFeature: [
		{
			name: "occupancy",
			value: 1
		}
	]
};

export const propertyWithUnits = {
	"@type": "LodgingBusiness",
	identifier: [{ valueReference: "Active", value: "ABC123" }],
	numberOfBedrooms: 0,
	address: {
		"@type": "PostalAddress",
		addressCountry: "IE",
		addressLocality: "Dublin",
		addressRegion: "Dublin",
		postalCode: "D01 1234",
		streetAddress: "123 Fake Street"
	},
	containsPlace: [
		{
			"@type": "Activity or adventure centre",
			additionalType: "Activity or adventure centre",
			amenityFeature: [
				{
					"@type": "LocationFeatureSpecification",
					name: "occupancy",
					value: "2"
				}
			],
			numberOfRooms: {
				"@type": "QuantitativeValue",
				unitText: "Room",
				value: "1"
			}
		},
		{
			"@type": "Hostel",
			additionalType: "Hostel",
			amenityFeature: [
				{
					"@type": "LocationFeatureSpecification",
					name: "occupancy",
					value: "2"
				}
			]
		},
		{
			"@type": "Apartments - student accommodation",
			additionalType: "Apartments - student accommodation",
			amenityFeature: [
				{
					"@type": "LocationFeatureSpecification",
					name: "occupancy",
					value: "2"
				}
			],
			numberOfRooms: {
				"@type": "QuantitativeValue",
				unitText: "Own Door Unit",
				value: "1"
			}
		},
		{
			"@type": "Multiple Other Special",
			additionalType: "Multiple Other Special",
			amenityFeature: [
				{
					"@type": "LocationFeatureSpecification",
					name: "occupancy",
					value: "2"
				}
			],
			numberOfRooms: {
				"@type": "QuantitativeValue",
				unitText: "Number",
				value: "1"
			}
		}
	]
};
