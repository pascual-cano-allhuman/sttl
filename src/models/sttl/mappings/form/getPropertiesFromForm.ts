import { Property } from "models/global";
import { FormState, PropertyAddressStep, PropertyOwnerDetailsStep, PropertyTypeStep } from "models/sttl";

export const getPropertiesFromForm = (formState: FormState) => {
	if (!formState) return [];
	const total = formState.propertyOwner?.length || 0;
	const list = [];
	for (let i = 0; i < total; i++) {
		const property = getPropertyFromForm(formState, i);
		list.push(property);
	}
	return list as Property[];
};

export const getPropertyFromForm = (formState: FormState, entry: number) => {
	if (!formState) return {};
	const steps = {
		propertyTypeStep: formState.propertyType[entry],
		statutoryObligationsStep: formState.statutoryObligations[entry],
		propertyAddressStep: formState.propertyAddress[entry],
		propertyOwnerStep: formState.propertyOwner[entry]
	};
	if (!steps.propertyTypeStep || !steps.propertyAddressStep || !steps.statutoryObligationsStep || !steps.propertyOwnerStep) return {};
	const { category } = steps.propertyTypeStep;
	const details = getPropertyDetails(steps.propertyTypeStep);
	const { propertyAddress: address } = steps.propertyAddressStep;
	const { permissionStatus } = steps.statutoryObligationsStep;
	const owner = getPropertyOwner(steps.propertyOwnerStep, steps.propertyAddressStep);
	return {
		category,
		details,
		address,
		permissionStatus,
		owner
	} as Property;
};

const getPropertyDetails = (propertyTypeStep: PropertyTypeStep) => {
	const { category, sharedProperty, fullProperty, multipleUnits } = propertyTypeStep;
	if (category === "sharedProperty") {
		const {
			propertyType,
			numberOfSharedRooms = 0,
			numberOfPrivateRooms = 0,
			numberOfGuestsInSharedRooms = 0,
			numberOfGuestsInPrivateRooms = 0
		} = sharedProperty;
		return { propertyType, numberOfSharedRooms, numberOfPrivateRooms, numberOfGuestsInSharedRooms, numberOfGuestsInPrivateRooms };
	}
	if (category === "fullProperty") {
		const { propertyType, numberOfBedrooms = 0, numberOfGuests = 0 } = fullProperty;
		return { propertyType, numberOfBedrooms, numberOfGuests };
	}
	if (category === "multipleUnits") return multipleUnits;
};

const getPropertyOwner = (propertyOwnerStep: PropertyOwnerDetailsStep, propertyAddressStep: PropertyAddressStep) => {
	const address = propertyOwnerStep.isOwnerAddressSame ? propertyAddressStep.propertyAddress : propertyOwnerStep.ownerAddress;
	return {
		firstName: propertyOwnerStep.firstName,
		lastName: propertyOwnerStep.lastName,
		emailAddress: propertyOwnerStep.emailAddress,
		businessName: propertyOwnerStep.businessName,
		telephone: propertyOwnerStep.telephone,
		countryOfResidence: propertyOwnerStep.countryOfResidence,
		address
	};
};
