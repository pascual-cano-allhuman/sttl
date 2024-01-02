import React from "react";
import { Alert, Box, Stepper, Checkbox, Button, ScrollableContainer, CollapsePanel, Modal, Text } from "trade-portal-components";
import { FormFooter, FormHeader, FormStepContainer } from "templates";
import { useForm } from "react-hook-form";
import { PropertyData } from "models/sttl";
import { AddressDisplay } from "../shared/AddressDisplay";
import { FeesOverview } from "./FeesOverview";
import { PropertyListItem } from "./PropertyListItem";

type TemplateProps = {
	propertiesList: PropertyData[];
	fees: { total: number; subtotals: Record<string, number> };
	createCardPayment: () => void;
	processZeroPayment: () => void;
	applyForQAMembership: () => void;
	registerNewProperty: () => void;
	goToEditStep: (formStep: string, entry: number) => void;
	deleteProperty: (entry: number) => void;
	stepper: { step: number; label: string; total: number };
	alert: { type?: "success" | "error"; title?: string; message?: string };
	dataLayer: any;
};

const hasCardPaymentDisabled = process.env.DISABLE_CARD_PAYMENTS;

export const Review = (props: TemplateProps) => {
	const { propertiesList, fees, stepper, alert, dataLayer } = props;
	const { createCardPayment, processZeroPayment, applyForQAMembership, registerNewProperty, goToEditStep, deleteProperty } = props;
	const [expandedPanelIndex, setExpandedPanelIndex] = React.useState<number>(propertiesList?.length === 1 ? 0 : null);
	const [modalPropertyIndex, setModalPropertyIndex] = React.useState<number>(null);
	const { register, getValues } = useForm();
	const hasMoreThan10 = propertiesList?.length > 10;

	const nextBtnHandler = async () => {
		if (!propertiesList?.length) return;
		if (getValues("agreeToQualityAssuredInfo")) applyForQAMembership();
		if (hasMoreThan10) dataLayer?.push({ event: "multipleProperties", numberOfProperties: propertiesList.length });
		if (hasCardPaymentDisabled) processZeroPayment();
		else createCardPayment();
	};

	const subtitle = propertiesList?.length
		? "Please ensure all information is accurate, as these details will appear on the Short Term Tourist Letting Register which will be publicly available on the Fáilte Ireland website"
		: "You have no properties available to review. Please add a property or exit the application.";

	return (
		<FormStepContainer
			stepper={<Stepper totalSteps={stepper?.total} currentStep={stepper?.step} label={stepper?.label} />}
			footer={<FormFooter onNextBtnClick={nextBtnHandler} nextBtnLabel="Continue to payment" isNextBtnDisabled={!propertiesList?.length} />}
			header={<FormHeader title="Review details" subtitle={subtitle} />}
			alert={alert && <Alert title={alert?.title} status={alert.type} message={alert?.message} />}
			gap="1.6rem"
		>
			<Box gap="2.4rem" columns={4} alignItems="stretch">
				{hasMoreThan10 && (
					<Box padding="0 0 1.6rem 0">
						<Button onClick={registerNewProperty} variant="secondary" width="100%" size="medium" trailingIcon="fi-arrow-right">
							Register another property
						</Button>
					</Box>
				)}
				<ScrollableContainer maxHeight={hasMoreThan10 ? "calc(10*56.5px)" : "unset"}>
					<Box gap={hasMoreThan10 ? "0" : "1.6rem"} as="ul">
						{propertiesList?.map((property, index) => {
							const { propertyAddress } = property.property_address;
							const onEditClick = (step: string) => goToEditStep(step, index);
							return (
								<CollapsePanel
									as="li"
									key={index}
									title={`Property ${index + 1}`}
									subtitle={`${propertyAddress.addressLine1}, ${propertyAddress.postcode}`}
									padding="0"
									variant={hasMoreThan10 ? "list" : "default"}
									ordinalNumber={index + 1}
									isCollapsed={index !== expandedPanelIndex}
									onExpand={() => setExpandedPanelIndex(index)}
									onCollapse={() => setExpandedPanelIndex(null)}
								>
									<PropertyListItem property={property} onEditClick={onEditClick} />
									<Box marginTop="1.6rem" overflow="visible">
										<Text
											as="button"
											textStyle="link_caption"
											textDecoration="underline"
											onClick={() => setModalPropertyIndex(index)}
										>
											Delete this application
										</Text>
									</Box>
								</CollapsePanel>
							);
						})}
					</Box>
				</ScrollableContainer>

				{propertiesList?.length > 0 && (
					<>
						<FeesOverview total={fees.total} subtotals={fees.subtotals} />
						<Checkbox {...register(`agreeToQualityAssuredInfo`)}>
							For further information on being Quality Assured, please tick here
						</Checkbox>
						<p>{modalPropertyIndex}</p>
					</>
				)}
				{!hasMoreThan10 && (
					<Button onClick={registerNewProperty} variant="secondary" width="100%" size="medium" trailingIcon="fi-arrow-right">
						Register another property
					</Button>
				)}
			</Box>
			<Modal
				isOpen={modalPropertyIndex !== null}
				title="Remove property"
				description="Are you sure you want to delete this property?"
				primaryAction={{
					label: "Remove property",
					onClick: () => {
						deleteProperty(modalPropertyIndex);
						setModalPropertyIndex(null);
					}
				}}
				onClose={() => setModalPropertyIndex(null)}
			>
				<Box marginTop="1rem">
					<AddressDisplay address={propertiesList[modalPropertyIndex]?.property_address.propertyAddress} hasBackground />
				</Box>
			</Modal>
		</FormStepContainer>
	);
};
