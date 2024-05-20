import { Box } from "trade-portal-components";
import React from "react";

type Props = {
	children: React.ReactNode;
	stepper?: React.ReactNode;
	footer?: React.ReactNode;
	header?: React.ReactNode;
	alert?: React.ReactNode;
	marginBottom?: string;
	gap?: string;
	padding?: string | Array<string>;
};

export const FormStepContainer = (props: Props) => {
	const { children, stepper, footer, header, alert } = props;
	const { marginBottom = "16rem", padding = ["4rem 2.4rem 4.8rem", "4rem 4rem 4.8rem"], gap = "4rem" } = props;
	return (
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
};
