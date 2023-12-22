import React from "react";
import { useFormContext } from "react-hook-form";
import { Box, Dropdown, Input, PhoneNumberInput } from "trade-portal-components";
import { validateTextInput } from "lib/react-hook-form";
import { countries } from "settings/countries";
import { UserAccount } from "models/global";

type Props = {
	accountData: UserAccount;
};

export const OwnerDetailsFields = (props: Props) => {
	const { accountData } = props;
	const { register, formState, watch, setValue } = useFormContext();
	const { errors } = formState;
	const userIsOwnerCheck = watch("userIsOwnerCheck");
	const hasOwner = userIsOwnerCheck === "Yes";
	return (
		<Box columns={4} gap="2.4rem">
			<Box flexDirection="row" gap="1.6rem">
				<Input
					label="First name"
					id="first-name"
					{...register(`firstName`, validateTextInput({ min: 2, max: 50 }))}
					error={errors["firstName"]?.message}
					maxLength={60}
					disabled={hasOwner}
				/>
				<Input
					id="last-name"
					label="Last name"
					{...register(`lastName`, validateTextInput({ min: 2, max: 50 }))}
					error={errors["lastName"]?.message as string}
					maxLength={60}
					disabled={hasOwner}
				/>
			</Box>
			<Input
				id="business-name"
				label="Business name (optional)"
				{...register(`businessName`)}
				error={errors["businessName"]?.message as string}
				maxLength={200}
			/>
			<Input
				id="email-address"
				label="Email address"
				{...register(`emailAddress`, {
					...validateTextInput({ max: 100 }),
					validate: emailAddress => {
						if (!hasOwner && emailAddress === accountData.email)
							return "The email address should be different from the business owner's email address";
						return true;
					},
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: "Invalid email address"
					}
				})}
				disabled={hasOwner}
				error={errors["emailAddress"]?.message as string}
			/>
			<PhoneNumberInput
				id="telephone"
				{...register("telephone", {
					required: "Phone number is required",
					validate: telephone => {
						if (!telephone.startsWith("+")) return "Phone number should start with +";
						if (!PHONE_PATTERN.test(telephone)) return "Phone number is invalid";
						if (PHONE_WITH_LEADING_ZERO_PATTERN.test(telephone)) return "Phone number shouldn't start with 00";
					}
				})}
				label="Phone number"
				defaultCountryCode="IE"
				placeholder="Phone"
				error={errors["telephone"]?.message as string}
			/>
			<Dropdown
				label="Country of residence"
				{...register(`countryOfResidence`, {
					required: "Required",
					onChange: () => setValue("isAddressSameAsStlProperty", false)
				})}
				error={errors?.[`countryOfResidence`]?.message}
				options={COUNTRY_OPTIONS}
				defaultValue={formState?.defaultValues?.countryOfResidence || "Ireland"}
			/>
		</Box>
	);
};

const COUNTRY_OPTIONS = countries.map(country => ({ label: country, value: country }));
const PHONE_PATTERN = /^\+[0-9]{9,15}$/;
const PHONE_WITH_LEADING_ZERO_PATTERN = /^\+353[0]{1,2}/;