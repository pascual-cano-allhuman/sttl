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
	defaultValues: PropertyOwnerDetailsStep & { userIsOwnerCheck?: "Yes" | "No" };
	stepper: { step: number; label: string; totalSteps: number };
	propertyAddress: Address;
	accountData: UserAccount;
};

export const PropertyOwnerDetails = (props: TemplateProps) => {
	const { onNextBtnClick, onPrevBtnClick, stepper, defaultValues, propertyAddress, accountData } = props;
	const methods = useForm({ mode: "all", defaultValues });
	const { register, watch, trigger, getValues, formState } = methods;

	const isAddressSameAsStlProperty = watch(`isAddressSameAsStlProperty`);
	const countryOfResidence = watch(`countryOfResidence`) || "Ireland";
	const isIreland = countryOfResidence === "Ireland";
	const userIsOwnerCheck = watch("userIsOwnerCheck");

	const nextBtnHandler = async () => {
		const isValid = await trigger(null, { shouldFocus: true });
		if (!isValid) return;
		if (isAddressSameAsStlProperty) onNextBtnClick({ ...getValues(), ownerAddress: undefined });
		else onNextBtnClick(getValues());
	};

	return (
		<FormStepContainer
			stepper={<Stepper totalSteps={stepper?.totalSteps} currentStep={stepper?.step} label={stepper.label} />}
			footer={
				<FormFooter
					onNextBtnClick={nextBtnHandler}
					onPrevBtnClick={onPrevBtnClick}
					isNextBtnDisabled={!userIsOwnerCheck}
					nextBtnLabel="Save & continue"
				/>
			}
			header={
				<FormHeader
					title="Property owner details"
					subtitle="The property owners name will be displayed on the Short Term Tourist Letting Register on the Fáilte Ireland website."
				/>
			}
		>
			<Box columns={4} gap="3.2rem">
				<Switch error={formState?.errors["userIsOwnerCheck"]?.message} label="Are you the business owner?">
					<ToggleButton {...register("userIsOwnerCheck", { required: "Please select 'Yes' or 'No'" })} value="Yes" id="Yes">
						Yes
					</ToggleButton>
					<ToggleButton {...register("userIsOwnerCheck", { required: "Please select 'Yes' or 'No'" })} value="No" id="No">
						No
					</ToggleButton>
				</Switch>
				{userIsOwnerCheck && (
					<FormProvider {...methods}>
						<Box columns={4} gap="2.4rem">
							<OwnerDetailsFields accountData={accountData} />
							<Checkbox {...register(`isAddressSameAsStlProperty`)} checked={isAddressSameAsStlProperty} disabled={!isIreland}>
								Property owner address is the same as the Short Term Tourist Letting property address
							</Checkbox>
							{!isAddressSameAsStlProperty && <OwnerAddressFields />}
							{isAddressSameAsStlProperty && <AddressDisplay propertyAddress={propertyAddress} />}
						</Box>
					</FormProvider>
				)}
			</Box>
		</FormStepContainer>
	);
};
