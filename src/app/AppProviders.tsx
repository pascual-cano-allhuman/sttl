"use client";

import React, { Suspense } from "react";
import { Theme, Layout } from "trade-portal-components";
import { LoaderWithContent } from "templates/global";
import { useRouter } from "next/navigation";
import { links } from "settings/layoutLinks";
import { StyledComponentsRegistry } from "lib/styled-components";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "lib/msal";
import { usePathname } from "next/navigation";
import { backgroundURL } from "settings/background";
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
	const { auth, isLoadingAccount } = useAppContext();
	const { isLoggedIn, logout } = auth || {};
	const pathname = usePathname();
	const backgroundStyle = `#D0E9E9 ${backgroundURL} fixed no-repeat`;
	return (
		<Layout
			links={links}
			isLoggedIn={isLoggedIn}
			logout={logout}
			hasTransparentHeader
			backgroundSize="100%"
			background={backgroundStyle}
			currentPathname={pathname}
		>
			<Suspense>{isLoadingAccount ? <Loading /> : children}</Suspense>
		</Layout>
	);
};

const Loading = () => <LoaderWithContent>Please wait while we are processing your data.</LoaderWithContent>;

export default AppProviders;
