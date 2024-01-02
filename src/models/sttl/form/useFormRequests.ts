import React from "react";
import {
	appendFeesToOrder,
	postCardPaymentRequest,
	postCardPaymentResponse,
	postOrderToEventsBus,
	getOrderStatusFromEventBus
} from "middleware/requests";
import { getSaveAndResumeData, postSaveAndResumeData, deleteSaveAndResumeData, postQAMembershipUpsell } from "middleware/requests";
import { PropertyData } from "../types";
import { getOrderResultFromStatus } from "../mappings";

type Props = { getToken: () => Promise<string>; correlation: Record<string, string> };
export const useFormRequests = (props: Props) => {
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
			retrieveOrderResult: async (propertiesList: PropertyData[]) => {
				const token = await getToken?.();
				const callback = async () => {
					const status = await getOrderStatusFromEventBus(token, correlation, propertiesList);
					if (status) return getOrderResultFromStatus(status, propertiesList);
				};
				return retry(callback);
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
			}
		}),
		[getToken, correlation]
	);
};

/* eslint-disable no-await-in-loop */
export const retry = async (callback: () => Promise<any>) => {
	for (let i = 0; i < 15; i++) {
		try {
			const result = await callback();
			if (result) return result;
		} finally {
			await sleep(2000);
		}
	}
};

// delay for retry
const sleep = (ms: number): Promise<void> => {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
};
