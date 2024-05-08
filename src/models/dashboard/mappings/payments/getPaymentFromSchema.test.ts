import { getPaymentFromSchema } from "./getPaymentFromSchema";

describe("getPaymentFromSchema", () => {
	it("returns the payment object with invoice details", () => {
		const orderSchema = {
			orderDate: "2024-01-01T00:00:00.000Z",
			orderStatus: "Pending",
			id: "123456",
			partOfInvoice: {
				identifier: "INV-123",
				confirmationNumber: "CONF-456"
			}
		};
		const token = "TOKEN123";

		const actual = getPaymentFromSchema(orderSchema, token);

		const expected = {
			invoiceNumber: "INV-123",
			invoiceDate: "1/1/2024",
			invoiceUrl: "/document/sttlreceipt/INV-123.pdf?authorization=TOKEN123",
			confirmationNumber: "CONF-456",
			orderStatus: "Pending",
			id: "123456"
		};

		expect(actual).toEqual(expected);
	});

	it("returns undefined if orderSchema is not provided", () => {
		const token = "TOKEN123";
		const actual = getPaymentFromSchema(undefined, token);
		expect(actual).toBeUndefined();
	});
});
