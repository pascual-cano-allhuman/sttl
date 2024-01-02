import { httpPost } from "lib/http";
import { logger } from "lib/logger";

export const postQAMembershipUpsell = (token: string, correlation: Record<string, string>): Promise<void> => {
	if (!token || process.env.NODE_ENV === "development") return;
	try {
		httpPost(`${process.env.MIDDLEWARE_PORTAL_ENDPOINT}/memberships`, { programName: "UpsellQA" }, token);
	} catch (e) {
		logger.error(new Error(`Failed to sign up for UpsellQA. HTTP Error ${e?.message}}`), correlation);
	}
};
