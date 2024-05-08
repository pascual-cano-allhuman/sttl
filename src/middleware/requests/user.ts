import { httpGet } from "lib/http";
import { logger } from "lib/logger";
import { userContext } from "../mocks/userContext";

const MIDDLEWARE_DE_ENDPOINT = process.env.MIDDLEWARE_DE_ENDPOINT?.length > 0 ? process.env.MIDDLEWARE_DE_ENDPOINT : null;
const SHOULD_MOCK_MIDDLEWARE = ["true", "1"].includes(process.env.SHOULD_MOCK_MIDDLEWARE);

export const getUserContext = async (token: string, correlation: Record<string, string>) => {
	if (!MIDDLEWARE_DE_ENDPOINT || !token) return;
	if (SHOULD_MOCK_MIDDLEWARE) return userContext;
	try {
		return await httpGet(`${MIDDLEWARE_DE_ENDPOINT}/b2c/context`, token);
	} catch (e) {
		logger.error(new Error(`Failed to get user context. HTTP Error ${e?.message}}`), correlation);
		throw e;
	}
};
