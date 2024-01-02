import { httpPost } from "lib/http";
import { logger } from "lib/logger";
import { Order } from "models/sttl";

const MIDDLEWARE_DE_ENDPOINT = process.env.MIDDLEWARE_DE_ENDPOINT?.length > 0 ? process.env.MIDDLEWARE_DE_ENDPOINT : null;
const MIDDLEWARE_PORTAL_ENDPOINT = process.env.MIDDLEWARE_PORTAL_ENDPOINT?.length > 0 ? process.env.MIDDLEWARE_PORTAL_ENDPOINT : null;
const MOCK_MIDDLEWARE = process.env.MOCK_MIDDLEWARE || false;
const DISABLE_CARD_PAYMENTS = process.env.DISABLE_CARD_PAYMENTS || false;

export const appendFeesToOrder = async (order: Order, token: string, correlation: Record<string, string>, controller?: any) => {
	if (!MIDDLEWARE_DE_ENDPOINT || !token || DISABLE_CARD_PAYMENTS || !order) return order;
	if (MOCK_MIDDLEWARE) return appendFakeFees(order);
	try {
		const orderWithFees = await httpPost(`${MIDDLEWARE_PORTAL_ENDPOINT}/fees/calculate/sttl`, order, token, controller);
		return orderWithFees;
	} catch (e) {
		logger.error(new Error(`Failed to get payment fees. HTTP Error ${e?.message}}`), correlation);
	}
};

const appendFakeFees = async (order: Order) => {
	await sleep(1000);
	const withFakeFees = {
		...order,
		acceptedOffer: order?.acceptedOffer.map(item => ({ ...item, price: 100 })),
		partOfInvoice: {
			...order?.partOfInvoice,
			totalPaymentDue: {
				...order?.partOfInvoice?.totalPaymentDue,
				price: 1000
			}
		}
	};
	return withFakeFees;
};

const sleep = (ms: number): Promise<void> => {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
};
