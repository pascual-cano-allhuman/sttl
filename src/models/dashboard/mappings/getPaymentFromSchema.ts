import { Payment, Order } from "models/dashboard";

export const getPaymentFromSchema = (orderSchema: Order) => {
	if (!orderSchema?.partOfInvoice?.identifier) return;
	const {
		orderDate,
		orderStatus,
		id,
		partOfInvoice: { identifier, confirmationNumber }
	} = orderSchema;
	const invoiceUrl = `${process.env.MIDDLEWARE_PORTAL_ENDPOINT || ""}/document/sttlreceipt/${identifier}.pdf`;
	const invoiceDate = formatDate(orderDate);
	return { invoiceNumber: identifier, invoiceDate, invoiceUrl, confirmationNumber, orderStatus, id } as Payment;
};

const formatDate = (dateString: string) => {
	const timestamp = Date.parse(dateString);
	if (Number.isNaN(timestamp)) return "";
	const dateObject = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "numeric", day: "numeric" };
	return dateObject.toLocaleDateString("en-IE", options);
};
