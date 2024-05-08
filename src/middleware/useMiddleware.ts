import React from "react";
import {
	appendFeesToOrder,
	postCardPaymentRequest,
	postCardPaymentResponse,
	postOrderToEventsBus,
	getOrderStatusFromEventBus
} from "middleware/requests";
import { getSaveAndResumeData, postSaveAndResumeData, deleteSaveAndResumeData, postQAMembershipUpsell, getPayments } from "middleware/requests";

type Props = { getToken: () => Promise<string>; correlation: Record<string, string> };
export const useMiddleware = (props: Props) => {
	const { getToken, correlation } = props;

	return React.useMemo(
		() => ({
			appendFeesToOrder: async (order: any, controller?: AbortController) => {
				const token = await getToken?.();
				return appendFeesToOrder(order, token, correlation, controller);
			},
			createPaymentRequest: async (order: any) => {
				const token = await getToken?.();
				return postCardPaymentRequest(order, token, correlation);
			},
			sendPaymentResponse: async (paymentResponse: any) => {
				const token = await getToken?.();
				return postCardPaymentResponse(paymentResponse, token, correlation);
			},
			sendZeroPaymentOrder: async (order: any) => {
				const token = await getToken?.();
				return postOrderToEventsBus(order, token, correlation);
			},
			fetchOrderStatus: async (propertiesList: any) => {
				const token = await getToken?.();
				return getOrderStatusFromEventBus(token, correlation, propertiesList);
			},
			loadSaveAndResumeData: async () => {
				const token = await getToken?.();
				const userId = correlation?.userId;
				return getSaveAndResumeData(userId, token, correlation);
			},
			updateSaveAndResume: async (order: any) => {
				const token = await getToken?.();
				const userId = correlation?.userId;
				return postSaveAndResumeData(userId, order, token, correlation);
			},
			clearSaveAndResumeData: async () => {
				const token = await getToken?.();
				const userId = correlation?.userId;
				deleteSaveAndResumeData(userId, token, correlation);
			},
			sendQAUpsell: async () => {
				const token = await getToken?.();
				postQAMembershipUpsell(token, correlation);
			},
			loadDashboardPayments: async () => {
				const token = await getToken?.();
				return getPayments(token, correlation);
			}
		}),
		[getToken, correlation]
	);
};
