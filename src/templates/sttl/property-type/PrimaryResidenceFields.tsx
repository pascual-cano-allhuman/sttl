"use client";

import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { Box, NumberInput, Dropdown, Input, Divider } from "trade-portal-components";
import { PROPERTY_OPTIONS } from "settings/propertyTypeOptions";
import { Category } from "models/sttl";

export type FormCategoryProps = { category: Category };

export const PrimaryResidenceFields = ({ category }: FormCategoryProps) => {
	const { register, watch, unregister, trigger } = useFormContext();
	const { errors } = useFormState();

	const numberOfSharedRooms = watch(`${category}.numberOfSharedRooms`);
	const numberOfPrivateRooms = watch(`${category}.numberOfPrivateRooms`);
	const propertyType = watch(`${category}.propertyType`);

	const showAdditionalInput = propertyType === "Other - specify";

	const hasNumberOfSharedRooms = +numberOfSharedRooms > 0;
	const hasNumberOfPrivateRooms = +numberOfPrivateRooms > 0;

	// unregister removed form fields from DOM if has been registered before
	React.useEffect(() => {
		if (!hasNumberOfSharedRooms) unregister(`${category}.numberOfGuestsInSharedRooms`);
		if (!hasNumberOfPrivateRooms) unregister(`${category}.numberOfGuestsInPrivateRooms`);
		if (!showAdditionalInput) unregister(`${category}.customPropertyType`);
	}, [hasNumberOfSharedRooms, hasNumberOfPrivateRooms, showAdditionalInput, unregister, category]);

	// recheck number of rooms when the other option is picked
	React.useEffect(() => {
		trigger(`${category}.numberOfSharedRooms`);
		trigger(`${category}.numberOfPrivateRooms`);
	}, [numberOfSharedRooms, numberOfPrivateRooms, category, trigger]);

	return (
		<Box columns={4} gap="2.4rem">
			<Box gap="0.8rem" id={`${category}.propertyType`}>
				<Dropdown
					label="What type of property is the primary residence"
					placeholder="Please Select"
					defaultValue={watch(`${category}.propertyType`)}
					{...register(`${category}.propertyType`, { required: "You must give type of property" })}
					error={errors[category]?.[`propertyType`]?.message}
					options={PROPERTY_OPTIONS.room}
				/>
			</Box>

			{propertyType && (
				<Box gap="2.4rem">
					{showAdditionalInput && (
						<Input
							id="specified-type-of-unit"
							label="Please specify type of unit"
							defaultValue={watch(`${category}.customPropertyType`)}
							{...register(`${category}.customPropertyType`, { required: "You must enter type of unit", maxLength: 100 })}
							error={errors[category]?.[`customPropertyType`]?.message}
						/>
					)}
					<NumberInput
						id="number-of-shared-rooms"
						label="Number of shared rooms"
						defaultValue={watch(`${category}.numberOfSharedRooms`)}
						isDisabled={!propertyType}
						{...register(`${category}.numberOfSharedRooms`, { min: hasNumberOfPrivateRooms ? 0 : 1, max: 9999, valueAsNumber: true })}
						error={errors[category]?.[`numberOfSharedRooms`] && "You must give number of rooms"}
					/>
					{hasNumberOfSharedRooms && (
						<>
							<NumberInput
								id="number-of-guests-in-shared-rooms"
								label="Number of guests that can be accommodated in shared rooms"
								defaultValue={watch(`${category}.numberOfGuestsInSharedRooms`)}
								{...register(`${category}.numberOfGuestsInSharedRooms`, { required: true, min: 1, max: 9999, valueAsNumber: true })}
								error={errors[category]?.[`numberOfGuestsInSharedRooms`] && "You must give number of guest"}
							/>
							<Divider color="fi_action_primary_60" />
						</>
					)}
					<NumberInput
						id="number-of-private-rooms"
						label="Number of private rooms"
						defaultValue={watch(`${category}.numberOfPrivateRooms`)}
						isDisabled={!propertyType}
						{...register(`${category}.numberOfPrivateRooms`, { min: hasNumberOfSharedRooms ? 0 : 1, max: 9999, valueAsNumber: true })}
						error={errors[category]?.[`numberOfPrivateRooms`] && "You must give number of rooms"}
					/>
					{hasNumberOfPrivateRooms && (
						<NumberInput
							id="number-of-guests-in-private-rooms"
							label="Number of guests that can be accommodated in private rooms"
							defaultValue={watch(`${category}.numberOfGuestsInPrivateRooms`)}
							{...register(`${category}.numberOfGuestsInPrivateRooms`, { required: true, min: 1, max: 9999, valueAsNumber: true })}
							error={errors[category]?.[`numberOfGuestsInPrivateRooms`] && "You must give number of guest"}
						/>
					)}
				</Box>
			)}
		</Box>
	);
};
