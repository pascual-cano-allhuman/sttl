import { httpPost, httpGet, httpDelete } from "lib/http";
import { isValidOrder, Order } from "models/sttl";
import { logger } from "lib/logger";
import { order } from "./mocks/order";

const MIDDLEWARE_PORTAL_ENDPOINT = process.env.MIDDLEWARE_PORTAL_ENDPOINT?.length > 0 ? process.env.MIDDLEWARE_PORTAL_ENDPOINT : null;
const MOCK_MIDDLEWARE = process.env.MOCK_MIDDLEWARE || false;

export const postSaveAndResumeData = async (userId: string, order: Order, token: string, correlation: Record<string, string>) => {
	if (!MIDDLEWARE_PORTAL_ENDPOINT || !token || !order || !userId) return;
	if (MOCK_MIDDLEWARE) return;
	try {
		await httpPost(`${MIDDLEWARE_PORTAL_ENDPOINT}/cache/short-term-let-registration/${userId}`, order, token);
	} catch (e) {
		logger.error(new Error(`Failed to post save-and-resume data.  HTTP Error ${e?.message}.`), correlation);
	}
};

export const getSaveAndResumeData = async (userId: string, token: string, correlation: Record<string, string>): Promise<Order> => {
	if (!MIDDLEWARE_PORTAL_ENDPOINT || !token || !userId) return;
	if (MOCK_MIDDLEWARE) return order;
	try {
		const data = await httpGet(`${MIDDLEWARE_PORTAL_ENDPOINT}/cache/short-term-let-registration/${userId}`, token);
		const isValid = isValidOrder(data);
		if (data && !isValid) {
			logger.error(new Error(`Failed to validate save-and-resume data.`), correlation);
			return;
		}
		return data as Order;
	} catch (e) {
		logger.error(new Error(`Failed to get save-and-resume data. HTTP Error ${e?.message}}`), correlation);
	}
};

export const deleteSaveAndResumeData = async (userId: string, token: string, correlation: Record<string, string>) => {
	if (!MIDDLEWARE_PORTAL_ENDPOINT || !token || !userId) return;
	if (MOCK_MIDDLEWARE) return;
	try {
		const data = await httpDelete(`${MIDDLEWARE_PORTAL_ENDPOINT}/cache/short-term-let-registration/${userId}`, token);
		return data as Order;
	} catch (e) {
		logger.error(new Error(`Failed to delete save-and-resume data. HTTP Error ${e?.message}}`), correlation);
	}
};
