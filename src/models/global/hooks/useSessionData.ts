import React from "react";
import { v1 as uuid } from "uuid";

export const useSessionData = () => {
	// correlationId identifies the user session
	const correlationId = React.useMemo(() => {
		if (typeof window === "undefined") return;
		const correlationIdFromStorage = sessionStorage.getItem ? sessionStorage.getItem("correlationId") : null;
		if (correlationIdFromStorage) return correlationIdFromStorage;
		const correlationId = uuid();
		if (sessionStorage.setItem) sessionStorage.setItem("correlationId", correlationId);
		return correlationId;
	}, []);

	return { correlationId };
};

// clear the session storage
export const clearSessionStorage = () => {
	if (!sessionStorage.removeItem) return;
	sessionStorage.removeItem("correlationId");
};
