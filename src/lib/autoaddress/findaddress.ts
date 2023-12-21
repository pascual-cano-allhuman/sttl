import { FINDADDRESS_ENDPOINT } from "./settings";

// An address to be listed in the dropdown
export interface FormattedAddress {
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	town: string;
	county: string;
	postcode: string;
}

/**
 * Builds a query to use against the autoaddress find address API
 * @param addressText Text entered by the user
 * @param apiKey API key
 * @returns Autoaddress query for autocompleting addresses
 */
export const buildFindAddressQuery = (addressText = "", apiKey = ""): string => {
	if (apiKey.length === 0) throw new Error();
	if (!(addressText?.length > 0)) return null;
	const urlEncodedAddress = encodeURIComponent(addressText.trim().replace(/[ ]+/, " "));
	return `${FINDADDRESS_ENDPOINT}?key=${apiKey}&address=${urlEncodedAddress}&limit=1&addressProfileName=FailteIreland_Default&vanityMode=true`;
};

/**
 * Parses findAddress API call response. Output is a formatted address
 * @param response JSON with the API response
 * @returns Formatted address
 */

export const parseFindAddressResponse = (response): FormattedAddress => {
	const [addressLine1, addressLine2, addressLine3, town, county, postcode] = response?.reformattedAddress || [];
	if (!addressLine1 && !response?.vanityAddress?.[0]) return null;

	return {
		addressLine1: addressLine1 ?? response?.vanityAddress?.[0] ?? "",
		addressLine2: addressLine2 ?? "",
		addressLine3: addressLine3 ?? "",
		town: town ?? "",
		county: county?.replace(/^co\. /i, "") ?? "",
		postcode: postcode ?? response?.postcode ?? ""
	};
};
