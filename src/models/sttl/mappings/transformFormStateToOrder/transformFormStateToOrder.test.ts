import * as uuid from "uuid";
import { getOrderForCardPayment, getOrderForZeroPayment, transformFormStateToOrder } from "./transformFormStateToOrder";
import { userAccount, formState, order } from "../mocks";
import { FormState } from "../../types";
import {} from "../mocks/order";

jest.mock("uuid");
describe("transformFormStateToOrder", () => {
	it("should return null if no offers in formState", () => {
		const emptyFormState = { property_type: {} } as FormState;
		const result = transformFormStateToOrder(emptyFormState, userAccount);
		expect(result).toBeNull();
	});

	it("should return null if userAccount is missing", () => {
		const result = transformFormStateToOrder(formState, null);
		expect(result).toBeNull();
	});

	it("should return a valid Order object when both formState and userAccount are provided", () => {
		const result = transformFormStateToOrder(formState, userAccount);
		expect(result).toBeDefined();
		expect(result["@type"]).toBe("Order");
	});

	it("composes and order from an formState", () => {
		const result = transformFormStateToOrder(formState, userAccount);
		expect(result).toEqual(order);
	});

	it("should return a valid Order object with correct customer name when userAccount has no name", () => {
		const accountDataWithoutName = { email: "johndoe@example.com", id: "12345", provider: "Google" };
		const result = transformFormStateToOrder(formState, accountDataWithoutName);
		expect(result).toBeDefined();
		expect(result.customer.name).toBe("Cruz Obrien");
	});

	it("should return a valid Order object with correct customer identifier when userAccount is missing provider and id", () => {
		const accountDataWithoutProviderAndId = { email: "johndoe@example.com", name: "John Doe" };
		const result = transformFormStateToOrder(formState, accountDataWithoutProviderAndId);
		expect(result).toBeDefined();
		expect(result.customer.identifier[0].valueReference).toBe("");
		expect(result.customer.identifier[0].value).toBe("");
	});

	it("should return a valid Order object with correct customer worksFor when userAccount has no organization name", () => {
		const accountDataWithoutOrganization = { email: "johndoe@example.com", name: "John Doe", id: "12345", provider: "Google" };
		const result = transformFormStateToOrder(formState, accountDataWithoutOrganization);
		expect(result).toBeDefined();
		expect(result.customer.worksFor.name).toBe("");
	});

	it("result from transformFormStateToOrder to match snapshot", () => {
		const result = transformFormStateToOrder(formState, userAccount);
		expect(result).toMatchSnapshot();
	});
});

describe("getOrderForCardPayment", () => {
	it("result for getOrderForCardPayment should be same as result from transformFormStateToOrder", () => {
		const getOrderForCardPaymentResult = getOrderForCardPayment(formState, userAccount);
		const transformFormStateToOrderResult = transformFormStateToOrder(formState, userAccount);
		expect(getOrderForCardPaymentResult).toEqual(transformFormStateToOrderResult);
	});

	it("result from getOrderForCardPayment to match snapshot", () => {
		const result = getOrderForCardPayment(formState, userAccount);
		expect(result).toMatchSnapshot();
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

	it("result from getOrderForZeroPayment to match snapshot", () => {
		const result = getOrderForZeroPayment(formState, userAccount);
		expect(result).toMatchSnapshot();
	});
});
