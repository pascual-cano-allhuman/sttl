import { httpGet, httpPost, httpPostFormData } from "lib/http";
import { getDummyPaymentRequest } from "lib/global-payments";
import { logger } from "lib/logger";

const MIDDLEWARE_DE_ENDPOINT = process.env.MIDDLEWARE_DE_ENDPOINT?.length > 0 ? process.env.MIDDLEWARE_DE_ENDPOINT : null;
const MIDDLEWARE_PORTAL_ENDPOINT = process.env.MIDDLEWARE_PORTAL_ENDPOINT?.length > 0 ? process.env.MIDDLEWARE_PORTAL_ENDPOINT : null;
const SHOULD_MOCK_MIDDLEWARE = ["1", "true"].includes(process.env.SHOULD_MOCK_MIDDLEWARE);

export const postCardPaymentRequest = async (order: any, token: string, correlation: Record<string, string>) => {
	if (!MIDDLEWARE_DE_ENDPOINT || !token) return;
	if (SHOULD_MOCK_MIDDLEWARE) return getFakePaymentRequest(); // dummy data
	if (order?.acceptedOffer?.[0]?.itemOffered?.isRelatedTo?.owns?.address?.postalCode === "D00 0001") return null; // simulate error
	if (order["@type"] !== "Order") return;
	try {
		const paymentRequest = await httpPost(
			`${MIDDLEWARE_DE_ENDPOINT}/pay/request?source=STL Registration&correlationId=${correlation.correlationId}`,
			order,
			token
		);
		logger.event(`Card credit payment created for STTL`, correlation);
		return paymentRequest;
	} catch (e) {
		logger.error(new Error(`Failed credit card payment creation. HTTP Error ${e?.message}}`), correlation);
	}
};

export const postCardPaymentResponse = async (data: object, token: string, correlation: Record<string, string>): Promise<any> => {
	if (!MIDDLEWARE_DE_ENDPOINT || !token) return;
	if (SHOULD_MOCK_MIDDLEWARE) return { orderId: "00000000-0000-0000-0000-000000000000", status: "OrderDelivered" }; // dummy response
	try {
		const { orderId, status } = await httpPostFormData(`${MIDDLEWARE_DE_ENDPOINT}/pay/response`, { hppResponse: JSON.stringify(data) }, token);
		logger.event(`Card payment confirmation for STTL: ${orderId}. status ${status}.`, correlation);
		return { orderId, status };
	} catch (e) {
		logger.error(new Error(`Failed payment confirmation. HTTP Error ${e?.message}}`), correlation);
	}
};

export const postOrderToEventsBus = async (order: any, token: string, correlation: Record<string, string>) => {
	if (!MIDDLEWARE_PORTAL_ENDPOINT || !token) return;
	if (order["@type"] !== "Order" || !order.acceptedOffer || !order.customer || !order.partOfInvoice) return false;
	const event = { correlationId: correlation.correlationId, eventType: "STTL App", subject: "OrderDelivered:STTL Registration", data: order };
	try {
		const { status } = await httpPost(`${MIDDLEWARE_PORTAL_ENDPOINT}/event`, event, token);
		logger.event(`Zero payment STTL application created.`, correlation);
		return status;
	} catch (e) {
		logger.error(new Error(`Failed zero payment STTL application. HTTP Error ${e?.message}}`), correlation);
		return false;
	}
};

export const getOrderStatusFromEventBus = async (token: string, correlation: Record<string, string>, propertiesList?: any[]) => {
	if (!MIDDLEWARE_DE_ENDPOINT || !token) return;
	if (SHOULD_MOCK_MIDDLEWARE) return getFakeOrderStatus(propertiesList);
	try {
		return await httpGet(`${MIDDLEWARE_DE_ENDPOINT}/b2c/event/${correlation.correlationId}/status?mode=full`, token);
	} catch (e) {
		logger.log(`Order status check failed. HTTP Error ${e?.message}}`, correlation);
		return null;
	}
};

const getFakePaymentRequest = async () => {
	await sleep(1000);
	return getDummyPaymentRequest();
};

const getFakeOrderStatus = async (propertiesList: any[]) => {
	const subOperations = propertiesList.map((property, index) => {
		const postalCode = property?.property_address?.propertyAddress?.postcode;
		const sttlNumber = `STL-00000${index}`;
		const signals = [
			{ name: "STL Code Generation", data: { number: sttlNumber } },
			{ name: "Save Property", data: { document: { address: { postalCode } } } }
		];
		return { signals };
	});
	await sleep(1000);
	return { subOperations };
};

const sleep = (ms: number): Promise<void> => {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
};
