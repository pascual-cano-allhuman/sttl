/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
const B2C_TENANT = process.env.B2C_TENANT || "";
const B2C_DOMAIN = process.env.B2C_DOMAIN || "";
export const b2cPolicies = B2C_TENANT
	? {
			authorities: {
				signUpSignIn: {
					authority: `${B2C_DOMAIN}/${B2C_TENANT}.onmicrosoft.com/B2C_1A_FISIGNUP_SIGNIN`
				},
				forgotPassword: {
					authority: `${B2C_DOMAIN}/${B2C_TENANT}.onmicrosoft.com/v2.0/B2C_1A_FIPROFILEPASSWORDRESET`
				},
				editProfile: {
					authority: `${B2C_DOMAIN}/${B2C_TENANT}.onmicrosoft.com/B2C_1A_FIPROFILEPASSWORDRESET`
				}
			},
			authorityDomain: `${B2C_DOMAIN}`
	  }
	: { authorities: { signUpSignIn: {} } };

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
	auth: {
		clientId: process.env.B2C_CLIENT_ID, // This is the ONLY mandatory field that you need to supply.
		authority: b2cPolicies.authorities.signUpSignIn.authority, // Use a sign-up/sign-in user-flow as a default authority
		knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C B2C_TENANT's domain as trusted.
		redirectUri: "/", // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
		postLogoutRedirectUri: process.env.B2C_LOGOUT_URI || "/", // Indicates the page to navigate after logout.
		navigateToLoginRequestUrl: false // If "true", will navigate back to the original request location before processing the auth code response.
	},
	cache: {
		cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
		storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
	}
};
