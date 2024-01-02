import { PropertyData } from "models/sttl/types";

export const getOrderResultFromStatus = (status: any, propertiesList: PropertyData[]) => {
	const registrations = [];
	propertiesList.forEach(property => {
		const address = property?.property_address?.propertyAddress;
		const sttlNumber = getSTTLNumberForPostalCode(address?.postcode, status);
		if (sttlNumber) registrations.push({ address: address.addressLine1, sttlNumber, postcode: address.postcode });
	});
	if (registrations.length !== propertiesList.length) return;
	return registrations;
};

export const getSTTLNumberForPostalCode = (postalCode: string, status: any) => {
	if (!status?.subOperations?.length) return;
	for (let i = 0; i < status.subOperations.length; i++) {
		const operation = status.subOperations[i];
		const codeGenerationSignal = operation?.signals?.find(
			(signal: any) => signal?.name === "STL Code Generation" && signal?.data?.number?.length > 0
		);
		const propertySignal = operation?.signals?.find((signal: any) => {
			const isSaveProperty = signal?.name?.includes("Save Property");
			const isPostCode = signal?.data?.document?.address?.postalCode === postalCode;
			return isSaveProperty && isPostCode;
		});
		if (codeGenerationSignal && propertySignal) return codeGenerationSignal.data.number;
	}
};
