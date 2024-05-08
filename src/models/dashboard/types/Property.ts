export type Property = {
	id: string | number;
	sttlNumber: string;
	address: Address;
	postCode: string;
	invoiceDate: string;
	invoiceNumber: string;
	status: "Renew" | "Expired" | "Default" | "Active" | "Withdrawn";
	propertyDetails: string[][] | string[];
	propertyOwner: {
		name: string;
		email: string;
		address: Address;
		telephone: string;
	};
	planningPermission?: string;
};

export type Address = {
	addressCountry: string;
	addressLocality: string;
	addressRegion: string;
	postalCode: string;
	streetAddress: string;
};
