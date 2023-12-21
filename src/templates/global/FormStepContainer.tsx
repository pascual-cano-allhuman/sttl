import { Box } from "trade-portal-components";
import React from "react";

type FormStepContainerProps = {
	children: React.ReactNode;
	stepper?: React.ReactNode;
	footer?: React.ReactNode;
	header?: React.ReactNode;
	alert?: React.ReactNode;
	marginBottom?: string;
	gap?: string;
	padding?: string | Array<string>;
};

export const FormStepContainer = ({
	children,
	stepper,
	footer,
	header,
	alert,
	marginBottom = "16rem",
	padding = ["4rem 2.4rem 4.8rem", "4rem 4rem 4.8rem"],
	gap = "4rem"
}: FormStepContainerProps) => (
	<Box columns={8} margin={`0 auto ${marginBottom}`} padding="0 1.6rem">
		<Box gap={["1.6rem", "3.2rem"]}>
			{stepper}
			{alert}
			<Box alignItems="center" background="white" borderRadius="8px" padding={padding} gap={gap}>
				{header}
				{children}
			</Box>
			{footer}
		</Box>
	</Box>
);
