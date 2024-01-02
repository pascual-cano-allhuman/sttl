import { getFormFromOrder } from "./getFormFromOrder";

import { formState, order } from "../mocks";

describe("mapOrder", () => {
	it("should compute expected result", () => {
		const result = getFormFromOrder(order);
		expect(result).toEqual(formState);
	});
});
