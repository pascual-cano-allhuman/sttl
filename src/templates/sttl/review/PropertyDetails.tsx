import React from "react";
import { Category, PropertyTypeStep } from "models/sttl";
import { Box, Text, TickList } from "trade-portal-components";

export type ListItem = { id: string; value: string };

type Props = {
	data: PropertyTypeStep;
};
export const PropertyTickList = ({ data }: Props) => {
	const items = React.useMemo(() => getPropertyDetails(data), [data]);
	const isListOfUnits = Array.isArray(items[0]);
	return (
		<>
			{isListOfUnits && <ListOfUnits units={items} />}
			{!isListOfUnits && <TickList items={items} size="small" />}
		</>
	);
};

type ListItemProps = {
	units: string[][] | string[];
};
const ListOfUnits = ({ units }: ListItemProps) => {
	return (
		<Box gap="4rem">
			{units.map((items, index) => (
				<Box key={index} gap="1rem">
					<Text textStyle="text_small" color="fi_text_60">
						Unit {index + 1}
					</Text>
					<TickList items={items} size="small" />
				</Box>
			))}
		</Box>
	);
};

export const getPropertyDetails = (data: PropertyTypeStep) => {
	const { category } = data;
	if (category === Category.room) return getListItemsForRoom(data.room);
	if (category === Category.fullProperty) return getListItemsForFullProperty(data.fullProperty);
	if (category === Category.units) return getListItemsForUnits(data.units);
};

export const getListItemsForRoom = (data: PropertyTypeStep["room"]) => {
	const propertyType = data.customPropertyType || data.propertyType;
	const { numberOfSharedRooms, numberOfPrivateRooms, numberOfGuestsInSharedRooms, numberOfGuestsInPrivateRooms } = data;
	const items = [];
	if (propertyType) items.push(propertyType);
	if (numberOfSharedRooms) items.push(`${numberOfSharedRooms} shared rooms`);
	if (numberOfPrivateRooms) items.push(`${numberOfPrivateRooms} private rooms`);
	if (numberOfGuestsInSharedRooms) items.push(`${numberOfGuestsInSharedRooms} guests in shared rooms`);
	if (numberOfGuestsInPrivateRooms) items.push(`${numberOfGuestsInPrivateRooms} guests in private rooms`);
	return items;
};

export const getListItemsForFullProperty = (data: PropertyTypeStep["fullProperty"]) => {
	const propertyType = data.customPropertyType || data.propertyType;
	const { numberOfBedrooms, numberOfGuests } = data;
	const items = [];
	if (propertyType) items.push(propertyType);
	if (numberOfBedrooms) items.push(`${numberOfBedrooms} bedrooms`);
	if (numberOfGuests) items.push(`${numberOfGuests} guests`);
	return items;
};

export const getListItemsForUnits = (units: PropertyTypeStep["units"]) => {
	return units.map(unit => {
		const propertyType = unit.customPropertyType || unit.propertyType;
		const numberOfGuests = unit.noOfGuests;
		const numberOfRoomsField = Object.keys(unit).find(field => !!unitTypeToRoomDescription[field]);
		const numberOfRooms = unit[numberOfRoomsField];
		const unitTypeDesc = unitTypeToRoomDescription[numberOfRoomsField];
		const items = [];
		if (propertyType) items.push(propertyType);
		if (numberOfGuests) items.push(`${numberOfGuests} guests`);
		if (numberOfRooms && unitTypeDesc) items.push(`${numberOfRooms} ${unitTypeDesc}`);
		return items;
	});
};

const unitTypeToRoomDescription = {
	noOfOwnDoorUnits: "own door units",
	noOfRooms: "rooms",
	noOfBedrooms: "bedrooms",
	noOfPitches: "pitches",
	number: "units"
};
