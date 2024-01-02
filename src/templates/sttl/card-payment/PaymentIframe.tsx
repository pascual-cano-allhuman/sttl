import React from "react";
import { Box } from "trade-portal-components";
import { usePaymentIframe } from "./usePaymentIframe";

type PaymentIframeProps = {
	paymentRequest: any;
	onError: () => void;
	onSuccess: (data: object) => void;
	onProgress: () => void;
	onLoad: () => void;
	correlationData?: any;
};

export const PaymentIframe = ({ paymentRequest, onError, onSuccess, onProgress, onLoad, correlationData }: PaymentIframeProps) => {
	const { iframeContainerRef, iframeRef } = usePaymentIframe({ paymentRequest, onSuccess, onError, onProgress, onLoad, correlationData });

	if (paymentRequest?.mock) return <MockedIframe onSuccess={onSuccess} />;
	return (
		<Box display="block" ref={iframeContainerRef} background="#FFF" minHeight="400px">
			<iframe title="Payment Iframe" style={{ height: "900px" }} ref={iframeRef} />
		</Box>
	);
};

const MockedIframe = ({ onSuccess }: MockedIframeProps) => (
	<button type="button" onClick={() => onSuccess()} data-testid="mocked-iframe">
		Continue
	</button>
);

type MockedIframeProps = { onSuccess: (data?: any) => void };
