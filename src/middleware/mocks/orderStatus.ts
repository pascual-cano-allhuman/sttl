export const orderStatus = {
	"odata.metadata": "https://stlogicdenteventsdev.table.core.windows.net/$metadata#eventlog/@Element",
	"odata.etag": "W/\"datetime'2023-01-03T08%3A47%3A30.9618373Z'\"",
	PartitionKey: "event-logs",
	RowKey: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
	Timestamp: "2023-01-03T08:47:30.9618373Z",
	correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
	created: "2023-01-03T08:47:30.9430645Z",
	modified: "2023-01-03T08:47:30.9430890Z",
	status: "Initialised",
	signals: [],
	subOperations: [
		{
			correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:310e8fd3-6267-4a6d-99f2-bbb6a2e4472c",
			signals: [
				{
					"odata.etag": "W/\"datetime'2023-01-03T08%3A47%3A23.7070126Z'\"",
					PartitionKey: "event-signals",
					RowKey: "1ca5f217-3da4-42b8-931f-5b7568323d6d:310e8fd3-6267-4a6d-99f2-bbb6a2e4472c-QnVzIC0gUGF5bWVudFNlcnZpY2UgLSBQYXltZW50Q29tcGxldGVkOlNUTCBSZWdpc3RyYXRpb24=",
					Timestamp: "2023-01-03T08:47:23.7070126Z",
					correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:310e8fd3-6267-4a6d-99f2-bbb6a2e4472c",
					created: "2023-01-03T08:47:23.5004126Z",
					data: {
						correlationid: "1ca5f217-3da4-42b8-931f-5b7568323d6d:310e8fd3-6267-4a6d-99f2-bbb6a2e4472c",
						message: {
							orderId: "3312c0c5-569a-4c67-8da3-fba01b9e89e3",
							customerId: "9dd4e7e1-9887-4ca4-ab58-5d300d7c51b5",
							status: "00"
						}
					},
					modified: "2023-01-03T08:47:23.5004326Z",
					name: "Bus - PaymentService - PaymentCompleted:STL Registration",
					rootCorrelationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
					status: "Complete",
					timeOfSignal: "2023-01-03T08:47:23.5004552Z"
				}
			]
		},
		{
			correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882",
			signals: [
				{
					"odata.etag": "W/\"datetime'2023-01-03T08%3A47%3A39.4169689Z'\"",
					PartitionKey: "event-signals",
					RowKey: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882-Q1JNIE93bmVyIFZlcmlmaWNhdGlvbg==",
					Timestamp: "2023-01-03T08:47:39.4169689Z",
					correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882",
					created: "2023-01-03T08:47:39.4006406Z",
					data: {
						contact: {
							fullName: "Pascual pascavi@gmail.com",
							id: "10518ad2-cd59-ed11-912f-005056a0ce81",
							sameAsCustomer: false
						}
					},
					modified: "2023-01-03T08:47:39.4006600Z",
					name: "CRM Owner Verification",
					rootCorrelationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
					status: "Complete",
					timeOfSignal: "2023-01-03T08:47:39.4006877Z"
				},
				{
					"odata.etag": "W/\"datetime'2023-01-03T08%3A47%3A41.021045Z'\"",
					PartitionKey: "event-signals",
					RowKey: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882-Q1JNIENvbnRhY3QgVmVyaWZpY2F0aW9u",
					Timestamp: "2023-01-03T08:47:41.021045Z",
					correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882",
					created: "2023-01-03T08:47:41.0048293Z",
					data: {
						contact: {
							fullName: "Pascual pascavi@gmail.com",
							id: "10518ad2-cd59-ed11-912f-005056a0ce81"
						}
					},
					modified: "2023-01-03T08:47:41.0048479Z",
					name: "CRM Contact Verification",
					rootCorrelationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
					status: "Complete",
					timeOfSignal: "2023-01-03T08:47:41.0048713Z"
				},
				{
					"odata.etag": "W/\"datetime'2023-01-03T08%3A47%3A52.7073169Z'\"",
					PartitionKey: "event-signals",
					RowKey: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882-Q1JNIFBheW1lbnQgU2F2ZWQ=",
					Timestamp: "2023-01-03T08:47:52.7073169Z",
					correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882",
					created: "2023-01-03T08:47:52.6992427Z",
					data: {
						entity: {
							statecode: 0,
							statuscode: 1,
							new_name: "STL Registration - 021631-20",
							new_amount_base: 27,
							new_amount: 27,
							new_paymentdate: "2023-01-03T08:47:42",
							exchangerate: 1,
							createdon: "2023-01-03T08:47:42",
							ergo_numberofpaymentitems_date: "2023-01-03T08:47:42",
							"transactioncurrencyid@odata.bind": "/transactioncurrencies(6554ad4c-c736-e611-80ca-005056a72ee4)",
							"new_PaymentStageId@odata.bind": "/new_paymentstages(f990426e-d3fb-e511-80cb-00155d1369a1)",
							ergo_paymentrecipient: "pascual@allhuman.com",
							ergo_billing_address1_line1: "1 North Circular Road",
							ergo_billing_address1_postalcode: "D07 H1W9",
							"ergo_billing_countryid@odata.bind": "/new_countries(1b0360a3-fd36-e611-80ca-005056a72ee4)",
							ergo_numberofpaymentitems_state: 1,
							"new_PaymentType@odata.bind": "new_paymenttypes(fd9b64d3-4f33-ed11-912a-005056a090e6)",
							"new_PaymentMethodId@odata.bind": "new_paymentmethods(72cbdeec-59ec-e511-80cb-00155d1369a1)",
							new_new_payment_new_paymentitem: [
								{
									ergo_priceafterdiscount: 0,
									ergo_priceafterdiscount_base: 0,
									statuscode: 1,
									new_paid_amount_base: 0,
									exchangerate: 1,
									statecode: 0,
									new_amount_base: 0,
									new_vatamount: 0,
									new_vatamount_base: 0,
									new_vat_pct: 23,
									ergo_discountamount: 0,
									ergo_discountamount_base: 0,
									"transactioncurrencyid@odata.bind": "/transactioncurrencies(6554ad4c-c736-e611-80ca-005056a72ee4)",
									"new_ProductId@odata.bind": "/products(f5931f80-4f50-ed11-912c-005056a090e6)"
								}
							]
						}
					},
					modified: "2023-01-03T08:47:52.6992785Z",
					name: "CRM Payment Saved",
					rootCorrelationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
					status: "Complete",
					timeOfSignal: "2023-01-03T08:47:52.6993163Z"
				},
				{
					"odata.etag": "W/\"datetime'2023-01-03T08%3A47%3A24.5435335Z'\"",
					PartitionKey: "event-signals",
					RowKey: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882-QnVzIC0gUGF5bWVudFNlcnZpY2UgLSBPcmRlckRlbGl2ZXJlZDpTVEwgUmVnaXN0cmF0aW9u",
					Timestamp: "2023-01-03T08:47:24.5435335Z",
					correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882",
					created: "2023-01-03T08:47:24.5337719Z",
					data: {
						correlationid: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882",
						message: {
							"@context": "https://schema.org",
							"@type": "Order",
							acceptedOffer: [
								{
									"@type": "Offer",
									id: "eaf166e5-1935-46bf-8a33-6c4414a24dbe",
									price: 27,
									priceCurrency: "EUR",
									itemOffered: {
										"@type": "GovernmentService",
										name: "STL Registration",
										isRelatedTo: {
											"@type": "Person",
											name: "Pascual pascavi@gmail.com",
											email: "pascual@allhuman.com",
											telephone: null,
											address: {
												"@type": "PostalAddress",
												streetAddress: "1 North Circular Road",
												postalCode: "D07 H1W9",
												addressLocality: "Dublin 7",
												addressRegion: "Dublin",
												addressCountry: "Ireland"
											},
											owns: {
												"@type": "House",
												additionalType: null,
												address: {
													"@type": "PostalAddress",
													streetAddress: "1 North Circular Road",
													postalCode: "D07 H1W9",
													addressLocality: "Dublin 7",
													addressRegion: "Dublin",
													addressCountry: "Republic of Ireland"
												},
												geo: null,
												numberOfBedrooms: 0,
												amenityFeature: null,
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
													}
												],
												additionalProperty: null
											},
											worksFor: null
										}
									}
								}
							],
							billingAddress: {
								"@type": "PostalAddress",
								streetAddress: "1 North Circular Road",
								postalCode: "D07 H1W9",
								addressLocality: "Dublin 7",
								addressRegion: "",
								addressCountry: "Ireland"
							},
							confirmationNumber: "12345",
							customer: {
								"@type": "Person",
								email: "pascual@allhuman.com",
								name: "Pascual pascavigmail.com",
								telephone: "",
								identifier: [
									{
										"@type": "PropertyValue",
										propertyID: "B2C",
										value: "9dd4e7e1-9887-4ca4-ab58-5d300d7c51b5"
									}
								],
								worksFor: null
							},
							orderDate: "1/3/2023 8:46:53 AM",
							orderNumber: "3312c0c5-569a-4c67-8da3-fba01b9e89e3",
							orderStatus: "OrderDelivered",
							partOfInvoice: {
								"@type": "Invoice",
								totalPaymentDue: {
									"@type": "PriceSpecification",
									price: 27,
									priceCurrency: "EUR"
								},
								confirmationNumber: "12345",
								paymentStatus: "Authorized",
								paymentMethod: null
							}
						}
					},
					modified: "2023-01-03T08:47:24.5338291Z",
					name: "Bus - PaymentService - OrderDelivered:STL Registration",
					rootCorrelationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
					status: "Complete",
					timeOfSignal: "2023-01-03T08:47:24.5338541Z"
				},
				{
					"odata.etag": "W/\"datetime'2023-01-03T08%3A47%3A33.9001451Z'\"",
					PartitionKey: "event-signals",
					RowKey: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882-T3JkZXIgUHJvcGVydGllcyBTYXZlZA==",
					Timestamp: "2023-01-03T08:47:33.9001451Z",
					correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882",
					created: "2023-01-03T08:47:33.8918051Z",
					data: {
						document: {
							"@context": "https://schema.org",
							"@type": "Order",
							acceptedOffer: [
								{
									"@type": "Offer",
									id: "eaf166e5-1935-46bf-8a33-6c4414a24dbe",
									price: 27,
									priceCurrency: "EUR",
									itemOffered: {
										"@type": "GovernmentService",
										name: "STL Registration",
										isRelatedTo: {
											"@type": "Person",
											name: "Pascual pascavi@gmail.com",
											email: "pascual@allhuman.com",
											telephone: null,
											address: {
												"@type": "PostalAddress",
												streetAddress: "1 North Circular Road",
												postalCode: "D07 H1W9",
												addressLocality: "Dublin 7",
												addressRegion: "Dublin",
												addressCountry: "Ireland"
											},
											owns: {
												"@type": "House",
												additionalType: null,
												address: {
													"@type": "PostalAddress",
													streetAddress: "1 North Circular Road",
													postalCode: "D07 H1W9",
													addressLocality: "Dublin 7",
													addressRegion: "Dublin",
													addressCountry: "Republic of Ireland"
												},
												geo: null,
												numberOfBedrooms: 0,
												amenityFeature: null,
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
													}
												],
												additionalProperty: null,
												identifier: [
													{
														"@type": "LocationFeatureSpecification",
														propertyId: "STTLNumber",
														value: "STL79603-02012024",
														valueReference: "Active",
														validFrom: "2023-01-03",
														validThrough: "2024-01-02"
													}
												]
											},
											worksFor: null
										}
									}
								}
							],
							billingAddress: {
								"@type": "PostalAddress",
								streetAddress: "1 North Circular Road",
								postalCode: "D07 H1W9",
								addressLocality: "Dublin 7",
								addressRegion: "",
								addressCountry: "Ireland"
							},
							confirmationNumber: "12345",
							customer: {
								"@type": "Person",
								email: "pascual@allhuman.com",
								name: "Pascual pascavigmail.com",
								telephone: "",
								identifier: [
									{
										"@type": "PropertyValue",
										propertyID: "B2C",
										value: "9dd4e7e1-9887-4ca4-ab58-5d300d7c51b5"
									}
								],
								worksFor: null
							},
							orderDate: "1/3/2023 8:46:53 AM",
							orderNumber: "3312c0c5-569a-4c67-8da3-fba01b9e89e3",
							orderStatus: "OrderDelivered",
							partOfInvoice: {
								"@type": "Invoice",
								totalPaymentDue: {
									"@type": "PriceSpecification",
									price: 27,
									priceCurrency: "EUR"
								},
								confirmationNumber: "12345",
								paymentStatus: "Authorized",
								paymentMethod: null
							},
							id: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882",
							_meta: {
								customer: {
									id: "9dd4e7e1-9887-4ca4-ab58-5d300d7c51b5"
								},
								relationships: []
							}
						},
						status: "Created"
					},
					modified: "2023-01-03T08:47:33.8918603Z",
					name: "Order Properties Saved",
					rootCorrelationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
					status: "Complete",
					timeOfSignal: "2023-01-03T08:47:33.8918942Z"
				},
				{
					"odata.etag": "W/\"datetime'2023-01-03T08%3A47%3A44.2931615Z'\"",
					PartitionKey: "event-signals",
					RowKey: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882-U1RMIFJlY2VpcHQgR2VuZXJhdGlvbg==",
					Timestamp: "2023-01-03T08:47:44.2931615Z",
					correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882",
					created: "2023-01-03T08:47:44.2757397Z",
					data: {
						correlationid: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882",
						customerEmail: "pascual@allhuman.com",
						customerName: "Pascual pascavigmail.com",
						invoiceFileName: "024378d5-9c68-47af-be80-64f8f24a25d9.pdf",
						invoiceNumber: "024378d5-9c68-47af-be80-64f8f24a25d9",
						invoiceUrl: "https://failteirelanddev.azure-api.net/portal/v1/document/sttlreceipt/024378d5-9c68-47af-be80-64f8f24a25d9.pdf"
					},
					modified: "2023-01-03T08:47:44.2757601Z",
					name: "STL Receipt Generation",
					rootCorrelationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
					status: "Complete",
					timeOfSignal: "2023-01-03T08:47:44.2757859Z"
				},
				{
					"odata.etag": "W/\"datetime'2023-01-03T08%3A47%3A31.5754828Z'\"",
					PartitionKey: "event-signals",
					RowKey: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882-U2F2ZSBPcmRlcg==",
					Timestamp: "2023-01-03T08:47:31.5754828Z",
					correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882",
					created: "2023-01-03T08:47:31.5679920Z",
					data: {
						document: {
							"@context": "https://schema.org",
							"@type": "Order",
							acceptedOffer: [
								{
									"@type": "Offer",
									id: "eaf166e5-1935-46bf-8a33-6c4414a24dbe",
									price: 27,
									priceCurrency: "EUR",
									itemOffered: {
										"@type": "GovernmentService",
										name: "STL Registration",
										isRelatedTo: {
											"@type": "Person",
											name: "Pascual pascavi@gmail.com",
											email: "pascual@allhuman.com",
											telephone: null,
											address: {
												"@type": "PostalAddress",
												streetAddress: "1 North Circular Road",
												postalCode: "D07 H1W9",
												addressLocality: "Dublin 7",
												addressRegion: "Dublin",
												addressCountry: "Ireland"
											},
											owns: {
												"@type": "House",
												additionalType: null,
												address: {
													"@type": "PostalAddress",
													streetAddress: "1 North Circular Road",
													postalCode: "D07 H1W9",
													addressLocality: "Dublin 7",
													addressRegion: "Dublin",
													addressCountry: "Republic of Ireland"
												},
												geo: null,
												numberOfBedrooms: 0,
												amenityFeature: null,
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
													}
												],
												additionalProperty: null,
												identifier: [
													{
														"@type": "LocationFeatureSpecification",
														propertyId: "STTLNumber",
														value: "STL79603-02012024",
														valueReference: "Active",
														validFrom: "2023-01-03",
														validThrough: "2024-01-02"
													}
												]
											},
											worksFor: null
										}
									}
								}
							],
							billingAddress: {
								"@type": "PostalAddress",
								streetAddress: "1 North Circular Road",
								postalCode: "D07 H1W9",
								addressLocality: "Dublin 7",
								addressRegion: "",
								addressCountry: "Ireland"
							},
							confirmationNumber: "12345",
							customer: {
								"@type": "Person",
								email: "pascual@allhuman.com",
								name: "Pascual pascavigmail.com",
								telephone: "",
								identifier: [
									{
										"@type": "PropertyValue",
										propertyID: "B2C",
										value: "9dd4e7e1-9887-4ca4-ab58-5d300d7c51b5"
									}
								],
								worksFor: null
							},
							orderDate: "1/3/2023 8:46:53 AM",
							orderNumber: "3312c0c5-569a-4c67-8da3-fba01b9e89e3",
							orderStatus: "OrderDelivered",
							partOfInvoice: {
								"@type": "Invoice",
								totalPaymentDue: {
									"@type": "PriceSpecification",
									price: 27,
									priceCurrency: "EUR"
								},
								confirmationNumber: "12345",
								paymentStatus: "Authorized",
								paymentMethod: null
							},
							id: "1ca5f217-3da4-42b8-931f-5b7568323d6d:5795faec-4b4c-475a-92a4-7295301ef882",
							_meta: {
								customer: {
									id: "9dd4e7e1-9887-4ca4-ab58-5d300d7c51b5"
								},
								relationships: []
							}
						},
						status: "Created"
					},
					modified: "2023-01-03T08:47:31.5680459Z",
					name: "Save Order",
					rootCorrelationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
					status: "Complete",
					timeOfSignal: "2023-01-03T08:47:31.5680703Z"
				}
			]
		},
		{
			correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:bbad8f76-655f-4d3d-8720-70dc2c25ef80",
			signals: [
				{
					"odata.etag": "W/\"datetime'2023-01-03T08%3A47%3A25.0872176Z'\"",
					PartitionKey: "event-signals",
					RowKey: "1ca5f217-3da4-42b8-931f-5b7568323d6d:bbad8f76-655f-4d3d-8720-70dc2c25ef80-QnVzIC0gUGF5bWVudFNlcnZpY2UgLSBPZmZlckFjY2VwdGVkOlNUTCBSZWdpc3RyYXRpb24=",
					Timestamp: "2023-01-03T08:47:25.0872176Z",
					correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:bbad8f76-655f-4d3d-8720-70dc2c25ef80",
					created: "2023-01-03T08:47:25.0795222Z",
					data: {
						correlationid: "1ca5f217-3da4-42b8-931f-5b7568323d6d:bbad8f76-655f-4d3d-8720-70dc2c25ef80",
						message: {
							"@type": "Offer",
							id: "eaf166e5-1935-46bf-8a33-6c4414a24dbe",
							price: 27,
							priceCurrency: "EUR",
							itemOffered: {
								"@type": "GovernmentService",
								name: "STL Registration",
								isRelatedTo: {
									"@type": "Person",
									name: "Pascual pascavi@gmail.com",
									email: "pascual@allhuman.com",
									telephone: null,
									address: {
										"@type": "PostalAddress",
										streetAddress: "1 North Circular Road",
										postalCode: "D07 H1W9",
										addressLocality: "Dublin 7",
										addressRegion: "Dublin",
										addressCountry: "Ireland"
									},
									owns: {
										"@type": "House",
										additionalType: null,
										address: {
											"@type": "PostalAddress",
											streetAddress: "1 North Circular Road",
											postalCode: "D07 H1W9",
											addressLocality: "Dublin 7",
											addressRegion: "Dublin",
											addressCountry: "Republic of Ireland"
										},
										geo: null,
										numberOfBedrooms: 0,
										amenityFeature: null,
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
											}
										],
										additionalProperty: null
									},
									worksFor: null
								}
							}
						}
					},
					modified: "2023-01-03T08:47:25.0795678Z",
					name: "Bus - PaymentService - OfferAccepted:STL Registration",
					rootCorrelationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
					status: "Complete",
					timeOfSignal: "2023-01-03T08:47:25.0795938Z"
				}
			]
		},
		{
			correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:eaf166e5-1935-46bf-8a33-6c4414a24dbe",
			signals: [
				{
					"odata.etag": "W/\"datetime'2023-01-03T08%3A47%3A52.8082594Z'\"",
					PartitionKey: "event-signals",
					RowKey: "1ca5f217-3da4-42b8-931f-5b7568323d6d:eaf166e5-1935-46bf-8a33-6c4414a24dbe-Q1JNIEVudGl0eSBDcmVhdGlvbg==",
					Timestamp: "2023-01-03T08:47:52.8082594Z",
					correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:eaf166e5-1935-46bf-8a33-6c4414a24dbe",
					created: "2023-01-03T08:47:52.7920250Z",
					data: {
						crmRegistrationId: "94e61849-438b-ed11-9131-a22bddc31b4f",
						status: "Created"
					},
					modified: "2023-01-03T08:47:52.7920431Z",
					name: "CRM Entity Creation",
					rootCorrelationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
					status: "Complete",
					timeOfSignal: "2023-01-03T08:47:52.7920686Z"
				},
				{
					"odata.etag": "W/\"datetime'2023-01-03T08%3A47%3A26.7482617Z'\"",
					PartitionKey: "event-signals",
					RowKey: "1ca5f217-3da4-42b8-931f-5b7568323d6d:eaf166e5-1935-46bf-8a33-6c4414a24dbe-U1RMIENvZGUgR2VuZXJhdGlvbg==",
					Timestamp: "2023-01-03T08:47:26.7482617Z",
					correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:eaf166e5-1935-46bf-8a33-6c4414a24dbe",
					created: "2023-01-03T08:47:26.7404039Z",
					data: {
						number: "STL79603-02012024",
						validFrom: "2023-01-03",
						validTo: "2024-01-02",
						valueReference: "Active"
					},
					modified: "2023-01-03T08:47:26.7404341Z",
					name: "STL Code Generation",
					rootCorrelationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
					status: "Complete",
					timeOfSignal: "2023-01-03T08:47:26.7404576Z"
				},
				{
					"odata.etag": "W/\"datetime'2023-01-03T08%3A47%3A35.6261509Z'\"",
					PartitionKey: "event-signals",
					RowKey: "1ca5f217-3da4-42b8-931f-5b7568323d6d:eaf166e5-1935-46bf-8a33-6c4414a24dbe-U2F2ZSBQcm9wZXJ0eQ==",
					Timestamp: "2023-01-03T08:47:35.6261509Z",
					correlationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d:eaf166e5-1935-46bf-8a33-6c4414a24dbe",
					created: "2023-01-03T08:47:35.6171459Z",
					data: {
						document: {
							"@type": "House",
							additionalType: null,
							address: {
								"@type": "PostalAddress",
								streetAddress: "1 North Circular Road",
								postalCode: "D07 H1W9",
								addressLocality: "Dublin 7",
								addressRegion: "Dublin",
								addressCountry: "Republic of Ireland"
							},
							geo: null,
							numberOfBedrooms: 0,
							amenityFeature: null,
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
								}
							],
							additionalProperty: null,
							identifier: [
								{
									"@type": "LocationFeatureSpecification",
									propertyId: "STTLNumber",
									value: "STL79603-02012024",
									valueReference: "Active",
									validFrom: "2023-01-03",
									validThrough: "2024-01-02"
								}
							],
							id: "3dcf1027-fd57-4800-a91f-1f293bdb516a",
							_meta: {
								customer: {
									id: "9dd4e7e1-9887-4ca4-ab58-5d300d7c51b5"
								}
							},
							contactPoint: [
								{
									"@type": ["Person", "ContactPoint"],
									name: "Pascual pascavi@gmail.com",
									email: "pascual@allhuman.com",
									telephone: null,
									address: {
										"@type": "PostalAddress",
										streetAddress: "1 North Circular Road",
										postalCode: "D07 H1W9",
										addressLocality: "Dublin 7",
										addressRegion: "Dublin",
										addressCountry: "Ireland"
									},
									worksFor: null,
									contactType: "Owner"
								}
							]
						},
						status: "Created"
					},
					modified: "2023-01-03T08:47:35.6171879Z",
					name: "Save Property",
					rootCorrelationId: "1ca5f217-3da4-42b8-931f-5b7568323d6d",
					status: "Complete",
					timeOfSignal: "2023-01-03T08:47:35.6172137Z"
				}
			]
		}
	]
};
