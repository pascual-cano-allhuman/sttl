import { AUTOCOMPLETE_ENDPOINT, MIN_AUTOCOMPLETE_INPUT_LENGTH } from "./settings";

/**
 * Builds a query to use against the autoaddress API
 * @param text Text entered by the user
 * @param apiKey API key
 * @returns Autoaddress query for autocompleting addresses
 */
export const buildAutocompleteQuery = (text = "", apiKey = ""): string => {
	if (apiKey.length === 0) throw new Error();
	if (text.length < MIN_AUTOCOMPLETE_INPUT_LENGTH) return null;
	const urlEncodedText = encodeURIComponent(text.trim().replace(/[ ]+/, " "));
	return `${AUTOCOMPLETE_ENDPOINT}?key=${apiKey}&address=${urlEncodedText}&vanityMode=true`;
};

/**
 * Parses autocomplete API call response. Output is a list of addresses composed of the address and a reference
 * @param response JSON with possible addresses
 * @returns Array of addresses to be displayed
 */
export const parseAutocompleteResponse = (response: any): { items: string[]; notEnoughDetails: boolean } => {
	if (!response?.options) return { items: [], notEnoughDetails: true };

	const options = response.options.filter(
		option =>
			option.displayName?.length > 0 && //
			option.addressType?.code > 0 &&
			//	option.addressType?.code < 3000 &&
			option.addressId > 0
	);

	if (response?.totalOptions > 0 && options.length === 0) {
		return { items: [], notEnoughDetails: true };
	}

	const items = options.map(({ displayName }) => displayName);
	return { items, notEnoughDetails: false };
};
