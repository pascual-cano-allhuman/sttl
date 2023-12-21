import { MIN_AUTOCOMPLETE_INPUT_LENGTH, AUTOCOMPLETE_ENDPOINT } from "./settings";
import { buildAutocompleteQuery, parseAutocompleteResponse } from "./autocomplete";

describe("buildAutocompleteQuery tests", () => {
	const input = "".padStart(MIN_AUTOCOMPLETE_INPUT_LENGTH, "a"); // e.g. aaaaaa
	const expectedQuery = `${AUTOCOMPLETE_ENDPOINT}?key=API_KEY&address=${input}&vanityMode=true`;

	it("should throw an error if api key is not provided", () => {
		expect(() => buildAutocompleteQuery()).toThrow(Error);
	});

	it("should return null if input text is not long enough", () => {
		const actual = buildAutocompleteQuery(input.slice(0, -1), "API_KEY");
		expect(actual).toBeNull();
	});

	it("should return the expected query format", () => {
		const actual = buildAutocompleteQuery(input, "API_KEY");
		expect(actual).toEqual(expectedQuery);
	});

	it("should url encode input on the built query", () => {
		const actual = buildAutocompleteQuery(`${input} ?`, "API_KEY");
		expect(actual).toEqual(expectedQuery.replace(input, `${input}%20%3F`));
	});

	it("should trim input on the built query", () => {
		const actual = buildAutocompleteQuery(` ${input} `, "API_KEY");
		expect(actual).toEqual(expectedQuery);
	});

	it("should remove multiple spaces input on the built query", () => {
		const actual = buildAutocompleteQuery(`${input}  a`, "API_KEY");
		expect(actual).toEqual(expectedQuery.replace(input, `${input}%20a`));
	});
});

describe("parseAutocompleteResponse tests", () => {
	const option = { displayName: "Westland Square", addressType: { code: 1000 }, addressId: 99999 };

	it("should return empty list if response has no results", () => {
		const actual = parseAutocompleteResponse({});
		expect(actual).toEqual({ items: [], notEnoughDetails: true });
	});

	it("should discard results not having displayName", () => {
		const { addressType, addressId } = option;
		const actual = parseAutocompleteResponse({ options: [{ addressType, addressId }] });
		expect(actual).toEqual({ items: [], notEnoughDetails: false });
	});

	it("should discard results not having a addressId", () => {
		const { displayName, addressType } = option;
		const actual = parseAutocompleteResponse({ options: [{ displayName, addressType }] });
		expect(actual).toEqual({ items: [], notEnoughDetails: false });
	});

	it("should produce the expected output for a valid option", () => {
		const actual = parseAutocompleteResponse({ options: [option] });
		const address = option.displayName;
		expect(actual).toEqual({ items: [address], notEnoughDetails: false });
	});
});
