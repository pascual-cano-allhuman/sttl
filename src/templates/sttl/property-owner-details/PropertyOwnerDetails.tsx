import { useForm, FormProvider } from "react-hook-form";
import { Box, Checkbox, Stepper, Switch, ToggleButton } from "trade-portal-components";
import { FormFooter, FormHeader, FormStepContainer } from "templates";
import { UserAccount } from "models/global";
import { PropertyOwnerDetailsStep, Address } from "models/sttl";

import { AddressDisplay } from "../shared/AddressDisplay";
import { OwnerDetailsFields } from "./OwnerDetailsFields";
import { OwnerAddressFields } from "./OwnerAddressFields";

type TemplateProps = {
	onNextBtnClick: (values: any) => void;
	onPrevBtnClick: () => void;
	isEditing: boolean;
	defaultValues: PropertyOwnerDetailsStep;
	stepper: { step: number; label: string; total: number };
	propertyAddress: Address;
	userAccount: UserAccount;
};

export const PropertyOwnerDetails = (props: TemplateProps) => {
	const { onNextBtnClick, onPrevBtnClick, stepper, defaultValues, propertyAddress, userAccount, isEditing } = props;
	const nextLabel = isEditing ? "Save & continue" : "Next";
	const backLabel = isEditing ? "Cancel" : "Back";
	const title = "Property owner details";
	const subtitle = "The property owners name will be displayed on the Short Term Tourist Letting Register on the Fáilte Ireland website.";

	const methods = useForm({ mode: "all", defaultValues: { ...defaultValues, userIsOwnerCheck: getDefaultUserCheck(defaultValues, userAccount) } });
	const { register, watch, trigger, getValues, formState } = methods;
	const userIsOwnerCheck = watch("userIsOwnerCheck");
	const isAddressSameAsStlProperty = watch(`isAddressSameAsStlProperty`);
	const countryOfResidence = watch(`countryOfResidence`) || "Ireland";
	const isIreland = countryOfResidence === "Ireland";

	const nextBtnHandler = async () => {
		const isValid = await trigger(null, { shouldFocus: true });
		if (!isValid) return;
		if (isAddressSameAsStlProperty) onNextBtnClick({ ...getValues(), ownerAddress: undefined });
		else onNextBtnClick(getValues());
	};

	return (
		<FormStepContainer
			stepper={<Stepper totalSteps={stepper?.total} currentStep={stepper?.step} label={stepper.label} />}
			footer={
				<FormFooter
					onNextBtnClick={nextBtnHandler}
					onPrevBtnClick={onPrevBtnClick}
					isNextBtnDisabled={!userIsOwnerCheck}
					backBtnLabel={nextLabel}
					nextBtnLabel={backLabel}
				/>
			}
			header={<FormHeader title={title} subtitle={subtitle} />}
		>
			<Box columns={4} gap="3.2rem">
				<Switch error={formState?.errors["userIsOwnerCheck"]?.message} label="Are you the business owner?">
					<ToggleButton {...register("userIsOwnerCheck", { required: "Please select 'Yes' or 'No'" })} value="yes" id="yes">
						Yes
					</ToggleButton>
					<ToggleButton {...register("userIsOwnerCheck", { required: "Please select 'Yes' or 'No'" })} value="no" id="no">
						No
					</ToggleButton>
				</Switch>
				{userIsOwnerCheck && (
					<FormProvider {...methods}>
						<Box columns={4} gap="2.4rem">
							<OwnerDetailsFields userAccount={userAccount} />
							<Checkbox {...register(`isAddressSameAsStlProperty`)} checked={isAddressSameAsStlProperty} disabled={!isIreland}>
								Property owner address is the same as the Short Term Tourist Letting property address
							</Checkbox>
							{!isAddressSameAsStlProperty && <OwnerAddressFields />}
							{isAddressSameAsStlProperty && <AddressDisplay address={propertyAddress} hasBackground />}
						</Box>
					</FormProvider>
				)}
			</Box>
		</FormStepContainer>
	);
};

const getDefaultUserCheck = (defaultValues: PropertyOwnerDetailsStep, userAccount: UserAccount) => {
	if (!defaultValues.countryOfResidence) return;
	if (defaultValues.emailAddress === userAccount.email) return "yes";
	return "no";
};
