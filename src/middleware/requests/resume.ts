import { httpPost, httpGet, httpDelete } from "lib/http";
import { isValidOrder, OrderSchema } from "models";
import { logger } from "lib/logger";
import { order } from "../mocks/order";

const MIDDLEWARE_PORTAL_ENDPOINT = process.env.MIDDLEWARE_PORTAL_ENDPOINT?.length > 0 ? process.env.MIDDLEWARE_PORTAL_ENDPOINT : null;
const SHOULD_MOCK_MIDDLEWARE = ["1", "true"].includes(process.env.SHOULD_MOCK_MIDDLEWARE);

export const postSaveAndResumeData = async (userId: string, order: OrderSchema, token: string, correlation: Record<string, string>) => {
	if (!MIDDLEWARE_PORTAL_ENDPOINT || !token || !order || !userId) return;
	if (SHOULD_MOCK_MIDDLEWARE) return;
	try {
		await httpPost(`${MIDDLEWARE_PORTAL_ENDPOINT}/cache/sttl/${userId}`, order, token);
	} catch (e) {
		logger.error(new Error(`Failed to post save-and-resume data.  HTTP Error ${e?.message}.`), correlation);
	}
};

export const getSaveAndResumeData = async (userId: string, token: string, correlation: Record<string, string>): Promise<OrderSchema> => {
	if (!MIDDLEWARE_PORTAL_ENDPOINT || !token || !userId) return;
	if (SHOULD_MOCK_MIDDLEWARE) return order;
	try {
		const data = await httpGet(`${MIDDLEWARE_PORTAL_ENDPOINT}/cache/sttl/${userId}`, token);

		if (!data || Object.keys(data).length === 0) return;
		const isValid = isValidOrder(data);
		if (!isValid) {
			logger.error(new Error(`Failed to validate save-and-resume data.`), correlation);
			return;
		}
		return data as OrderSchema;
	} catch (e) {
		logger.error(new Error(`Failed to get save-and-resume data. HTTP Error ${e?.message}}`), correlation);
	}
};

export const deleteSaveAndResumeData = async (userId: string, token: string, correlation: Record<string, string>) => {
	if (!MIDDLEWARE_PORTAL_ENDPOINT || !token || !userId) return;
	if (SHOULD_MOCK_MIDDLEWARE) return;
	try {
		await httpDelete(`${MIDDLEWARE_PORTAL_ENDPOINT}/cache/sttl/${userId}`, token);
	} catch (e) {
		logger.error(new Error(`Failed to delete save-and-resume data. HTTP Error ${e?.message}}`), correlation);
	}
};
