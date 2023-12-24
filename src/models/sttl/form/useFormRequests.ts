import React from "react";
import { getSaveAndResumeData } from "middleware";

type Props = { getToken: () => Promise<string>; correlation: Record<string, string> };
export const useFormRequests = (props: Props) => {
	const { getToken, correlation } = props;

	return React.useMemo(
		() => ({
			loadSaveAndResumeData: async () => {
				const token = await getToken?.();
				const userId = correlation?.userId;
				return getSaveAndResumeData(userId, token, correlation);
			}
		}),
		[getToken, correlation]
	);
};
