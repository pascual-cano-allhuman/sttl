const GTM_HEADER_CLASS = "gtm-header";
const TRADE_PORTAL_LEGACY_SITE_URL = process.env.TRADE_PORTAL_LEGACY_SITE_URL?.replace(/\/$/, "") || "";

export const accountLinks = [
	{
		url: `${TRADE_PORTAL_LEGACY_SITE_URL}/profile/`,
		label: "My profile"
	},
	{
		url: `${TRADE_PORTAL_LEGACY_SITE_URL}/my-payments/`,
		label: "My payment history"
	},
	{
		url: `${TRADE_PORTAL_LEGACY_SITE_URL}/communication-preferences/`,
		label: "Preference centre"
	},
	{
		url: `${TRADE_PORTAL_LEGACY_SITE_URL}/enquiries/`,
		label: "Enquiries"
	}
];

export const portalLinks = [
	{
		id: "trade_portal_home",
		label: "Trade Portal Home",
		url: `${TRADE_PORTAL_LEGACY_SITE_URL}/`,
		subPages: []
	},
	{
		id: "trade_events",
		label: "Trade Events",
		url: "/",
		subPages: [
			{
				id: "overview",
				label: "Overview",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/trade-events/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "trade_events_list",
				label: "Trade events list",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/upcoming-events/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "trade_events_calendar",
				label: "Trade events calendar",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/calendar-view/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "my_trade_events",
				label: "My trade events",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/my-events/`,
				gtmClass: GTM_HEADER_CLASS
			}
		]
	},
	{
		id: "enterprise_support",
		label: "Enterprise Supports",
		url: "/",
		subPages: [
			{
				id: "overview",
				label: "Overview",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/enterprise-supports/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "live_training_events_list",
				label: "Live training events list",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/upcoming-business-supports/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "live_training_events_calendar",
				label: "Live training events calendar",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/business-supports-calendar-view/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "my_live_training_events_events",
				label: "My live training events",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/my-business-supports/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "on_demand_business_support",
				label: "On demand business support",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/on-demand-business-supports/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "on_demand_eLearning_hub",
				label: "'On Demand' eLearning Hub",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/on-demand-elearning-hub/`,
				gtmClass: GTM_HEADER_CLASS
			}
		]
	},
	{
		id: "quality_assurance",
		label: "Quality Assurance",
		url: "/",
		subPages: [
			{
				id: "overview",
				label: "Overview",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/registration-grading/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "assessments",
				label: "Assessments",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/selfassessments/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "renewals",
				label: "Renewals",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/QARenewal/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "applications",
				label: "Applications",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/QAApplication/`,
				gtmClass: GTM_HEADER_CLASS
			}
		]
	},
	{
		id: "opportunities",
		label: "Opportunities",
		url: "/",
		subPages: [
			{
				id: "overview",
				label: "Overview",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/opportunities/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "new_opportunities",
				label: "New opportunities",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/new-opportunities/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "year_opportunities",
				label: "This year's opportunities",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/this-year-opportunities/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "all_opportunities",
				label: "All opportunities",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/all-opportunities/`,
				gtmClass: GTM_HEADER_CLASS
			}
		]
	},
	{
		id: "funding",
		label: "Funding",
		url: "/",
		subPages: [
			{
				id: "overview",
				label: "Overview",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/supports/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "create_new_application",
				label: "Create new application",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/grantapp/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "existing_application",
				label: "My existing applications",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/financial-supports/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "funding_schemes",
				label: "Funding schemes",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/financial-supports/`,
				gtmClass: GTM_HEADER_CLASS
			},
			{
				id: "support_requests",
				label: "Support requests",
				url: `${TRADE_PORTAL_LEGACY_SITE_URL}/my-support-requests/`,
				gtmClass: GTM_HEADER_CLASS
			}
		]
	}
];

export const footerLinks = [
	{
		url: "https://www.failteireland.ie/Footer/Accessibility.aspx",
		label: "Accessibility"
	},
	{
		url: "https://www.failteireland.ie/Footer/Data-Protection.aspx",
		label: "Data Protection"
	},
	{
		url: "https://www.failteireland.ie/Footer/freedom-of-information.aspx ",
		label: "Freedom of Information"
	},
	{
		url: "https://www.failteireland.ie/Footer/Legal-Terms.aspx",
		label: "Legal Terms"
	},
	{ url: "https://www.failteireland.ie/privacy.aspx", label: "Privacy Policy" },
	{ url: "https://www.failteireland.ie/cookies.aspx", label: "Cookie Policy" }
];

export const links = {
	footerLinks,
	accountLinks,
	portalLinks,
	homePageUrl: `${process.env.TRADE_PORTAL_LEGACY_SITE_URL || "/"}`,
	activePortalLink: portalLinks.find(link => link.id === "quality_assurance")
};
