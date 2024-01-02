import React from "react";
import { useForm } from "react-hook-form";
import { Box, Text, Divider, TextLink, Button, Checkbox, Alert, TickList, TableRows } from "trade-portal-components";

import { feesInfo } from "settings/feesInfo";

type Props = {
	onNextBtnClick: () => void;
	resumeRegistration?: () => void;
	hasPendingRegistration?: boolean;
	isNewUser?: boolean;
};

export const TermsAndConditions = (props: Props) => {
	const { onNextBtnClick, resumeRegistration, isNewUser, hasPendingRegistration } = props;

	const { register, trigger, formState } = useForm({ mode: "onChange" });
	const { errors } = formState;

	const nextBtnHandler = async () => {
		const isValid = await trigger(null, { shouldFocus: true });
		if (!isValid) return;
		onNextBtnClick();
	};

	const onResumeRegistration = (e: any) => {
		e.preventDefault();
		resumeRegistration();
	};

	return (
		<Box as="section" gap={["2.4rem", "3.2rem"]} padding="0 1.6rem" columns={8} margin="0 auto">
			{isNewUser && <Alert title="Account created successfully">Your Fáilte Ireland account has been created</Alert>}
			{!isNewUser && hasPendingRegistration && (
				<Alert title="Application in progress" status="error">
					You currently have a Short Term Tourist Letting Application in progress. You can&nbsp;
					<a href="/sttl/review" onClick={onResumeRegistration}>
						resume this application
					</a>
					&nbsp;or continue with a new application below.
				</Alert>
			)}
			<Box alignItems="center" borderRadius="8px" background="fi_surface_white" columns={8} padding="4rem 2.4rem 4.8rem 2.4rem">
				<Box columns={4} gap="4rem">
					<Box alignItems="center" justifyContent="center" gap={["2.4rem", "0.8rem"]}>
						<Text as="h1" color="fi_action_primary_100" textAlign="center" textStyle="heading_small">
							Register your Short Term Tourist Letting property
						</Text>
						<Box alignItems="center" justifyContent="center">
							<Text color="fi_text_60" textAlign="center" textStyle="text_large">
								To register one or more properties, the following is required
							</Text>
						</Box>
					</Box>
					<Box gap="1.6rem">
						<TickList
							items={[
								"Property address including Eircode*",
								"Details such as capacity information and confirmation that the property being registered is compliant with statutory obligations",
								"Details of the property owner",
								"There is no fee to register on the pilot register, fees will apply per property type, when the statutory register is launched"
							]}
						/>
					</Box>
					<Box>
						<Divider borderType="dashed" color="fi_action_primary_40" />
					</Box>

					<Box alignItems="center" gap="2.4rem">
						<Box alignItems="center" gap={["2.4rem", "0.8rem"]}>
							<Text as="h2" color="fi_action_primary_100" textAlign="center" textStyle="heading_extra_small">
								Property Type Fee Overview
							</Text>
						</Box>
						<Box>
							{feesInfo.map(({ header, rows }, index) => (
								<TableRows
									key={index}
									header={header}
									rows={rows}
									variant="with_header"
									borderBottom={index !== feesInfo.length - 1}
								/>
							))}
						</Box>
						<Box alignItems="center" gap="4rem">
							<Divider borderType="dashed" color="fi_action_primary_40" />
							<Text textStyle="text_small" textAlign="center">
								If you have more than 10 properties to register, Fáilte Ireland can help make this process easier. Call us on 0818
								888800 or email customersupport@failteireland.ie
							</Text>
							<Divider borderType="dashed" color="fi_action_primary_40" />
						</Box>
					</Box>

					{/* Qualifying criteria */}
					<Box alignItems="center" margin="0">
						<Text as="h2" color="fi_action_primary_100" textAlign="center" textStyle="heading_extra_small">
							To proceed please confirm the following
						</Text>
						<Box gap="1.6rem" margin="2.4rem 0 0 0">
							<Checkbox
								{...register(`confirm-sttl-1`, { required: "Please accept to continue" })}
								error={errors["confirm-sttl-1"]?.message}
								id="confirm-sttl-1"
							>
								(a) I am the property owner, or (b) I have obtained the consent of the property owner, to register this property on
								the pilot Short Term Tourist Letting Register
							</Checkbox>
							<Checkbox
								{...register(`confirm-sttl-2`, { required: "Please accept to continue" })}
								error={errors["confirm-sttl-2"]?.message}
								id="confirm-sttl-2"
							>
								I understand that property owner details are required and on completion of registration, the owners name will be
								displayed on the Short Term Tourist Letting Register on the Fáilte Ireland website
							</Checkbox>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box columns={8} alignItems="flex-end" margin={["0", "0.8rem 0"]}>
				<Box width={["100%", "9.5rem"]}>
					<Button width="100%" onClick={nextBtnHandler}>
						Confirm
					</Button>
				</Box>
			</Box>
			<Box columns={8} alignItems="center" justifyContent="center" gap="2.4rem" margin="0 0 16rem 0">
				<Text textStyle="text_small" textAlign="center" color="fi_text_60">
					*Contact customer support if the property being registered does not have an Eircode
				</Text>
				<Text textStyle="text_small" textAlign="center" color="fi_text_60">
					{`If more than one Short Term Tourist Letting (STTL) Property is being registered, each property is registered individually. When
					the first property is complete, there is an 'add another property' button.`}
				</Text>
				<Text textStyle="text_small" textAlign="center" color="fi_text_60">
					STTL registration numbers will not be issued on any property until registration is complete, there is no fee to register on the
					pilot register, fees will apply per property type, when the statutory register is launched.
				</Text>
				<Box columns={8} alignItems="center" justifyContent="center" flexDirection="row" gap="0.8rem" margin="1.6rem 0 0">
					<Text textStyle="text_small" color="fi_text_80">
						Need help?
					</Text>
					<TextLink
						variant="text_link"
						color="fi_action_primary_100"
						href={`${process.env.TRADE_PORTAL_DE_SITE_URL ?? ""}/sttl-info`}
						external
					>
						See our FAQs
					</TextLink>
				</Box>
			</Box>
		</Box>
	);
};
