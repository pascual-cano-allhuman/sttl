import { useEffect, useRef, useMemo, useState } from "react";

declare global {
	interface Window {
		Cypress: any;
		dataLayer: any;
		google_tag_manager: any;
	}
}

export const useTagManager = (gtmCode: string) => {
	// Holds a reference to the dataLayer object. Before GTM loads it just enqueues any event pushed
	const dataLayerRef = useRef(null);
	const [isSetup, setIsSetup] = useState(false);

	// Load the GTM library
	const loadScript = (window: any, document: any, gtmCode: string) =>
		new Promise(resolve => {
			// eslint-disable-next-line no-param-reassign
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				"gtm.start": new Date().getTime(),
				event: "gtm.js"
			});
			const tag = document.createElement("script");
			tag.async = true;
			tag.src = `https://www.googletagmanager.com/gtm.js?id=${gtmCode}`;
			tag.onload = () => {
				resolve(window.dataLayer);
			};
			document.head.appendChild(tag);
		});

	// On page load, get the GTM library
	useEffect(() => {
		if (!gtmCode || window["Cypress"]) return;
		loadScript(window, document, gtmCode).then(dataLayer => {
			dataLayerRef.current = dataLayer;
			setIsSetup(true);
		});
	}, [gtmCode]);

	// expose dataLayer object
	const dataLayer = useMemo(() => {
		if (!isSetup || !dataLayerRef.current) return;
		return {
			...dataLayerRef.current,
			trackPage: (pathname: string, title: string) => {
				window.google_tag_manager?.[gtmCode]?.dataLayer.reset();
				const event = { event: "virtualPageView", pageview_title: title, pageview_url: pathname, pageview_location: document.location.href };
				dataLayerRef.current.push(event);
			}
		};
	}, [dataLayerRef, isSetup]);

	return {
		dataLayer
	};
};

export type TagManager = ReturnType<typeof useTagManager>;
