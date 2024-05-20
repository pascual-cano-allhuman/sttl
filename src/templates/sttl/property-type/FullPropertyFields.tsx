"use client";

import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { Box, Text, NumberInput, Dropdown, Input } from "trade-portal-components";
import { PROPERTY_OPTIONS, PROPERTY_TYPES_NOT_REQUIRING_BEDROOMS } from "settings/propertyTypeOptions";

export const FullPropertyFields = () => {
	const { register, watch, unregister } = useFormContext();
	const { errors } = useFormState();

	const propertyType = watch(`${`fullProperty`}.propertyType`);

	const showInput = propertyType === "Other - specify";

	const isRoomsRequired = !PROPERTY_TYPES_NOT_REQUIRING_BEDROOMS.includes(propertyType);
	const numberOfBedroomsError = isRoomsRequired && "You must give number of bedrooms";

	// unregister removed form fields from DOM if has been been registered before
	React.useEffect(() => {
		if (!showInput) unregister(`${`fullProperty`}.customPropertyType`);
	}, [showInput]);

	return (
		<Box columns={4} gap="2.4rem">
			<Box gap="0.8rem" id={`${`fullProperty`}.propertyType`}>
				<Dropdown
					label="Type of property"
					placeholder="Please Select"
					defaultValue={watch(`${`fullProperty`}.propertyType`)}
					{...register(`${`fullProperty`}.propertyType`, { required: "You must give type of property" })}
					error={errors[`fullProperty`]?.[`propertyType`]?.message}
					options={PROPERTY_OPTIONS.fullProperty}
				/>
				{showInput && (
					<Text textStyle="caption">If you have more than one unit at the same site, select option for multiple units above</Text>
				)}
			</Box>
			{propertyType && (
				<Box gap="2.4rem">
					{showInput && (
						<Input
							id="specified-type-of-unit"
							label="Please specify type of unit"
							defaultValue={watch(`${`fullProperty`}.customPropertyType`)}
							{...register(`${`fullProperty`}.customPropertyType`, { required: "You must enter type of unit", maxLength: 100 })}
							error={errors[`fullProperty`]?.[`customPropertyType`]?.message}
						/>
					)}
					<NumberInput
						id="number-of-bedrooms"
						label="Number of bedrooms"
						defaultValue={watch(`${`fullProperty`}.numberOfBedrooms`)}
						{...register(`${`fullProperty`}.numberOfBedrooms`, {
							required: isRoomsRequired,
							min: isRoomsRequired ? 1 : 0,
							max: 9999,
							valueAsNumber: true
						})}
						error={errors[`fullProperty`]?.[`numberOfBedrooms`] && numberOfBedroomsError}
					/>
					<NumberInput
						id="number-of-guests"
						label="Total number of guests that can be accommodated"
						defaultValue={watch(`${`fullProperty`}.numberOfGuests`)}
						{...register(`${`fullProperty`}.numberOfGuests`, { required: true, min: 1, max: 9999, valueAsNumber: true })}
						error={errors[`fullProperty`]?.[`numberOfGuests`] && "You must give number of guests"}
					/>
				</Box>
			)}
		</Box>
	);
};
