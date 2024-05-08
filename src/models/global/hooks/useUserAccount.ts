import React from "react";
import { getUserContext } from "middleware/requests";
import { UserAccount, parseUserContext } from "models/global";
import { Auth } from "lib/msal";

type HookProps = {
	auth: Auth;
	correlationId: string;
};

export const useUserAccount = (props: HookProps) => {
	const { auth, correlationId } = props;
	const { getToken, userId, provider, isNewUser } = auth || {};
	const [userAccount, setUserAccount] = React.useState<UserAccount>();
	const [hasError, setHasError] = React.useState(false);

	const getUserAccount = async () => {
		if (!userId) return null;
		const token = await getToken?.();
		const correlation = { correlationId, userId };
		const data = await getUserContext(token, correlation);
		const { name = "", email = "", firstName = "", lastName = "", contactId = "" } = parseUserContext(data);
		return { userId, id: userId, provider, isNewUser, name, email, firstName, lastName, contactId } as UserAccount;
	};

	// get user context into userAccount
	React.useEffect(() => {
		if (!auth) return;
		getUserAccount()
			.then(userAccount => setUserAccount(userAccount))
			.catch(() => setHasError(true));
	}, [auth]);

	return React.useMemo(() => {
		if (userAccount === undefined && !hasError) return;
		return { hasError, ...userAccount };
	}, [hasError, userAccount]);
};

export default useUserAccount;
