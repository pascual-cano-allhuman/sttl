import { OrderSchema } from "models/global";
import { FormState } from "../../types";
import { getOwnerDetails, getPlanningPermissionFromOfferItem, getPropertyAddress, getPropertyType, Offer } from "./utils";

export const getFormFromOrder = (order: OrderSchema): FormState => {
	return order?.acceptedOffer?.reduce(
		(acc, item: Offer) => {
			acc["propertyType"].push(getPropertyType(item));
			acc["statutoryObligations"].push(getPlanningPermissionFromOfferItem(item));
			acc["propertyAddress"].push(getPropertyAddress(item));
			acc["propertyOwner"].push(getOwnerDetails(item));
			return acc;
		},
		{
			propertyType: [],
			statutoryObligations: [],
			propertyAddress: [],
			propertyOwner: []
		}
	);
};
