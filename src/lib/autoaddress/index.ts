import { buildAutocompleteQuery, parseAutocompleteResponse } from "./autocomplete";
import { buildFindAddressQuery, parseFindAddressResponse, FormattedAddress } from "./findaddress";
import { httpGet } from "../http";

/**
 * Suggest addresses autocompleting provided text
 * @param text
 * @param apiKey
 * @returns
 */

const notEnoughDetails = { items: [], notEnoughDetails: true };

export const getAutocompleteAddresses = async (text = "", apiKey?: string): Promise<{ items: string[]; notEnoughDetails: boolean }> => {
	// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
	const _apiKey = apiKey || process.env.AUTOADDRESS_KEY;
	const url = buildAutocompleteQuery(text, _apiKey);
	if (!url) return notEnoughDetails;
	const response = await httpGet(url);
	return parseAutocompleteResponse(response);
};

/**
 * Given entered address text it returns a formatted address if available
 * @param addressText
 * @param apiKey
 * @returns
 */
export const getFormattedAddress = async (addressText = "", apiKey?: string): Promise<FormattedAddress> => {
	// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
	const _apiKey = apiKey || process.env.AUTOADDRESS_KEY;
	const url = buildFindAddressQuery(addressText, _apiKey);
	if (!url) return null;
	const response = await httpGet(url);
	return parseFindAddressResponse(response);
};

export type GetAutocompleteAddresses = typeof getAutocompleteAddresses;
export type GetFormattedAddress = typeof getFormattedAddress;
