import { sha1 } from "./sha1";
import { logger } from "../logger";

/**
 * Loads the Global Payments form into an iframe
 * @param iframe
 * @param paymentRequest
 * @param paymentId
 * @returns
 */
export const loadPaymentsForm = (iframe: HTMLIFrameElement, paymentRequest: any, correlationData: any): void => {
	if (!paymentRequest) return;
	// eslint-disable-next-line no-restricted-globals
	const paymentData = { ...paymentRequest, HPP_POST_RESPONSE: location.origin, HPP_POST_DIMENSIONS: location.origin };
	try {
		const document = iframe.contentWindow?.document;
		const hppUrl = process.env.GLOBAL_PAYMENTS_ENDPOINT;
		const form = createForm(document, paymentData, hppUrl);
		document.body.append(form);
		form.submit();
	} catch (error) {
		logger.error(new Error(`Failed to load Global Payments form. Error ${error?.message}}`), correlationData || {});
		throw new Error();
	}
};

/**
 * Creates a dummy payment request to be passed to Global Payments sandbox
 * @returns
 */
export const getDummyPaymentRequest = () => {
	const timestamp = getTimestamp(new Date());
	const orderId = `test-ah-${timestamp}`;
	const toBeHashed = `${timestamp}.${MOCK_PAYMENT_DATA.MERCHANT_ID}.${orderId}.${MOCK_PAYMENT_DATA.AMOUNT}.${MOCK_PAYMENT_DATA.CURRENCY}`;
	const hash1 = sha1(toBeHashed);
	const hash2 = sha1(`${hash1}.secret`);
	return {
		...MOCK_PAYMENT_DATA,
		ORDER_ID: orderId,
		TIMESTAMP: timestamp,
		SHA1HASH: hash2
	};
};
/**
 * Parses a Global Payments iframe post message data
 * @param event
 * @returns
 */
export const processIframeEvent = (event: MessageEvent) => {
	if (typeof event.data !== "string") return;
	if (event.data?.startsWith("Error")) return { type: IframeEventTypes.ERROR };
	try {
		const data = JSON.parse(event.data);
		if (data.ORDER_ID && data.AUTHCODE) return { data, type: IframeEventTypes.SUCCESS };
		if (data.ORDER_ID && !data.AUTHCODE) return { type: IframeEventTypes.ERROR };
		if (data.iframe) {
			const height = parseInt(data.iframe.height, 10);
			if (height > 200) return { type: IframeEventTypes.RESIZE, height: `${height}px` };
		}
	} catch (e) {
		/* empty */
	}
};

// Define the different event types processed from a Global Payments iframe post message
export enum IframeEventTypes {
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
	RESIZE = "RESIZE"
}

// create a hidden form to redirect the iframe to Global Payments
const createForm = (document: Document, paymentRequest: any, hppBaseUrl: string) => {
	const form = document.createElement("form");
	form.setAttribute("method", "POST");
	form.setAttribute("action", hppBaseUrl);
	// eslint-disable-next-line guard-for-in,no-restricted-syntax
	for (const key in paymentRequest) {
		form.appendChild(createFormHiddenInput(key, paymentRequest[key]));
	}
	return form;
};

// create a form hidden input
const createFormHiddenInput = (name: string, value: string) => {
	const el = document.createElement("input");
	el.setAttribute("type", "hidden");
	el.setAttribute("name", name);
	el.setAttribute("value", value);
	return el;
};

// utility generating a timestamp
const getTimestamp = (date: Date) =>
	date
		.toISOString()
		.split(/[^0-9]/)
		.slice(0, -2)
		.join("");

// Mocked data for a dummy payment request
const MOCK_PAYMENT_DATA = {
	AMOUNT: "8000",
	AUTO_SETTLE_FLAG: "1",
	BILLING_CO: "IE",
	CURRENCY: "EUR",
	HPP_ADDRESS_MATCH_INDICATOR: "TRUE",
	HPP_BILLING_CITY: "Dublin City",
	HPP_BILLING_COUNTRY: "372",
	HPP_BILLING_POSTALCODE: "D14 T8R2",
	HPP_BILLING_STREET1: "Churchtown Lower",
	HPP_CUSTOMER_EMAIL: "paul.tierney@email.com",
	HPP_CUSTOMER_FIRSTNAME: "Paul",
	HPP_CUSTOMER_LASTNAME: "Tierney",
	HPP_CUSTOMER_PHONENUMBER_MOBILE: "353|850123456",
	HPP_REMOVE_SHIPPING: true,
	HPP_VERSION: "2",
	MERCHANT_ID: "failteirelandtest",
	PM_METHODS: "cards",
	ORDER_ID: "",
	OWNER: "c83536c8-d1e7-411e-80d1-5d4f2402adf8",
	SHA1HASH: "",
	SOURCE: "QA App",
	TIMESTAMP: "",
	IS_DUMMY: "1"
};

// A successful test card
export const TEST_CARD = "4263970000005262";

// A failing test card
export const TEST_CARD_FAILED = "4000120000001154";
