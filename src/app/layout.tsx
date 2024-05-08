import type { Metadata } from "next";
import ReactDOM from "react-dom";
import packageInfo from "../../package.json";
import { AppProviders } from "./AppProviders";
import "./fonts.css";

export const metadata: Metadata = {
	title: "Short Term Tourist Letting - Fáilte Ireland",
	robots: process.env.DISALLOW_ROBOTS === "true" ? "noindex, nofollow" : null,
	icons: {
		icon: ["/favicon.ico", "/apple-icon.png"],
		apple: "/apple-icon.png"
	},
	other: {
		distribution: `v${packageInfo.version || "0.0.0"}`
	}
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	ReactDOM.preload("/webfonts/cera_pro_regular-webfont.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
	ReactDOM.preload("/webfonts/cera_pro_bold-webfont.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
	return (
		<html lang="en">
			<body>
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
};

export default RootLayout;
