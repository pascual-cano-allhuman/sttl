import { UserContextData, UserAccount } from "../types/UserAccount";

export const parseUserContext = (data: UserContextData) => {
	if (!data?.b2c) return { name: "", firstName: "", lastName: "", email: "", contactId: "" };
	const { b2c = {}, crm = {} } = data;
	const { contact = {} } = crm;
	const { displayName = "", email = "", id = "" } = b2c;
	const fullName = contact?.fullName || displayName;
	const nameParts = fullName.split(/ /g);
	const firstName = nameParts.shift();
	const lastName = nameParts.join(" ");
	return { id, userId: id, name: fullName, firstName, lastName, email, contactId: contact?.id } as UserAccount;
};
