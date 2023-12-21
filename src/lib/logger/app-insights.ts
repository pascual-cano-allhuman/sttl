import { ApplicationInsights } from "@microsoft/applicationinsights-web";

const getClient = (appInsightsKey: string) => {
	if (!process.env.APPINSIGHTS_KEY) return null;
	const client = new ApplicationInsights({
		config: { instrumentationKey: appInsightsKey }
	});
	client.loadAppInsights();
	return client;
};

export const appInsightsClient = getClient(process.env.APPINSIGHTS_KEY);

export const logger = {
	log: (message: string, properties?: Record<string, any>) => {
		if (appInsightsClient) appInsightsClient?.trackTrace({ message, properties });
		if (process.env.VERBOSITY === "true") console.log("[LOG]", message); // eslint-disable-line no-console
	},
	info: (...args) => {
		if (process.env.VERBOSITY === "true") console.log("[INFO]", ...args); // eslint-disable-line no-console
	},
	error: (e: Error, properties?: Record<string, any>) => {
		if (appInsightsClient) appInsightsClient?.trackException({ exception: e, properties });
		console.log("[ERROR]", e); // eslint-disable-line no-console
	},
	event: (name: string, properties?: Record<string, any>) => {
		if (appInsightsClient) appInsightsClient?.trackEvent({ name, properties });
		if (process.env.VERBOSITY === "true") console.log("[EVENT]", name); // eslint-disable-line no-console
	}
};
