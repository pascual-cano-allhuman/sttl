import { httpGet } from "lib/http";
import { logger } from "lib/logger";
import { properties } from "../mocks/dashboard";
import { accommodation } from "../mocks/accommodation";
import { payments } from "../mocks/payments";

const MIDDLEWARE_PORTAL_ENDPOINT = process.env.MIDDLEWARE_PORTAL_ENDPOINT?.length > 0 ? process.env.MIDDLEWARE_PORTAL_ENDPOINT : null;
const SHOULD_MOCK_MIDDLEWARE = ["1", "true"].includes(process.env.SHOULD_MOCK_MIDDLEWARE);

export const getPropertiesFromMiddleware = async (token: string, correlation: Record<string, string>): Promise<any> => {
	if (!MIDDLEWARE_PORTAL_ENDPOINT || !token) return;
	if (SHOULD_MOCK_MIDDLEWARE) return properties; // eslint-disable-line
	try {
		return await httpGet(`${MIDDLEWARE_PORTAL_ENDPOINT}/accommodation`, token);
	} catch (e) {
		logger.error(new Error(`Failed to get dashboard data. HTTP Error ${e?.message}}`), correlation);
	}
};

export const getPropertyFromMiddleware = async (propertyId: string, token: string, correlation: Record<string, string>): Promise<any> => {
	if (!MIDDLEWARE_PORTAL_ENDPOINT || !token || !propertyId) return;
	if (SHOULD_MOCK_MIDDLEWARE) return propertyId < "3" ? accommodation : null; // eslint-disable-line
	try {
		return await httpGet(`${MIDDLEWARE_PORTAL_ENDPOINT}/accommodation/${propertyId}`, token);
	} catch (e) {
		logger.error(new Error(`Failed to get property details.  HTTP Error ${e?.message}}`), correlation);
	}
};

export const getPaymentsFromMiddleware = async (token: string, correlation: Record<string, string>): Promise<any> => {
	if (!MIDDLEWARE_PORTAL_ENDPOINT || !token) return;
	if (SHOULD_MOCK_MIDDLEWARE) return payments;
	try {
		return await httpGet(`${MIDDLEWARE_PORTAL_ENDPOINT}/orders`, token);
	} catch (e) {
		logger.error(new Error(`Failed to get payments history.  HTTP Error ${e?.message}}`), correlation);
	}
};
