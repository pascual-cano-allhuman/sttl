import { PROPERTY_OPTIONS } from "settings/propertyTypeOptions";
import { Property, Address, Category } from "models/global";
import { FormState, PropertyTypeStep, PropertyAddressStep, PropertyOwnerDetailsStep, StatutoryObligationsStep } from "models/sttl";

export const getFormFromProperties = (properties: Property[]) => {
	const formState = { propertyType: [], statutoryObligations: [], propertyAddress: [], propertyOwner: [] } as FormState;
	properties.forEach(property => {
		const propertyTypeStep = getPropertyTypeStep(property);
		const propertyAddressStep = getPropertyAddressStep(property);
		const propertyOwnerStep = getPropertyOwnerStep(property);
		const statutoryObligationsStep = getStatutoryObligationsStep(property);
		formState.propertyType.push(propertyTypeStep);
		formState.propertyAddress.push(propertyAddressStep);
		formState.propertyOwner.push(propertyOwnerStep);
		formState.statutoryObligations.push(statutoryObligationsStep);
	});
	return formState as FormState;
};

export const getPropertyTypeStep = (property: Property) => {
	const { category, details } = property;
	const type = details["propertyType"];
	const step = { category } as PropertyTypeStep;
	if (category === "sharedProperty") {
		const { propertyType, customPropertyType } = getCustomPropertyType(type, category);
		step.sharedProperty = { ...details, propertyType, customPropertyType };
	}
	if (category === "fullProperty") {
		const { propertyType, customPropertyType } = getCustomPropertyType(type, category);
		step.fullProperty = { ...details, propertyType, customPropertyType };
	}
	if (category === "multipleUnits") {
		const propertyUnits = details["units"];
		const units = propertyUnits.map(unit => {
			const { propertyType, customPropertyType } = getCustomPropertyType(unit["propertyType"], category);
			return { ...unit, propertyType, customPropertyType };
		});
		step.multipleUnits = { units };
	}
	return step;
};

const getCustomPropertyType = (type: string, category: Category) => {
	const hasCustomType = PROPERTY_OPTIONS[category].find(option => option.value === type);
	const propertyType = hasCustomType ? "Other - specify" : type;
	const customPropertyType = hasCustomType ? type : undefined;
	return { propertyType, customPropertyType };
};

export const getPropertyAddressStep = (property: Property) => {
	const { address } = property;
	return { propertyAddress: address } as PropertyAddressStep;
};

export const getPropertyOwnerStep = (property: Property): PropertyOwnerDetailsStep => {
	const { owner } = property;
	const { firstName, lastName, emailAddress, businessName, telephone, countryOfResidence, address: ownerAddress } = owner;
	const isOwnerAddressSame = areAddressesSame(ownerAddress, property.address);
	const step = { firstName, lastName, emailAddress, businessName, telephone, countryOfResidence, ownerAddress, isOwnerAddressSame };
	return step as PropertyOwnerDetailsStep;
};

export const areAddressesSame = (address1: Address, address2: Address) => {
	const keys = Object.keys(address1);
	return keys.every(key => address1[key] === address2[key]);
};

export const getStatutoryObligationsStep = (property: Property) => {
	const { permissionStatus } = property;
	return { permissionStatus } as StatutoryObligationsStep;
};
