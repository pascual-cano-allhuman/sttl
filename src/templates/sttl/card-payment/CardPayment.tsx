import React from "react";
import { Alert, Box } from "trade-portal-components";
import { FormStepContainer, LoaderWithContent } from "templates/global";
import { PaymentIframe } from "./PaymentIframe";

type CardPaymentProps = {
	alert: Alert;
	closeAlert: () => void;
	onError: () => void;
	onSuccess: (paymentResponse: any) => void;
	paymentRequest: any;
	correlation: Record<string, string>;
};
export const CardPayment = (props: CardPaymentProps) => {
	const { onError, onSuccess, correlation, paymentRequest, alert, closeAlert } = props;
	const [isLoading, setIsLoading] = React.useState(true);
	const [isSuccessful, setIsSuccessful] = React.useState(false);
	return (
		<>
			{isLoading && <LoaderWithContent>Please wait while we are processing your order.</LoaderWithContent>}
			<Box display={isLoading || isSuccessful ? "none" : "flex"} alignItems="center">
				<FormStepContainer
					padding={["2rem 1rem 1rem", "4.8rem 1rem 1rem"]}
					alert={
						alert && (
							<Alert title={alert.title} status={alert.type} hasCloseIcon={false}>
								{alert.message}
							</Alert>
						)
					}
				>
					<PaymentIframe
						paymentRequest={paymentRequest}
						onLoad={() => {
							setIsLoading(false);
						}}
						onError={() => {
							setIsLoading(true);
							onError();
						}}
						onProgress={() => {
							closeAlert();
						}}
						onSuccess={res => {
							setIsSuccessful(true);
							onSuccess(res);
						}}
						correlationData={correlation}
					/>
				</FormStepContainer>
			</Box>
		</>
	);
};
