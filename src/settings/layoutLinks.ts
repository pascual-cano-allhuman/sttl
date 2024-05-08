const TRADE_PORTAL_LEGACY_SITE_URL = process.env.TRADE_PORTAL_LEGACY_SITE_URL?.replace(/\/$/, "") || "";

export const accountLinks = [
	{
		url: "/dashboard",
		label: "My properties"
	},
	{
		url: "/dashboard/payment-history",
		label: "Payment history"
	}
];

export const portalLinks = [
	{
		label: "Trade Portal Home",
		url: `${TRADE_PORTAL_LEGACY_SITE_URL}/`,
		subPages: []
	},
	{
		label: "Trade Events",
		url: "/",
		subPages: [
			{
				label: "Overview",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/trade-events/`
			},
			{
				label: "Trade events list",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/upcoming-events/`
			},
			{
				label: "Trade events calendar",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/calendar-view/`
			},
			{
				label: "My trade events",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/my-events/`
			}
		]
	},
	{
		label: "Enterprise Supports",
		url: "/",
		subPages: [
			{
				label: "Overview",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/enterprise-supports/`
			},
			{
				label: "Live training events list",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/upcoming-business-supports/`
			},
			{
				label: "Live training events calendar",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/business-supports-calendar-view/`
			},
			{
				label: "My live training events",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/my-business-supports/`
			},
			{
				label: "On demand business support",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/on-demand-business-supports/`
			},
			{
				label: "'On Demand' eLearning Hub",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/on-demand-elearning-hub/`
			}
		]
	},
	{
		label: "Quality Assurance",
		url: "/",
		subPages: [
			{
				label: "Overview",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/registration-grading/`
			},
			{
				label: "Assessments",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/selfassessments/`
			},
			{
				label: "Renewals",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/registration-grading/renewal-form/`
			},
			{
				label: "Applications",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/registration-grading/applications/`
			}
		]
	},
	{
		label: "Opportunities",
		url: "/",
		subPages: [
			{
				label: "Overview",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/opportunities/`
			},
			{
				label: "New opportunities",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/new-opportunities/`
			},
			{
				label: "This year's opportunities",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/this-year-opportunities/`
			},
			{
				label: "All opportunities",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/all-opportunities/`
			}
		]
	},
	{
		label: "Funding",
		url: "/",
		subPages: [
			{
				label: "Overview",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/grantapp/`
			},
			{
				label: "Create new application",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/grantapp/`
			},
			{
				label: "My existing applications",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/financial-supports/`
			},
			{
				label: "Funding schemes",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/financial-supports/`
			},
			{
				label: "Support requests",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/my-support-requests/`
			}
		]
	},
	{
		label: "Short Term Tourist Letting Register",
		url: "/",
		subPages: [
			{
				label: "Overview and FAQ's",
				url: `https://thankful-bush-03dc0ab03.2.azurestaticapps.net/sttl-info`
			},
			{
				label: "Register now",
				url: "/sttl"
			}
		]
	}
];

export const footerLinks = [
	{
		url: `https://www.failteireland.ie/Footer/Accessibility.aspx`,
		label: "Accessibility"
	},
	{
		url: `https://www.failteireland.ie/Footer/Data-Protection.aspx`,
		label: "Data Protection"
	},
	{
		url: `https://www.failteireland.ie/Footer/freedom-of-information.aspx `,
		label: "Freedom of Information"
	},
	{
		url: `https://www.failteireland.ie/Footer/Legal-Terms.aspx`,
		label: "Legal Terms"
	},
	{ url: `https://www.failteireland.ie/privacy.aspx`, label: "Privacy Policy" },
	{ url: `https://www.failteireland.ie/cookies.aspx`, label: "Cookie Policy" }
];

export const links = {
	footerLinks,
	accountLinks,
	homePageUrl: `${process.env.TRADE_PORTAL_LEGACY_SITE_URL || "/"}`,
	activePortalLink: portalLinks[portalLinks.length - 1]
};
