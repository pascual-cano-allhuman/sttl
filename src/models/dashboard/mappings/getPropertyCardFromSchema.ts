export const getPropertyCardFromSchema = (orderSchema: any) => {
	if (!orderSchema) return null;
	const { address, identifier } = orderSchema;
	const relevantIdentifier = getRelevantIdentifier(identifier);
	return {
		status: relevantIdentifier?.valueReference,
		sttlNumber: relevantIdentifier?.value,
		address: getAddress(address),
		id: orderSchema.id
	};
};

export const getAddress = (address: any) => {
	if (!address) return null;
	const { addressCountry, addressLocality, addressRegion, postalCode, streetAddress } = address;
	return {
		country: addressCountry,
		county: addressRegion,
		town: addressLocality,
		postcode: postalCode,
		addressLine1: streetAddress
	};
};

export const getRelevantIdentifier = (list: { value: string; valueReference: string }[]) => {
	if (!list?.length) return null;
	const firstActive = list.find(identifier => identifier.valueReference === "Active");
	if (firstActive) return firstActive;
	const sortedList = list.sort(sortFunctionByDate);
	return sortedList[0];
};

const sortFunctionByDate = (a, b) => {
	const dateA = new Date(a.validThrough).getTime();
	const dateB = new Date(b.validThrough).getTime();
	return dateA > dateB ? -1 : 1;
};
