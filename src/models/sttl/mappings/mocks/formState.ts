import { Category, FormState, PermissionStatus } from "../../types";

export const formState: FormState = {
	property_type: [
		{
			category: "room" as Category,
			room: {
				propertyType: "House",
				numberOfSharedRooms: 1,
				numberOfGuestsInSharedRooms: 1,
				numberOfPrivateRooms: 1,
				numberOfGuestsInPrivateRooms: 1
			}
		},
		{
			category: "fullProperty" as Category,
			fullProperty: {
				propertyType: "Apartment / Flat",
				numberOfBedrooms: 1,
				numberOfGuests: 1
			}
		},
		{
			category: "units" as Category,
			units: [{ propertyType: "Hostel", noOfGuests: 1 }]
		},
		{
			category: "room" as Category,
			room: {
				propertyType: "Other - specify",
				customPropertyType: "Room Special",
				numberOfSharedRooms: 1,
				numberOfGuestsInSharedRooms: 1,
				numberOfPrivateRooms: 1,
				numberOfGuestsInPrivateRooms: 1
			}
		},
		{
			category: "fullProperty" as Category,
			fullProperty: {
				propertyType: "Other - specify",
				customPropertyType: "Entire prop Special",
				numberOfBedrooms: 1,
				numberOfGuests: 1
			}
		},
		{
			category: "units" as Category,
			units: [
				{ propertyType: "Activity or adventure centre", noOfGuests: 2, noOfRooms: 1 },
				{ propertyType: "Hostel", noOfGuests: 2 },
				{ propertyType: "Apartments - student accommodation", noOfGuests: 2, noOfOwnDoorUnits: 1 },
				{ propertyType: "Other - specify", customPropertyType: "Multiple Other Special", noOfGuests: 2, number: 1 }
			]
		}
	],
	statutory_obligations: [
		{
			permissionStatus: PermissionStatus.have
		},
		{
			permissionStatus: PermissionStatus.have
		},
		{
			permissionStatus: PermissionStatus.will_have
		},
		{
			permissionStatus: PermissionStatus.have
		},
		{
			permissionStatus: PermissionStatus.will_have
		},
		{
			permissionStatus: PermissionStatus.will_have
		}
	],
	property_address: [
		{
			propertyAddress: {
				addressLine1: "532 West Rocky Milton Freeway",
				addressLine2: "",
				addressLine3: "",
				town: "Aut molestiae nihil",
				postcode: "AAA 0001",
				county: "Co. Cavan"
			}
		},
		{
			propertyAddress: {
				addressLine1: "634 New Freeway",
				addressLine2: "",
				addressLine3: "",
				town: "Corrupti fugiat ad",
				postcode: "AAA 0002",
				county: "Co. Carlow"
			}
		},
		{
			propertyAddress: {
				addressLine1: "740 Rocky Clarendon Avenue",
				addressLine2: "",
				addressLine3: "",
				town: "Ut consequat Saepe ",
				postcode: "AAA 0003",
				county: "Co. Cork"
			}
		},
		{
			propertyAddress: {
				addressLine1: "84 West Rocky Oak Street",
				addressLine2: "",
				addressLine3: "",
				town: "Vitae adipisci non t",
				postcode: "AAA 0004",
				county: "Co. Clare"
			}
		},
		{
			propertyAddress: {
				addressLine1: "80 Cowley Avenue",
				addressLine2: "",
				addressLine3: "",
				town: "Consequatur Ut dign",
				postcode: "AAA 0005",
				county: "Co. Cork"
			}
		},
		{
			propertyAddress: {
				addressLine1: "84 Milton Road",
				addressLine2: "",
				addressLine3: "",
				town: "Reiciendis eum moles",
				postcode: "AAA 0006",
				county: "Co. Donegal"
			}
		}
	],
	property_owner_details: [
		{
			countryOfResidence: "Ireland",
			firstName: "Cruz",
			lastName: "Obrien",
			emailAddress: "kekyzo@mailinator.com",
			telephone: "+353851231234",
			businessName: "All Human",
			isAddressSameAsStlProperty: false,
			ownerAddress: {
				addressLine1: "653 White Hague Extension",
				addressLine2: "",
				addressLine3: "",
				town: "Aut molestiae nihil ",
				postcode: "AAA 0000",
				county: "Co. Clare"
			}
		},
		{
			countryOfResidence: "Ireland",
			firstName: "Herman",
			lastName: "Dunlap",
			emailAddress: "pakicihi@mailinator.com",
			telephone: "+353851231234",
			businessName: "All Human",
			isAddressSameAsStlProperty: true
		},
		{
			countryOfResidence: "American Samoa",
			firstName: "Ian",
			lastName: "Barron",
			emailAddress: "mejeqyhal@mailinator.com",
			telephone: "+353851231234",
			businessName: "All Human",
			isAddressSameAsStlProperty: false,
			ownerAddress: {
				addressLine1: "Samoa West Avenue",
				addressLine2: "",
				addressLine3: "",
				town: "Pago Pago",
				postcode: "ZIP 0000",
				county: "Maoputasi County"
			}
		},
		{
			countryOfResidence: "Ireland",
			firstName: "Minerva",
			lastName: "Newman",
			emailAddress: "nove@mailinator.com",
			telephone: "+353851231234",
			businessName: "All Human",
			isAddressSameAsStlProperty: true
		},
		{
			countryOfResidence: "Ireland",
			firstName: "Blake",
			lastName: "Meadows",
			emailAddress: "vowuraqozo@mailinator.com",
			telephone: "+353851231234",
			businessName: "All Human",
			isAddressSameAsStlProperty: true
		},
		{
			countryOfResidence: "Ireland",
			firstName: "Isabella",
			lastName: "Hanson",
			emailAddress: "raleso@mailinator.com",
			telephone: "+353851231234",
			businessName: "All Human",
			isAddressSameAsStlProperty: true
		}
	]
};
