import type { Metadata } from "next";
import packageInfo from "../../package.json";
import { AppProviders } from "./AppProviders";
import "./fonts.css";

export const metadata: Metadata = {
	title: "Short Term Tourist Letting - Fáilte Ireland",
	robots: process.env.DISALLOW_ROBOTS === "true" ? "noindex, nofollow" : null,
	other: {
		distribution: `v${packageInfo.version || "0.0.0"}`
	}
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
};
export default RootLayout;
