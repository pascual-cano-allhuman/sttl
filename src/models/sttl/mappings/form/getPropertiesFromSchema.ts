import { getPropertyFromSchema, OrderSchema } from "models/global";

export const getPropertiesFromSchema = (orderSchema: OrderSchema) => {
	const itemsOffered = orderSchema.acceptedOffer.map(offer => offer.itemOffered);
	return itemsOffered.map(itemOffered => {
		const ownerSchema = itemOffered.isRelatedTo;
		const accommodationSchema = ownerSchema.owns;
		return getPropertyFromSchema(accommodationSchema, ownerSchema);
	});
};
