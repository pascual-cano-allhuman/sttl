import { Category, TEXT_TO_CATEGORY, OrderSchema } from "models/global";

export const getFeesFromOrder = (order?: OrderSchema) => {
	if (process.env.DISABLE_CARD_PAYMENTS) return { subtotals: { rooms: 0, fullProperty: 0, units: 0 }, total: 0 };
	if (!order?.acceptedOffer?.length) return { subtotals: undefined, total: undefined };
	const subtotals = order.acceptedOffer.reduce(
		(acc, cur) => {
			const category = TEXT_TO_CATEGORY[cur?.itemOffered?.category];
			if (category === Category.room) acc.rooms += cur?.price || 0;
			else if (category === Category.fullProperty) acc.fullProperty += cur?.price || 0;
			else if (category === Category.units) acc.units += cur?.price || 0;
			return acc;
		},
		{ rooms: 0, fullProperty: 0, units: 0 }
	);
	const total = order.partOfInvoice?.totalPaymentDue?.price;
	return { subtotals, total };
};
