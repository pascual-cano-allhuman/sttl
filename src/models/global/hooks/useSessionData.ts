import React from "react";
import { v1 as uuid } from "uuid";

export const useSessionData = () => {
	// correlationId identifies the user session
	const [correlationId, setCorrelationId] = React.useState<string>();

	// init correlation id from session storage if available
	React.useEffect(() => {
		if (typeof window === "undefined") return;
		const correlationIdFromStorage = sessionStorage.getItem ? sessionStorage.getItem("correlationId") : null;
		if (correlationIdFromStorage) setCorrelationId(correlationIdFromStorage);
		else resetCorrelationId();
	}, []);

	// recreate the session by resetting the correlation id
	const resetCorrelationId = () => {
		const correlationId = uuid();
		if (sessionStorage.setItem) sessionStorage.setItem("correlationId", correlationId);
		setCorrelationId(correlationId);
	};

	return { correlationId, resetCorrelationId };
};

// clear the session storage
export const clearSessionStorage = () => {
	if (!sessionStorage.removeItem) return;
	sessionStorage.removeItem("correlationId");
};
