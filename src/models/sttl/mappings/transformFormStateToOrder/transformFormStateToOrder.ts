import { v1 as uuid } from "uuid";
import { UserAccount } from "models/global";
import { getOfferItem, getOwnerAddress, getOwns } from "./utils";
import { CATEGORY_AS_TEXT, CategoryAsText, FormState, OfferItem, Order } from "../../types";

export const transformFormStateToOrder = (formState: FormState, userAccount: UserAccount): Order => {
	const totalOffers = Object.values(formState?.["property_type"] || {}).length;
	if (totalOffers === 0 || !userAccount) return null;

	const acceptedOffer = [...Array(totalOffers)].reduce((acc, _, index) => {
		const { category } = formState["property_type"][index];
		const categoryAsText = CATEGORY_AS_TEXT[category] as CategoryAsText;
		const { firstName, lastName, emailAddress, telephone, businessName } = formState["property_owner_details"][index];
		const owns = getOwns(formState, index);
		const address = getOwnerAddress(formState, index);
		const offer = getOfferItem(firstName, lastName, owns, address, emailAddress, categoryAsText, telephone, businessName);
		acc.push(offer);
		return acc;
	}, []) as OfferItem[];

	const firstPropertyOwner = formState?.["property_owner_details"]?.[0];
	const nameFromFirstProperty = firstPropertyOwner ? `${firstPropertyOwner.firstName} ${firstPropertyOwner.lastName}` : "";
	const emailFromFirstProperty = firstPropertyOwner ? firstPropertyOwner.emailAddress : "";

	return {
		"@context": "https://schema.org",
		"@type": "Order",
		acceptedOffer,
		customer: {
			"@type": "Person",
			email: userAccount["email"] || emailFromFirstProperty || "",
			name: userAccount["name"]?.replace("@", "") || nameFromFirstProperty || "",
			telephone: "",
			identifier: [
				{
					"@type": "PropertyValue",
					propertyID: "B2C",
					valueReference: userAccount["provider"] || "",
					value: userAccount["id"] || ""
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

export const getOrderForCardPayment = (formState: FormState, userAccount: UserAccount): Order => transformFormStateToOrder(formState, userAccount);

export const getOrderForZeroPayment = (formState: FormState, userAccount: UserAccount) => {
	const order = transformFormStateToOrder(formState, userAccount);
	const orderNumber = uuid();
	const orderDate = new Date().toISOString();
	const orderStatus = "OrderDelivered";
	const totalPaymentDue = { ...order.partOfInvoice.totalPaymentDue, price: 0 };
	const acceptedOffer = order?.acceptedOffer?.map(offer => ({ ...offer, price: 0 }));
	const partOfInvoice = { ...order?.partOfInvoice, totalPaymentDue } || { "@type": "Invoice", totalPaymentDue };
	return { ...order, orderNumber, orderDate, orderStatus, acceptedOffer, partOfInvoice } as Order;
};
