import React from "react";
import { getUserContext } from "middleware";
import { UserAccount, parseUserContext } from "models/global";

type HookProps = {
	getToken: () => Promise<string>;
	userId: string;
	correlationId: string;
	provider: string;
	isNewUser: boolean;
};

export const useUserAccount = (props: HookProps) => {
	const { getToken, userId, correlationId, provider, isNewUser } = props;
	const [userAccount, setUserAccount] = React.useState<UserAccount>();
	const [hasUserAccountError, setHasUserAccountError] = React.useState(false);

	const getUserAccount = async () => {
		const token = await getToken();
		const correlation = { correlationId, userId };
		const data = await getUserContext(token, correlation);
		const { name = "", email = "", firstName = "", lastName = "" } = parseUserContext(data);
		return { userId, id: userId, provider, isNewUser, name, email, firstName, lastName } as UserAccount;
	};

	// get user context into userAccount
	React.useEffect(() => {
		if (!userId) return;
		getUserAccount()
			.then(userAccount => setUserAccount(userAccount))
			.catch(() => setHasUserAccountError(true));
	}, [userId]);

	return { userAccount, hasUserAccountError };
};

export default useUserAccount;
