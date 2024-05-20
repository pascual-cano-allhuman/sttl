export type UserAccount = {
	email: string;
	firstName?: string;
	lastName?: string;
	id?: string;
	userId?: string;
	provider?: string;
	name?: string;
	contactId?: string;
	isNewUser?: any;
};

export type UserContextData = {
	b2c: any;
	crm: any;
};
