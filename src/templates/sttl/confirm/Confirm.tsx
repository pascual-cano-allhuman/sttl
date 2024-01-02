import React from "react";
import { Text, TextLink, Box } from "trade-portal-components";
import { FormHeader, FormStepContainer, NeedHelp } from "templates/global";
import { PropertyEntry } from "./PropertyEntry";

type Props = {
	orderResult: Record<string, any>;
};

export const Confirm = (props: Props) => {
	const { orderResult } = props;

	const { hasRegisteredProperties, registrations } = React.useMemo(() => {
		const registrations = orderResult || [];
		const hasRegisteredProperties = registrations.length > 0;
		return { hasRegisteredProperties, registrations };
	}, [orderResult]);

	const { title, subtitle } = hasRegisteredProperties ? TITLES["success"] : TITLES["failure"];

	return (
		<Box marginBottom="16rem" alignItems="center">
			<FormStepContainer
				marginBottom="2.4rem"
				header={
					<FormHeader title={title} subtitle={subtitle}>
						<Box alignItems="center" paddingTop="1.6rem">
							<TextLink variant="text_link" href="/dashboard" color="fi_action_primary_100">
								View dashboard
							</TextLink>
						</Box>
					</FormHeader>
				}
			>
				{hasRegisteredProperties && (
					<Box columns={4} paddingTop="0.8rem" gap="1.6rem">
						{registrations.map((registration, index: number) => (
							<PropertyEntry key={index} {...registration} />
						))}
						<Text color="fi_text_90" lineHeight="2.1rem">
							Please ensure that your STTL number is updated on all booking platforms (including property websites) and advertisements.
							This number is valid for 12 months.
						</Text>
						<Text color="fi_text_90" lineHeight="2.1rem">
							Full details of all your properties and payment history can be found in your Trade Portal STTL dashboard. For information
							about how to use your STTL numbers{" "}
							<TextLink
								variant="text_link"
								href={`${process.env.TRADE_PORTAL_DE_SITE_URL ?? ""}/sttl-info`}
								color="fi_action_primary_100"
							>
								see our FAQs
							</TextLink>
						</Text>
					</Box>
				)}
			</FormStepContainer>
			´
			{!hasRegisteredProperties && (
				<Box columns="8" margin="0 auto">
					<NeedHelp />
				</Box>
			)}
		</Box>
	);
};

const TITLES = {
	success: {
		title: "Registration successful",
		subtitle: "Your Short Term Tourist Letting (STTL) accommodation has been registered."
	},
	failure: {
		title: "Registration pending",
		subtitle: `Your payment was successful and your registration will be processed shortly. You will be notified by email and your dashboard will be updated as soon as possible.`
	}
};
