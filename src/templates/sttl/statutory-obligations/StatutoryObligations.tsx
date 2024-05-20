import { useForm } from "react-hook-form";
import { Stepper, Box, Text, Divider, RadioGroup, Radio, Alert } from "trade-portal-components";
import { FormFooter, FormHeader, FormStepContainer } from "templates";
import { PermissionStatus, PERMISSION_ANALYTICS_MAP } from "models/global";
import { StatutoryObligationsStep } from "models";

const errorMessage = `You must select one of the options above in order to complete your application`;

type TemplateProps = {
	onNextBtnClick: (values: any) => void;
	onPrevBtnClick: () => void;
	isEditing: boolean;
	defaultValues: StatutoryObligationsStep;
	stepper: { step: number; label: string; total: number };
	dataLayer: any;
};

export const StatutoryObligations = (props: TemplateProps) => {
	const { stepper, onNextBtnClick, onPrevBtnClick, defaultValues, dataLayer, isEditing } = props;
	const nextLabel = isEditing ? "Save & continue" : "Next";
	const backLabel = isEditing ? "Cancel" : "Back";
	const title = "Statutory Obligations";
	const subtitle = "Please confirm if the property being registered is compliant with statutory obligations";

	const { watch, trigger, register, formState } = useForm({ mode: "onChange", defaultValues });
	const { permissionStatus } = watch();
	const error = formState.errors["permissionStatus"]?.message;
	const havePermission = permissionStatus !== PermissionStatus.do_not_have;

	const nextBtnHandler = async () => {
		if (!havePermission) return;
		const isValid = await trigger(null, { shouldFocus: true });
		if (isValid) {
			const planningPermissionOption = PERMISSION_ANALYTICS_MAP[permissionStatus];
			dataLayer?.push?.({ event: "planningPermission", planningPermissionOption });
			onNextBtnClick({ ...watch() });
		}
	};

	if (!defaultValues) return null;
	return (
		<FormStepContainer
			stepper={<Stepper totalSteps={stepper?.total} currentStep={stepper.step} label={stepper.label} />}
			footer={
				<FormFooter
					onNextBtnClick={nextBtnHandler}
					onPrevBtnClick={onPrevBtnClick}
					nextBtnLabel={nextLabel}
					backBtnLabel={backLabel}
					showDiscardApplication={!isEditing}
				/>
			}
			header={<FormHeader title={title} subtitle={subtitle} />}
		>
			<Box columns={4} gap="4rem">
				<Box gap="1.6rem">
					<Divider />
					<Text>
						Every property owner is required to fulfil and comply with relevant statutory obligations*. Failure by a property owner to
						comply with statutory obligations may be a basis on which Fáilte Ireland decides to deregister their property.
					</Text>

					<Divider />
				</Box>
				<Box gap="2.4rem">
					<RadioGroup name="permissionStatus" error={error} label="Please confirm which of the following applies to you">
						<Radio
							{...register("permissionStatus", { required: errorMessage })}
							value={PermissionStatus.have}
							id={PermissionStatus.have}
							invalid={!!error}
						>
							I confirm that I understand the above and I am happy to proceed{" "}
						</Radio>
						<Radio
							{...register("permissionStatus", { required: errorMessage })}
							value={PermissionStatus.will_have}
							id={PermissionStatus.will_have}
							invalid={!!error}
						>
							I would like to avail of the clarification period which runs until no later than 31 st October 2023. If I do not revert to
							Fáilte Ireland to confirm the property’s compliance with relevant statutory obligations by this date, I am aware that
							Fáilte Ireland will remove me from the register.
						</Radio>
						<Radio
							{...register("permissionStatus", { required: errorMessage })}
							value={PermissionStatus.do_not_have}
							id={PermissionStatus.do_not_have}
							invalid={!havePermission || !!error}
						>
							I am not compliant
						</Radio>
					</RadioGroup>
					<Box margin="1.6rem 0 0 0">
						<Text textStyle="text_small" color="fi_text_90">
							*These include but are not limited to Health & Safety, GDPR, Planning Regulations, Revenue Returns, Licensing etc.
						</Text>
					</Box>
					{!havePermission && (
						<Alert status="error" hasCloseIcon={false}>
							You are unable to proceed with your application without the required statutory obligations in place
						</Alert>
					)}
				</Box>
			</Box>
		</FormStepContainer>
	);
};
export default StatutoryObligations;
