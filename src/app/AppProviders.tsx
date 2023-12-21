"use client";

import React from "react";
import { Theme, Layout } from "trade-portal-components";
import { useRouter } from "next/navigation";
import { links } from "settings/layoutLinks";
import { StyledComponentsRegistry } from "lib/styled-components";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "lib/msal";
import { useAppContext, AppContextProvider } from "./AppContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	return (
		<MsalProvider instance={msalInstance}>
			<AppContextProvider>
				<StyledComponentsRegistry>
					<Theme assetsUrl="/" goToUrl={(url: string) => router.push(url)}>
						<GlobalLayout>{children}</GlobalLayout>
					</Theme>
				</StyledComponentsRegistry>
			</AppContextProvider>
		</MsalProvider>
	);
};

export const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
	const { auth } = useAppContext();
	const { isLoggedIn, logout } = auth;
	return (
		<Layout links={links} isLoggedIn={isLoggedIn} logout={logout}>
			{children}
		</Layout>
	);
};

export default AppProviders;
