/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.NODE_ENV === "production" && ["true", "1"].includes(process.env.ANALYZE)
});

const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true
	},
	env: {
		APP_ENV: process.env.APP_ENV || "",
		APPINSIGHTS_KEY: process.env.APPINSIGHTS_KEY || "",
		AUTOADDRESS_KEY: process.env.AUTOADDRESS_KEY || "",
		B2C_CLIENT_ID: process.env.B2C_CLIENT_ID || "",
		B2C_DOMAIN: process.env.B2C_DOMAIN || "",
		B2C_LOGOUT_URI: process.env.B2C_LOGOUT_URI || "",
		B2C_TENANT: process.env.B2C_TENANT || "",
		DISALLOW_ROBOTS: process.env.DISALLOW_ROBOTS || "",
		GLOBAL_PAYMENTS_ENDPOINT: process.env.GLOBAL_PAYMENTS_ENDPOINT || "",
		GTM_CODE: process.env.GTM_CODE || "",
		SHOULD_MOCK_MIDDLEWARE: process.env.SHOULD_MOCK_MIDDLEWARE || "",
		MIDDLEWARE_DE_ENDPOINT: process.env.MIDDLEWARE_DE_ENDPOINT || "",
		MIDDLEWARE_PORTAL_ENDPOINT: process.env.MIDDLEWARE_PORTAL_ENDPOINT || "",
		TRADE_PORTAL_LEGACY_SITE_URL: process.env.TRADE_PORTAL_LEGACY_SITE_URL || "",
		VERBOSITY: process.env.VERBOSITY || ""
	},
	output: "export",
	transpilePackages: ["trade-portal-components"]
};

module.exports = withBundleAnalyzer(nextConfig);
