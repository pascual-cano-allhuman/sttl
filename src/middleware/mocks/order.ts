import { CategoryAsText, OrderSchema } from "models";

export const order: OrderSchema = {
	"@context": "https://schema.org",
	"@type": "Order",
	acceptedOffer: [
		{
			"@type": "Offer",
			priceCurrency: "EUR",
			itemOffered: {
				category: "Shared property" as CategoryAsText,
				"@type": "GovernmentService",
				name: "STL Registration",
				isRelatedTo: {
					"@type": "Person",
					name: "Cruz Obrien",
					givenName: "Cruz",
					familyName: "Obrien",
					address: {
						"@type": "PostalAddress",
						streetAddress: "653 White Hague Extension",
						postalCode: "AAA 0000",
						addressLocality: "Aut molestiae nihil ",
						addressRegion: "Clare",
						addressCountry: "Ireland"
					},
					email: "kekyzo@mailinator.com",
					telephone: "+353851231234",
					worksFor: {
						"@type": "Organization",
						name: "All Human"
					},
					owns: {
						"@type": "Accommodation",
						address: {
							"@type": "PostalAddress",
							streetAddress: "532 West Rocky Milton Freeway",
							postalCode: "AAA 0001",
							addressLocality: "Aut molestiae nihil",
							addressRegion: "Cavan",
							addressCountry: "Ireland"
						},
						additionalType: "House",
						containsPlace: [
							{
								"@type": "Accommodation",
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
										value: "1"
									}
								]
							},
							{
								"@type": "Accommodation",
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
										value: "1"
									}
								]
							}
						],
						additionalProperty: [
							{
								"@type": "PropertyValue",
								name: "Planning Permission",
								value: "Granted"
							}
						]
					}
				}
			}
		},
		{
			"@type": "Offer",
			priceCurrency: "EUR",
			itemOffered: {
				category: "Entire property" as CategoryAsText,
				"@type": "GovernmentService",
				name: "STL Registration",
				isRelatedTo: {
					"@type": "Person",
					name: "Herman Dunlap",
					givenName: "Herman",
					familyName: "Dunlap",
					address: {
						"@type": "PostalAddress",
						streetAddress: "634 New Freeway",
						postalCode: "AAA 0002",
						addressLocality: "Corrupti fugiat ad",
						addressRegion: "Carlow",
						addressCountry: "Ireland"
					},
					email: "pakicihi@mailinator.com",
					telephone: "+353851231234",
					worksFor: {
						"@type": "Organization",
						name: "All Human"
					},
					owns: {
						"@type": "Accommodation",
						address: {
							"@type": "PostalAddress",
							streetAddress: "634 New Freeway",
							postalCode: "AAA 0002",
							addressLocality: "Corrupti fugiat ad",
							addressRegion: "Carlow",
							addressCountry: "Ireland"
						},
						additionalType: "Apartment / Flat",
						numberOfBedrooms: "1",
						amenityFeature: [
							{
								"@type": "LocationFeatureSpecification",
								name: "occupancy",
								value: "1"
							}
						],
						additionalProperty: [
							{
								"@type": "PropertyValue",
								name: "Planning Permission",
								value: "Granted"
							}
						]
					}
				}
			}
		},
		{
			"@type": "Offer",
			priceCurrency: "EUR",
			itemOffered: {
				category: "Multiple units" as CategoryAsText,
				"@type": "GovernmentService",
				name: "STL Registration",
				isRelatedTo: {
					"@type": "Person",
					name: "Ian Barron",
					givenName: "Ian",
					familyName: "Barron",
					address: {
						"@type": "PostalAddress",
						streetAddress: "Samoa West Avenue",
						postalCode: "ZIP 0000",
						addressLocality: "Pago Pago",
						addressRegion: "Maoputasi County",
						addressCountry: "American Samoa"
					},
					email: "mejeqyhal@mailinator.com",
					telephone: "+353851231234",
					worksFor: {
						"@type": "Organization",
						name: "All Human"
					},
					owns: {
						"@type": "LodgingBusiness",
						address: {
							"@type": "PostalAddress",
							streetAddress: "740 Rocky Clarendon Avenue",
							postalCode: "AAA 0003",
							addressLocality: "Ut consequat Saepe ",
							addressRegion: "Cork",
							addressCountry: "Ireland"
						},
						containsPlace: [
							{
								"@type": "Accommodation",
								additionalType: "Hostel",
								amenityFeature: [
									{
										"@type": "LocationFeatureSpecification",
										name: "occupancy",
										value: "1"
									}
								]
							}
						],
						additionalProperty: [
							{
								"@type": "PropertyValue",
								name: "Planning Permission",
								value: "Outstanding"
							}
						]
					}
				}
			}
		},
		{
			"@type": "Offer",
			priceCurrency: "EUR",
			itemOffered: {
				category: "Shared property" as CategoryAsText,
				"@type": "GovernmentService",
				name: "STL Registration",
				isRelatedTo: {
					"@type": "Person",
					name: "Minerva Newman",
					givenName: "Minerva",
					familyName: "Newman",
					address: {
						"@type": "PostalAddress",
						streetAddress: "84 West Rocky Oak Street",
						postalCode: "AAA 0004",
						addressLocality: "Vitae adipisci non t",
						addressRegion: "Clare",
						addressCountry: "Ireland"
					},
					email: "nove@mailinator.com",
					telephone: "+353851231234",
					worksFor: {
						"@type": "Organization",
						name: "All Human"
					},
					owns: {
						"@type": "Accommodation",
						address: {
							"@type": "PostalAddress",
							streetAddress: "84 West Rocky Oak Street",
							postalCode: "AAA 0004",
							addressLocality: "Vitae adipisci non t",
							addressRegion: "Clare",
							addressCountry: "Ireland"
						},
						additionalType: "Room Special",
						containsPlace: [
							{
								"@type": "Accommodation",
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
										value: "1"
									}
								]
							},
							{
								"@type": "Accommodation",
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
										value: "1"
									}
								]
							}
						],
						additionalProperty: [
							{
								"@type": "PropertyValue",
								name: "Planning Permission",
								value: "Granted"
							}
						]
					}
				}
			}
		},
		{
			"@type": "Offer",
			priceCurrency: "EUR",
			itemOffered: {
				category: "Entire property" as CategoryAsText,
				"@type": "GovernmentService",
				name: "STL Registration",
				isRelatedTo: {
					"@type": "Person",
					name: "Blake Meadows",
					givenName: "Blake",
					familyName: "Meadows",
					address: {
						"@type": "PostalAddress",
						streetAddress: "80 Cowley Avenue",
						postalCode: "AAA 0005",
						addressLocality: "Consequatur Ut dign",
						addressRegion: "Cork",
						addressCountry: "Ireland"
					},
					email: "vowuraqozo@mailinator.com",
					telephone: "+353851231234",
					worksFor: {
						"@type": "Organization",
						name: "All Human"
					},
					owns: {
						address: {
							"@type": "PostalAddress",
							streetAddress: "80 Cowley Avenue",
							postalCode: "AAA 0005",
							addressLocality: "Consequatur Ut dign",
							addressRegion: "Cork",
							addressCountry: "Ireland"
						},
						"@type": "Accommodation",
						additionalType: "Entire prop Special",
						numberOfBedrooms: "1",
						amenityFeature: [
							{
								"@type": "LocationFeatureSpecification",
								name: "occupancy",
								value: "1"
							}
						],
						additionalProperty: [
							{
								"@type": "PropertyValue",
								name: "Planning Permission",
								value: "Outstanding"
							}
						]
					}
				}
			}
		},
		{
			"@type": "Offer",
			priceCurrency: "EUR",
			itemOffered: {
				category: "Multiple units" as CategoryAsText,
				"@type": "GovernmentService",
				name: "STL Registration",
				isRelatedTo: {
					"@type": "Person",
					name: "Isabella Hanson",
					givenName: "Isabella",
					familyName: "Hanson",
					address: {
						"@type": "PostalAddress",
						streetAddress: "84 Milton Road",
						postalCode: "AAA 0006",
						addressLocality: "Reiciendis eum moles",
						addressRegion: "Donegal",
						addressCountry: "Ireland"
					},
					email: "raleso@mailinator.com",
					telephone: "+353851231234",
					worksFor: {
						"@type": "Organization",
						name: "All Human"
					},
					owns: {
						address: {
							"@type": "PostalAddress",
							streetAddress: "84 Milton Road",
							postalCode: "AAA 0006",
							addressLocality: "Reiciendis eum moles",
							addressRegion: "Donegal",
							addressCountry: "Ireland"
						},
						"@type": "LodgingBusiness",
						containsPlace: [
							{
								"@type": "Accommodation",
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
								"@type": "Accommodation",
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
								"@type": "Accommodation",
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
								"@type": "Accommodation",
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
						],
						additionalProperty: [
							{
								"@type": "PropertyValue",
								name: "Planning Permission",
								value: "Outstanding"
							}
						]
					}
				}
			}
		}
	],
	customer: {
		"@type": "Person",
		email: "QAtest01@parse.meetinireland.com",
		name: "QA test",
		telephone: "",
		identifier: [
			{
				"@type": "PropertyValue",
				propertyID: "B2C",
				valueReference: "https://fidigitalenterprisedps.b2clogin.com/6548f36a-b4b0-4666-9615-e4172baf2f4d/v2.0/",
				value: "e86b4ebd-1a38-4757-a225-30fc2a2fc0e3"
			}
		],
		worksFor: {
			"@type": "Organization",
			name: ""
		}
	},
	partOfInvoice: {
		"@type": "Invoice",
		totalPaymentDue: {
			"@type": "PriceSpecification",
			priceCurrency: "EUR"
		}
	}
};
