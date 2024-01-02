import React from "react";
import { IframeEventTypes, loadPaymentsForm, processIframeEvent } from "lib/global-payments";

export const usePaymentIframe = ({ paymentRequest, onSuccess, onError, onProgress, onLoad, correlationData }) => {
	const iframeContainerRef = React.useRef(null);
	const iframeRef = React.useRef(null);

	// handle the iframe message
	const onIframeMessage = React.useMemo(
		() => (e: MessageEvent) => {
			const event = processIframeEvent(e);
			switch (event?.type) {
				case IframeEventTypes.SUCCESS:
					onSuccess(event.data);
					break;
				case IframeEventTypes.ERROR:
					onError();
					break;
				case IframeEventTypes.RESIZE:
					onProgress();
					iframeRef.current.style.height = event.height;
					break;
				default:
					break;
			}
		},
		[onSuccess, onError, onProgress, iframeRef]
	);

	// setup message listener
	React.useEffect(() => {
		window.addEventListener("message", onIframeMessage);
		return () => window.removeEventListener("message", onIframeMessage);
	}, [onIframeMessage]);

	// load the global payments from onto the iframe when payment data is received
	React.useEffect(() => {
		if (paymentRequest?.mock) return onLoad();
		if (!paymentRequest) return;
		if (iframeRef.current) iframeContainerRef.current?.removeChild(iframeRef.current);
		const iframeElement = document.createElement("iframe");
		iframeElement.style.width = "100%";
		iframeElement.style.height = "920px";
		iframeElement.style.overflowX = "hidden";
		iframeContainerRef.current.append(iframeElement);
		iframeRef.current = iframeElement;
		try {
			loadPaymentsForm(iframeElement, paymentRequest, correlationData);
			if (onLoad) iframeElement.onload = () => onLoad();
		} catch (e) {
			console.log(e); // eslint-disable-line no-console
		}
	}, [paymentRequest]); // eslint-disable-line react-hooks/exhaustive-deps

	return { iframeContainerRef, iframeRef };
};
