import React from "react";
import { usePathname, useRouter } from "next/navigation";

export type Alert = {
	type?: "success" | "error";
	title?: string;
	message: string;
	showOnUrl?: string;
};

export const useAlert = () => {
	const [alert, setAlert] = React.useState<Alert>(null);
	const pathname = usePathname();
	const router = useRouter();

	// close the alert
	const closeAlert = () => {
		setAlert(null);
	};

	// show an alert
	const showAlert = (alert: Alert) => {
		setAlert(alert);
		window.scroll(0, 0);
	};

	// go to an url and show the alert
	const showAlertOnUrl = (alert: Alert, url: string) => {
		router.push(url);
		setAlert({ ...alert, showOnUrl: url });
	};

	// close alert if the user navigates to a different page
	React.useEffect(() => {
		if (pathname === alert?.showOnUrl) return;
		closeAlert();
	}, [pathname]);

	return {
		alert,
		closeAlert,
		showAlert,
		showAlertOnUrl
	};
};

export type AlertReturnType = ReturnType<typeof useAlert>;
