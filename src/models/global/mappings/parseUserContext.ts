import { UserContextData, UserAccount } from "../types/UserAccount";

export const parseUserContext = (data: UserContextData) => {
	if (!data) return { name: "", firstName: "", lastName: "", email: "", contactId: "" };
	const { b2c = {}, crm = {} } = data;
	const { contact = {} } = crm;
	const { displayName = "", email = "", id = "" } = b2c;
	const nameParts = displayName.split(/ /g);
	const firstName = nameParts.shift();
	const lastName = nameParts.join(" ");
	return { id, userId: id, name: displayName, firstName, lastName, email, contactId: contact?.id } as UserAccount;
};
