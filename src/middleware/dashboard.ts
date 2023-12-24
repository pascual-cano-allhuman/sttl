import { httpGet } from "lib/http";
import { logger } from "lib/logger";
import { dashboardSample } from "./mocks/dashboard";

const MIDDLEWARE_PORTAL_ENDPOINT = process.env.MIDDLEWARE_PORTAL_ENDPOINT?.length > 0 ? process.env.MIDDLEWARE_PORTAL_ENDPOINT : null;
const MOCK_MIDDLEWARE = process.env.MOCK_MIDDLEWARE || false;

export const getDashboardFromMiddleware = async (token: string, correlation: Record<string, string>): Promise<any> => {
	if (!MIDDLEWARE_PORTAL_ENDPOINT || !token) return;
	if (MOCK_MIDDLEWARE) return dashboardSample;

	try {
		return await httpGet(`${MIDDLEWARE_PORTAL_ENDPOINT}/accommodation`, token);
	} catch (e) {
		logger.error(new Error(`Failed to get dashboard data. HTTP Error ${e?.message}}`), correlation);
	}
};

export const getPropertyFromMiddleware = async (propertyId: string, token: string, correlation: Record<string, string>): Promise<any> => {
	if (!MIDDLEWARE_PORTAL_ENDPOINT || !token || !propertyId) return;
	try {
		return await httpGet(`${MIDDLEWARE_PORTAL_ENDPOINT}/accommodation/${propertyId}`, token);
	} catch (e) {
		logger.error(new Error(`Failed to get property details.  HTTP Error ${e?.message}}`), correlation);
	}
};

export const getPaymentsFromMiddleware = async (token: string, correlation: Record<string, string>): Promise<any> => {
	if (!MIDDLEWARE_PORTAL_ENDPOINT || !token) return;
	try {
		return await httpGet(`${MIDDLEWARE_PORTAL_ENDPOINT}/orders`, token);
	} catch (e) {
		logger.error(new Error(`Failed to get payments history.  HTTP Error ${e?.message}}`), correlation);
	}
};
