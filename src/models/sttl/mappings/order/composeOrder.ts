import { v1 as uuid } from "uuid";
import { CATEGORY_AS_TEXT, CategoryAsText, UserAccount, AddressSchema, OrderSchema } from "models/global";
import { FormState, PropertyData } from "../../types";
import { composeAccommodation } from "../accommodation";

export const getOrderForCardPayment = (formState: FormState, userAccount: UserAccount): OrderSchema => composeOrder(formState, userAccount);

export const getOrderForZeroPayment = (formState: FormState, userAccount: UserAccount) => {
	const order = composeOrder(formState, userAccount);
	const orderNumber = uuid();
	const orderDate = new Date().toISOString();
	const orderStatus = "OrderDelivered";
	const totalPaymentDue = { ...order.partOfInvoice.totalPaymentDue, price: 0 };
	const acceptedOffer = order?.acceptedOffer?.map(offer => ({ ...offer, price: 0 }));
	const partOfInvoice = { ...order?.partOfInvoice, totalPaymentDue } || { "@type": "Invoice", totalPaymentDue };
	return { ...order, orderNumber, orderDate, orderStatus, acceptedOffer, partOfInvoice } as OrderSchema;
};

export const composeOrder = (formState: FormState, userAccount?: UserAccount): OrderSchema => {
	const propertiesList = getPropertiesList(formState);
	if (propertiesList.length === 0) return null;

	const acceptedOffer = propertiesList.map(property => {
		const { category } = property.propertyType;
		const categoryAsText = CATEGORY_AS_TEXT[category] as CategoryAsText;
		const accommodation = composeAccommodation(property);
		const owner = getOwner(property);
		return {
			"@type": "Offer",
			priceCurrency: "EUR",
			itemOffered: {
				"@type": "GovernmentService",
				category: categoryAsText,
				name: "STL Registration",
				isRelatedTo: { ...owner, owns: accommodation }
			}
		};
	});
	const firstPropertyOwner = formState?.["propertyOwner"]?.[0];
	const nameFromFirstProperty = firstPropertyOwner ? `${firstPropertyOwner.firstName} ${firstPropertyOwner.lastName}` : "";
	const emailFromFirstProperty = firstPropertyOwner ? firstPropertyOwner.emailAddress : "";

	return {
		"@context": "https://schema.org",
		"@type": "Order",
		acceptedOffer,
		customer: {
			"@type": "Person",
			email: userAccount?.email || emailFromFirstProperty || "",
			name: userAccount?.name?.replace("@", "") || nameFromFirstProperty || "",
			telephone: "",
			identifier: [
				{
					"@type": "PropertyValue",
					propertyID: "B2C",
					valueReference: userAccount?.provider || "",
					value: userAccount?.id || ""
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
};

export const getPropertiesList = (formState: FormState) => {
	if (!formState) return [];
	const total = formState.propertyOwner?.length || 0;
	const list = [];
	for (let i = 0; i < total; i++) {
		const property = {
			propertyType: formState.propertyType[i],
			statutoryObligations: formState.statutoryObligations[i],
			propertyAddress: formState.propertyAddress[i],
			propertyOwner: formState.propertyOwner[i]
		};
		list.push(property);
	}
	return list as PropertyData[];
};

export const getOwner = (property: PropertyData) => {
	const { firstName, lastName, emailAddress, telephone, businessName } = property.propertyOwner;
	const ownerAddress = property.propertyOwner.ownerAddress || property.propertyAddress.propertyAddress;
	const ownerCountry = property.propertyOwner.countryOfResidence;
	return {
		"@type": "Person",
		name: `${firstName} ${lastName}`,
		givenName: firstName,
		familyName: lastName,
		address: getPostalAddress(ownerAddress, ownerCountry),
		email: emailAddress,
		telephone,
		worksFor: {
			"@type": "Organization",
			name: businessName || ""
		}
	};
};

export const getPostalAddress = (addressInput: any, countryOfResidence: string): AddressSchema => {
	const address = { "@type": "PostalAddress" } as AddressSchema;
	const streetAddressParts = [addressInput.addressLine1, addressInput.addressLine2, addressInput.addressLine3].filter(Boolean);
	address.streetAddress = streetAddressParts.join(", ");
	address.postalCode = addressInput.postcode || addressInput.postcode;
	address.addressLocality = addressInput.town;
	address.addressRegion = addressInput.county?.replace(/^co. /i, "");
	address.addressCountry = countryOfResidence;
	return address;
};
