export type Payment = {
	invoiceNumber: string;
	invoiceDate: string;
	invoiceUrl: string;
	orderStatus: string;
	id: string;
};

export type Order = {
	"@context"?: "https://schema.org" | string;
	"@type"?: "Order" | string;
	id?: string;
	partOfInvoice?: {
		"@type"?: "Invoice";
		totalPaymentDue?: {
			"@type": "PriceSpecification";
			price?: number;
			priceCurrency: string;
		};
		confirmationNumber?: string;
		identifier?: string;
	};
	orderNumber?: string;
	orderDate?: string;
	orderStatus?: string;
};
