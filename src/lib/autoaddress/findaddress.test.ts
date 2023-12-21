import { FINDADDRESS_ENDPOINT } from "./settings";
import { buildFindAddressQuery, parseFindAddressResponse } from "./findaddress";

describe("buildFindAddressQuery tests", () => {
	const input = "10 Westland Square";
	const expectedQuery = `${FINDADDRESS_ENDPOINT}?key=API_KEY&address=10%20Westland%20Square&limit=1&addressProfileName=FailteIreland_Default&vanityMode=true`;

	it("should throw an error if api key is not provided", () => {
		expect(() => buildFindAddressQuery()).toThrow(Error);
	});

	it("should return null if addressId is not provided", () => {
		const actual = buildFindAddressQuery(null, "API_KEY");
		expect(actual).toBeNull();
	});

	it("should return the expected query format", () => {
		const actual = buildFindAddressQuery(input, "API_KEY");
		expect(actual).toEqual(expectedQuery);
	});

	it("should url encode input on the built query", () => {
		const actual = buildFindAddressQuery(input, "API_KEY");
		expect(actual).toEqual(expectedQuery);
	});

	it("should trim input on the built query", () => {
		const actual = buildFindAddressQuery(` ${input} `, "API_KEY");
		expect(actual).toEqual(expectedQuery);
	});
});

describe("parseFindAddressResponse tests", () => {
	const response = {
		reformattedAddress: ["Line 1", "Line 2", "Line 3", "Town", "Co. County", "Eircode"],
		postcode: "Eircode"
	};
	const expectedAddress = {
		addressLine1: "Line 1",
		addressLine2: "Line 2",
		addressLine3: "Line 3",
		town: "Town",
		county: "County",
		postcode: "Eircode"
	};

	it("should return empty list if response has no results", () => {
		const actual = parseFindAddressResponse({});
		expect(actual).toEqual(null);
	});

	it("should return a properly formatted address", () => {
		const actual = parseFindAddressResponse(response);
		expect(actual).toEqual(expectedAddress);
	});

	it("should return null if reformattedAddressResult is empty and vanity address is empty", () => {
		const actual = parseFindAddressResponse({});
		expect(actual).toEqual(null);
	});

	it("should return null if reformattedAddress doesn't have the proper format", () => {
		// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
		const _response = { ...response, reformattedAddress: [] };
		const actual = parseFindAddressResponse(_response);
		expect(actual).toEqual(null);
	});
});
