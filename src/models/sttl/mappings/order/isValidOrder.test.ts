/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Order } from "../../types";
import { isCustomer, isPartOfInvoice, isValidOrder, isOfferItem, isAddress } from "./isValidOrder";
import { order } from "../mocks";

let testOrder = order;

beforeEach(() => {
	testOrder = JSON.parse(JSON.stringify(order));
});

describe("Oder validation", () => {
	it("isCustomer", () => {
		// @ts-ignore
		testOrder.customer.name = 123;
		const result = isCustomer(testOrder.customer as Order["customer"]);
		expect(result).toBeFalsy();
	});
	it("isPartOfInvoice", () => {
		// @ts-ignore
		delete testOrder.partOfInvoice.totalPaymentDue;
		const result = isPartOfInvoice(testOrder.partOfInvoice as Order["partOfInvoice"]);
		expect(result).toBeFalsy();
	});

	it("isOfferItem", () => {
		// @ts-ignore
		testOrder.acceptedOffer[0].itemOffered.isRelatedTo.owns.additionalProperty[0].value = "I wish its Granted";
		const result = isOfferItem(testOrder.acceptedOffer as Order["acceptedOffer"]);
		expect(result).toBeFalsy();
	});
	it("isAddress", () => {
		// @ts-ignore
		delete testOrder.acceptedOffer[0].itemOffered.isRelatedTo.address.postalCode;
		const result = isAddress(
			testOrder.acceptedOffer[0].itemOffered.isRelatedTo.address as Order["acceptedOffer"][0]["itemOffered"]["isRelatedTo"]["address"]
		);
		expect(result).toBeFalsy();
	});
	it("isValidOrder", () => {
		const result = isValidOrder(order);
		expect(result).toBeTruthy();
	});
});
