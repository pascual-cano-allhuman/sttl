"use client";

import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { Box, NumberInput, Dropdown, Input, Divider } from "trade-portal-components";
import { PROPERTY_OPTIONS } from "settings/propertyTypeOptions";

export const SharedPropertyFields = () => {
	const { register, watch, unregister, trigger } = useFormContext();
	const { errors } = useFormState();

	const numberOfSharedRooms = watch(`sharedProperty.numberOfSharedRooms`);
	const numberOfPrivateRooms = watch(`sharedProperty.numberOfPrivateRooms`);
	const propertyType = watch(`sharedProperty.propertyType`);

	const showAdditionalInput = propertyType === "Other - specify";

	const hasNumberOfSharedRooms = +numberOfSharedRooms > 0;
	const hasNumberOfPrivateRooms = +numberOfPrivateRooms > 0;

	// unregister removed form fields from DOM if has been registered before
	React.useEffect(() => {
		if (!hasNumberOfSharedRooms) unregister(`sharedProperty.numberOfGuestsInSharedRooms`);
		if (!hasNumberOfPrivateRooms) unregister(`sharedProperty.numberOfGuestsInPrivateRooms`);
		if (!showAdditionalInput) unregister(`sharedProperty.customPropertyType`);
	}, [hasNumberOfSharedRooms, hasNumberOfPrivateRooms, showAdditionalInput]);

	// recheck number of rooms when the other option is picked
	React.useEffect(() => {
		trigger(`sharedProperty.numberOfSharedRooms`);
		trigger(`sharedProperty.numberOfPrivateRooms`);
	}, [numberOfSharedRooms, numberOfPrivateRooms]);

	return (
		<Box columns={4} gap="2.4rem">
			<Box gap="0.8rem">
				<Dropdown
					label="What type of property is the primary residence"
					placeholder="Please Select"
					defaultValue={watch(`sharedProperty.propertyType`)}
					{...register(`sharedProperty.propertyType`, { required: "You must give type of property" })}
					error={errors[`sharedProperty`]?.[`propertyType`]?.message}
					options={PROPERTY_OPTIONS.sharedProperty}
				/>
			</Box>

			{propertyType && (
				<Box gap="2.4rem">
					{showAdditionalInput && (
						<Input
							id="specified-type-of-unit"
							label="Please specify type of unit"
							defaultValue={watch(`sharedProperty.customPropertyType`)}
							{...register(`sharedProperty.customPropertyType`, { required: "You must enter type of unit", maxLength: 100 })}
							error={errors[`sharedProperty`]?.[`customPropertyType`]?.message}
						/>
					)}
					<NumberInput
						id="number-of-shared-rooms"
						label="Number of shared rooms"
						defaultValue={watch(`sharedProperty.numberOfSharedRooms`)}
						isDisabled={!propertyType}
						{...register(`sharedProperty.numberOfSharedRooms`, { min: hasNumberOfPrivateRooms ? 0 : 1, max: 9999, valueAsNumber: true })}
						error={errors[`sharedProperty`]?.[`numberOfSharedRooms`] && "You must give number of rooms"}
					/>
					{hasNumberOfSharedRooms && (
						<>
							<NumberInput
								id="number-of-guests-in-shared-rooms"
								label="Number of guests that can be accommodated in shared rooms"
								defaultValue={watch(`sharedProperty.numberOfGuestsInSharedRooms`)}
								{...register(`sharedProperty.numberOfGuestsInSharedRooms`, {
									required: true,
									min: 1,
									max: 9999,
									valueAsNumber: true
								})}
								error={errors[`sharedProperty`]?.[`numberOfGuestsInSharedRooms`] && "You must give number of guest"}
							/>
							<Divider color="fi_action_primary_60" />
						</>
					)}
					<NumberInput
						id="number-of-private-rooms"
						label="Number of private rooms"
						defaultValue={watch(`sharedProperty.numberOfPrivateRooms`)}
						isDisabled={!propertyType}
						{...register(`sharedProperty.numberOfPrivateRooms`, { min: hasNumberOfSharedRooms ? 0 : 1, max: 9999, valueAsNumber: true })}
						error={errors[`sharedProperty`]?.[`numberOfPrivateRooms`] && "You must give number of rooms"}
					/>
					{hasNumberOfPrivateRooms && (
						<NumberInput
							id="number-of-guests-in-private-rooms"
							label="Number of guests that can be accommodated in private rooms"
							defaultValue={watch(`sharedProperty.numberOfGuestsInPrivateRooms`)}
							{...register(`sharedProperty.numberOfGuestsInPrivateRooms`, { required: true, min: 1, max: 9999, valueAsNumber: true })}
							error={errors[`sharedProperty`]?.[`numberOfGuestsInPrivateRooms`] && "You must give number of guest"}
						/>
					)}
				</Box>
			)}
		</Box>
	);
};
