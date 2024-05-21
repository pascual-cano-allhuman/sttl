import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { Box, Text, NumberInput, Dropdown, Input, Divider, TextLink } from "trade-portal-components";
import { PROPERTY_OPTIONS } from "settings/propertyTypeOptions";

type Entry = [number, Record<string, string | number>];

export const MultipleUnitsFields = () => {
	const { register, watch, getValues, trigger, unregister } = useFormContext();
	const { errors } = useFormState();
	const fieldPrefix = "multipleUnits.units";

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
		unregister(`${fieldPrefix}.${key}`); // remove fields from react-hook-form internal state
	};

	const categoryEntriesLength = unitEntries.length;
	const showRemoveUnitButton = categoryEntriesLength > 1;
	return (
		<Box columns={4} gap="2.4rem">
			{unitEntries.map(([id, values]) => {
				const { propertyType, customPropertyType, noOfGuests, noOfUnits } = values;
				const selectedPropertyType = watch(`${fieldPrefix}.${id}.propertyType`);
				const showCustomPropertyTypeInput = selectedPropertyType === `Other - specify`;
				const showNumberOfUnits = selectedPropertyType !== "Hostel";
				const numberOfUnitsLabel = NUMBER_OF_UNITS_LABEL[selectedPropertyType] || "Number";

				return (
					<Box key={id} gap="2.4rem">
						<Box gap="0.8rem">
							<Dropdown
								label="Type of unit"
								placeholder="Please Select"
								defaultValue={propertyType}
								{...register(`${fieldPrefix}.${id}.propertyType`, { required: "You must select type of unit" })}
								error={errors[fieldPrefix]?.[id]?.propertyType?.message}
								options={PROPERTY_OPTIONS.multipleUnits}
								hint="Please complete information for each unit type"
							/>
						</Box>
						<Box gap="2.4rem" display={selectedPropertyType ? "flex" : "none"}>
							{showCustomPropertyTypeInput && (
								<Input
									label="Please specify type of unit"
									defaultValue={customPropertyType}
									{...register(`${fieldPrefix}.${id}.customPropertyType`, {
										required: "You must enter type of unit",
										maxLength: 100
									})}
									error={errors[fieldPrefix]?.[id]?.customPropertyType?.message}
								/>
							)}
							{showNumberOfUnits && ( // not-shown only for Hostel
								<NumberInput
									label={numberOfUnitsLabel}
									defaultValue={noOfUnits}
									{...register(`${fieldPrefix}.${id}.noOfUnits`, { required: true, min: 1, max: 9999, valueAsNumber: true })}
									error={errors[fieldPrefix]?.[id]?.noOfUnits && "You must give number"}
								/>
							)}
							<NumberInput
								label="Number of guests that can be accommodated"
								defaultValue={noOfGuests}
								{...register(`${fieldPrefix}.${id}.noOfGuests`, { required: true, min: 1, max: 9999, valueAsNumber: true })}
								error={errors[fieldPrefix]?.[id]?.noOfGuests && "You must give number"}
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

const NUMBER_OF_UNITS_LABEL = {
	"Activity or adventure centre": "Number of rooms",
	"Apartments - student accommodation": "Number of own door units",
	"Apartments - other": "Number of own door units",
	"Multiple houses on a site": "Number of own door units",
	"Site - for motor home / tent / yurt etc.": "Number of pitches",
	"Serviced accommodation": "Number of own door units"
};
