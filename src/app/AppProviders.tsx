"use client";

import React, { Suspense } from "react";
import { Theme, Layout } from "trade-portal-components";
import { LoaderWithContent } from "templates/global";
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
	const { auth, isLoadingData } = useAppContext();
	const { isLoggedIn, logout, login } = auth || {};
	const gap = !isLoadingData && !isLoggedIn ? "0" : null;
	const hasTransparentHeader = !isLoggedIn;
	return (
		<Layout links={links} isLoggedIn={isLoggedIn} logout={logout} login={login} gap={gap} hasTransparentHeader={hasTransparentHeader}>
			<Suspense>{isLoadingData ? <Loading /> : children}</Suspense>
		</Layout>
	);
};

const Loading = () => <LoaderWithContent>Just a moment while we load this page.</LoaderWithContent>;

export default AppProviders;
