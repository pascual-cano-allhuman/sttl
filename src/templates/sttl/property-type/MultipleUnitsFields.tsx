import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { Box, Text, NumberInput, Dropdown, Input, Divider, TextLink } from "trade-portal-components";
import { PROPERTY_OPTIONS } from "settings/propertyTypeOptions";
import { Category } from "models/sttl";

const optionsMap = PROPERTY_OPTIONS.units.reduce((acc, { label, inputName, inputLabel }) => {
	acc[label] = { inputName, inputLabel };
	return acc;
}, {});

type Entry = [number, Record<string, string | number>];

export type FormCategoryProps = { category: Category };

export const MultipleUnitsFields = ({ category }: FormCategoryProps) => {
	const { register, watch, getValues, trigger, unregister } = useFormContext();
	const { errors } = useFormState();

	const [unitEntries, setUnitEntries] = React.useState<Entry[]>(() => {
		const entries = Object.entries(getValues()?.units ?? {}).filter(Boolean);
		const hasEntries = entries.length > 0;
		return (hasEntries ? entries : [[0, { propertyType: "" }]]) as Entry[];
	});

	const onAddUnit = async () => {
		const isValid = await trigger(null, { shouldFocus: true });
		if (!isValid) return;
		setUnitEntries(prev => {
			const copy = [...prev];
			const keys = copy.map(([key]) => +key);
			const newKey = Math.max(...keys) + 1;
			copy.push([newKey, { propertyType: "" }]); // field is registered automatically to react-hook-form internal state when field is rendered
			return copy;
		});
	};

	const onRemoveUnit = key => {
		setUnitEntries(prev => prev.filter(([_key]) => +_key !== +key));
		unregister(`${category}.${key}`); // remove fields from react-hook-form internal state
	};

	const categoryEntriesLength = unitEntries.length;
	const showRemoveUnitButton = categoryEntriesLength > 1;
	return (
		<Box columns={4} gap="2.4rem">
			{unitEntries.map(([id, values]) => {
				const { propertyType, customPropertyType, noOfGuests, ...rest } = values;
				const selectedPropertyType = watch(`${category}.${id}.propertyType`);
				const showCustomPropertyTypeInput = selectedPropertyType === `Other - specify`;
				const { inputName, inputLabel } = optionsMap[selectedPropertyType] || {};
				const dynamicInputName = inputName && `${category}.${id}.${inputName}`;
				return (
					<Box key={id} gap="2.4rem">
						<Box gap="0.8rem" id={`${category}.propertyType`}>
							<Dropdown
								label="Type of unit"
								placeholder="Please Select"
								defaultValue={propertyType}
								{...register(`${category}.${id}.propertyType`, { required: "You must select type of unit" })}
								error={errors[category]?.[`${id}`]?.propertyType?.message}
								options={PROPERTY_OPTIONS.units}
								hint="Please complete information for each unit type"
							/>
						</Box>
						<Box gap="2.4rem" display={selectedPropertyType ? "flex" : "none"}>
							{showCustomPropertyTypeInput && (
								<Input
									id={`${category}.${id}.customPropertyType`}
									label="Please specify type of unit"
									defaultValue={customPropertyType}
									{...register(`${category}.${id}.customPropertyType`, { required: "You must enter type of unit", maxLength: 100 })}
									error={errors[category]?.[`${id}`]?.customPropertyType?.message}
								/>
							)}
							{/* this input depends on what was selected as propertyType in a dropdown */}
							{inputName && ( // not-shown (undefined) only for Hostel
								<NumberInput
									id={inputName}
									label={inputLabel}
									defaultValue={rest[inputName]}
									{...register(dynamicInputName, { required: true, min: 1, max: 9999, valueAsNumber: true })}
									error={errors[category]?.[`${id}`]?.[`${inputName}`] && "You must give number"}
								/>
							)}
							<NumberInput
								id={`${category}.${id}.noOfGuests`}
								label="Number of guests that can be accommodated"
								defaultValue={noOfGuests}
								{...register(`${category}.${id}.noOfGuests`, { required: true, min: 1, max: 9999, valueAsNumber: true })}
								error={errors[category]?.[`${id}`]?.noOfGuests && "You must give number"}
							/>
						</Box>
						{showRemoveUnitButton && (
							<Text
								as="button"
								color="fi_action_primary_100"
								textStyle="link_caption"
								textDecoration="underline"
								onClick={() => onRemoveUnit(id)}
							>
								Remove unit type
							</Text>
						)}
						<div style={{ width: "100%", marginTop: "1.6rem" }}>
							<Divider color="fi_action_primary_60" />
						</div>
					</Box>
				);
			})}
			<TextLink variant="icon_link" trailingIcon="fi-plus" iconSize={12} onClick={onAddUnit}>
				Add another unit type
			</TextLink>
		</Box>
	);
};
