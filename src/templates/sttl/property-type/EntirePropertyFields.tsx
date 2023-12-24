import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { Box, Text, NumberInput, Dropdown, Input } from "trade-portal-components";
import { PROPERTY_OPTIONS, PROPERTY_TYPES_NOT_REQUIRING_BEDROOMS } from "settings/propertyTypeOptions";
import { Category } from "models/sttl";

export type FormCategoryProps = {
	category: Category;
};

export const EntirePropertyFields = ({ category }: FormCategoryProps) => {
	const { register, watch, unregister } = useFormContext();
	const { errors } = useFormState();

	const propertyType = watch(`${category}.propertyType`);

	const showInput = propertyType === "Other - specify";

	const isRoomsRequired = !PROPERTY_TYPES_NOT_REQUIRING_BEDROOMS.includes(propertyType);
	const numberOfBedroomsError = isRoomsRequired && "You must give number of bedrooms";

	// unregister removed form fields from DOM if has been been registered before
	React.useEffect(() => {
		if (!showInput) unregister(`${category}.customPropertyType`);
	}, [showInput, unregister, category]);

	return (
		<Box columns={4} gap="2.4rem">
			<Box gap="0.8rem" id={`${category}.propertyType`}>
				<Dropdown
					label="Type of property"
					placeholder="Please Select"
					defaultValue={watch(`${category}.propertyType`)}
					{...register(`${category}.propertyType`, { required: "You must give type of property" })}
					error={errors[category]?.[`propertyType`]?.message}
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
							defaultValue={watch(`${category}.customPropertyType`)}
							{...register(`${category}.customPropertyType`, { required: "You must enter type of unit", maxLength: 100 })}
							error={errors[category]?.[`customPropertyType`]?.message}
						/>
					)}
					<NumberInput
						id="number-of-bedrooms"
						label="Number of bedrooms"
						defaultValue={watch(`${category}.numberOfBedrooms`)}
						{...register(`${category}.numberOfBedrooms`, {
							required: isRoomsRequired,
							min: isRoomsRequired ? 1 : 0,
							max: 9999,
							valueAsNumber: true
						})}
						error={errors[category]?.[`numberOfBedrooms`] && numberOfBedroomsError}
					/>
					<NumberInput
						id="number-of-guests"
						label="Total number of guests that can be accommodated"
						defaultValue={watch(`${category}.numberOfGuests`)}
						{...register(`${category}.numberOfGuests`, { required: true, min: 1, max: 9999, valueAsNumber: true })}
						error={errors[category]?.[`numberOfGuests`] && "You must give number of guests"}
					/>
				</Box>
			)}
		</Box>
	);
};
