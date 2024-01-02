import { getFeesFromOrder } from "./getFeesFromOrder";
import { order } from "../mocks";
import { Order } from "../../types";

describe("get payment fees", () => {
	it("should get undefined when there is no accepted offer", () => {
		const { subtotals, total } = getFeesFromOrder();
		expect(subtotals).toBe(undefined);
		expect(total).toBe(undefined);
	});

	it("should get payment fees for accepted offer", () => {
		const orderWithFees = appendFakeFees(order) as Order;
		const { subtotals, total } = getFeesFromOrder(orderWithFees);
		expect(subtotals).toEqual({
			rooms: 200,
			fullProperty: 200,
			units: 200
		});
		expect(total).toBe(1000);
	});
});

const appendFakeFees = (order: Order): object => {
	return {
		...order,
		acceptedOffer: order?.acceptedOffer.map(item => ({ ...item, price: 100 })),
		partOfInvoice: {
			...order?.partOfInvoice,
			totalPaymentDue: {
				...order?.partOfInvoice?.totalPaymentDue,
				price: 1000
			}
		}
	};
};
