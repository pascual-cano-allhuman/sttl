import { OrderSchema } from "models/global";
import { FormState } from "../../types";
import { getOwnerDetails, getPlanningPermissionFromOfferItem, getPropertyAddress, getPropertyType, Offer } from "./utils";

export const getFormFromOrder = (order: OrderSchema): FormState => {
	return order?.acceptedOffer?.reduce(
		(acc, item: Offer) => {
			acc["property_type"].push(getPropertyType(item));
			acc["statutory_obligations"].push(getPlanningPermissionFromOfferItem(item));
			acc["property_address"].push(getPropertyAddress(item));
			acc["property_owner_details"].push(getOwnerDetails(item));
			return acc;
		},
		{
			property_type: [],
			statutory_obligations: [],
			property_address: [],
			property_owner_details: []
		}
	);
};
