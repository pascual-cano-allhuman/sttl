import * as uuid from "uuid";
import { getOrderForCardPayment, getOrderForZeroPayment, composeOrder } from "./composeOrder";
import { userAccount, formState, order } from "../mocks";
import { FormState } from "../../types";

jest.mock("uuid");
describe("composeOrder", () => {
	it("should return null if no offers in formState", () => {
		const emptyFormState = { property_type: {} } as FormState;
		const result = composeOrder(emptyFormState, userAccount);
		expect(result).toBeNull();
	});

	it("should return a valid Order object when both formState and userAccount are provided", () => {
		const result = composeOrder(formState, userAccount);
		expect(result).toBeDefined();
		expect(result["@type"]).toBe("Order");
	});

	it("composes and order from an formState", () => {
		const result = composeOrder(formState, userAccount);
		expect(result).toEqual(order);
	});

	it("should return a valid Order object with correct customer name when userAccount has no name", () => {
		const accountDataWithoutName = { email: "johndoe@example.com", id: "12345", provider: "Google" };
		const result = composeOrder(formState, accountDataWithoutName);
		expect(result).toBeDefined();
		expect(result.customer.name).toBe("Cruz Obrien");
	});

	it("should return a valid Order object with correct customer identifier when userAccount is missing provider and id", () => {
		const accountDataWithoutProviderAndId = { email: "johndoe@example.com", name: "John Doe" };
		const result = composeOrder(formState, accountDataWithoutProviderAndId);
		expect(result).toBeDefined();
		expect(result.customer.identifier[0].valueReference).toBe("");
		expect(result.customer.identifier[0].value).toBe("");
	});

	it("should return a valid Order object with correct customer worksFor when userAccount has no organization name", () => {
		const accountDataWithoutOrganization = { email: "johndoe@example.com", name: "John Doe", id: "12345", provider: "Google" };
		const result = composeOrder(formState, accountDataWithoutOrganization);
		expect(result).toBeDefined();
		expect(result.customer.worksFor.name).toBe("");
	});
});

describe("getOrderForCardPayment", () => {
	it("result for getOrderForCardPayment should be same as result from transformFormStateToOrder", () => {
		const getOrderForCardPaymentResult = getOrderForCardPayment(formState, userAccount);
		const transformFormStateToOrderResult = composeOrder(formState, userAccount);
		expect(getOrderForCardPaymentResult).toEqual(transformFormStateToOrderResult);
	});
});

describe("getOrderForZeroPayment", () => {
	beforeAll(() => {
		const fixedDate = new Date("2023-01-01:00:00:000Z");
		jest.spyOn(uuid, "v1").mockImplementation(() => "00000000-0000-0000-0000-000000000000");
		jest.spyOn(global, "Date").mockImplementation(() => fixedDate);
	});

	afterAll(() => {
		jest.resetAllMocks();
	});

	it("adds the status delivered for zero payment", () => {
		const result = getOrderForZeroPayment(formState, userAccount);
		expect(result.orderStatus).toBe("OrderDelivered");
	});

	it("adds a randomUUID order number for bank transfers", () => {
		const result = getOrderForZeroPayment(formState, userAccount);
		expect(result.orderNumber).toBe("00000000-0000-0000-0000-000000000000");
	});

	it("adds an ISO date as order date", () => {
		const result = getOrderForZeroPayment(formState, userAccount);
		expect(result.orderDate).toBe("2023-01-01T00:00:00.000Z");
	});

	it("total payment due price to be zero", () => {
		const result = getOrderForZeroPayment(formState, userAccount);
		expect(result.partOfInvoice.totalPaymentDue.price).toBe(0);
	});

	it("should return a valid Order object with zero price for all accepted offers", () => {
		const result = getOrderForZeroPayment(formState, userAccount);
		expect(result.acceptedOffer).toBeDefined();
		expect(result.acceptedOffer.length).toBeGreaterThan(0);
		result.acceptedOffer.forEach(offer => {
			expect(offer.price).toBe(0);
		});
	});
});
