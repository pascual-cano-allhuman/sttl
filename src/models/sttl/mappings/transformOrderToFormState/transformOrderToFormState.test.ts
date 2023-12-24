import { transformOrderToFormState } from "./transformOrderToFormState";

import { formState, order } from "../mocks";

describe("mapOrder", () => {
	it("should compute expected result", () => {
		const result = transformOrderToFormState(order);
		expect(result).toMatchSnapshot();
		expect(result).toEqual(formState);
	});
});
