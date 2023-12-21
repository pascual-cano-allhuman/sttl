import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "settings/authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);
