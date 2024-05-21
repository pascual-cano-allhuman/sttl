import { v1 as uuid } from "uuid";
import { CATEGORY_AS_TEXT, CategoryAsText, UserAccount, OrderSchema, getSchemaFromProperty } from "models/global";
import { FormState } from "../../types";
import { getPropertiesFromForm } from "../form";

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
	const propertiesList = getPropertiesFromForm(formState);
	if (propertiesList.length === 0) return null;
	const acceptedOffer = propertiesList.map(property => {
		const { category } = property;
		const categoryAsText = CATEGORY_AS_TEXT[category] as CategoryAsText;
		const { accommodationSchema, ownerSchema } = getSchemaFromProperty(property);

		return {
			"@type": "Offer",
			priceCurrency: "EUR",
			itemOffered: {
				"@type": "GovernmentService",
				category: categoryAsText,
				name: "STL Registration",
				isRelatedTo: { ...ownerSchema, owns: accommodationSchema }
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
