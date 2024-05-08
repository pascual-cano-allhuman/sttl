export const getPropertyFromSchema = (rawData: any) => {
	if (!rawData?.value) return [];
	const properties = [];
	rawData?.value.reverse().forEach(property => {
		const relevantIdentifier = getRelevantIdentifier(property.identifier);
		properties.push({
			status: relevantIdentifier.valueReference,
			sttlNumber: relevantIdentifier.value,
			address: property.address,
			id: property.id
		});
	});
	return properties;
};

export const getRelevantIdentifier = list => {
	if (!list.length) return {};
	const firstActive = list.find(identifier => identifier.valueReference === "Active");
	if (firstActive) return firstActive;
	// In case active is not available, take last expired
	const sortedList = list.sort(sortFunctionByDate);
	return sortedList[0];
};

const sortFunctionByDate = (a, b) => {
	const dateA = new Date(a.validThrough).getTime();
	const dateB = new Date(b.validThrough).getTime();
	return dateA > dateB ? -1 : 1;
};
