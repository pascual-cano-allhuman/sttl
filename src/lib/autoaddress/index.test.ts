import { getAutocompleteAddresses, getFormattedAddress } from ".";
import * as HttpRequest from "../http";
import * as Autocomplete from "./autocomplete";
import * as FindAddress from "./findaddress";

jest.mock("../http");
const mockedHttpRequest = HttpRequest as jest.Mocked<typeof HttpRequest>;
jest.mock("./autocomplete");
const mockedHAutocomplete = Autocomplete as jest.Mocked<typeof Autocomplete>;
jest.mock("./findaddress");
const mockedFindAddress = FindAddress as jest.Mocked<typeof FindAddress>;

describe("Autoaddress exposed functions", () => {
	beforeEach(() => {
		mockedHttpRequest.httpGet.mockReset();
	});

	it("getAutocompleteAddresses should use the expected collaborators", async () => {
		mockedHttpRequest.httpGet.mockImplementation(() => null);
		mockedHAutocomplete.buildAutocompleteQuery.mockImplementation(() => "http://");
		mockedHAutocomplete.parseAutocompleteResponse.mockImplementation(() => ({ items: [], notEnoughDetails: true }));
		await getAutocompleteAddresses("test", "API_KEY");
		expect(mockedHttpRequest.httpGet).toHaveBeenCalledTimes(1);
		expect(mockedHAutocomplete.buildAutocompleteQuery).toHaveBeenCalledTimes(1);
		expect(mockedHAutocomplete.parseAutocompleteResponse).toHaveBeenCalledTimes(1);
	});

	it("getFormattedAddress should use the expected collaborators", async () => {
		mockedHttpRequest.httpGet.mockImplementation(() => null);
		mockedFindAddress.buildFindAddressQuery.mockImplementation(() => "http://");
		mockedFindAddress.parseFindAddressResponse.mockImplementation(() => null);
		await getFormattedAddress("test", "API_KEY");
		expect(mockedHttpRequest.httpGet).toHaveBeenCalledTimes(1);
		expect(mockedFindAddress.buildFindAddressQuery).toHaveBeenCalledTimes(1);
		expect(mockedFindAddress.parseFindAddressResponse).toHaveBeenCalledTimes(1);
	});
});
