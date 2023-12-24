export const propertySample = {
	"@type": "LodgingBusiness",
	identifier: [{ valueReference: "Active", value: "ABC123" }],
	numberOfBedrooms: 0,
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
