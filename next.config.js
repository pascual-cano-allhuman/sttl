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
		GTM_CODE: process.env.GTMCODE || "",
		TRADE_PORTAL_LEGACY_SITE_URL: process.env.TRADE_PORTAL_LEGACY_SITE_URL || "",
		TRADE_PORTAL_STTL_APP_URL: process.env.TRADE_PORTAL_STTL_APP_URL || "",
		FAILTE_IRELAND_SITE_URL: process.env.FAILTE_IRELAND_SITE_URL || "",
		DISALLOW_ROBOTS: process.env.DISALLOW_ROBOTS || "",
		B2C_CLIENT_ID: process.env.B2C_CLIENT_ID || "",
		B2C_DOMAIN: process.env.B2C_DOMAIN || "",
		B2C_LOGOUT_URI: process.env.B2C_LOGOUT_URI || "",
		B2C_TENANT: process.env.B2C_TENANT || ""
	},
	output: "export",
	transpilePackages: ["trade-portal-components"]
};

module.exports = withBundleAnalyzer(nextConfig);
