import { parseUserContext } from "./parseUserContext";

const mock = {
	b2c: {
		id: "4af3dfb6-2df6-448e-a5e9-4edc4323e033",
		displayName: "QA test",
		email: "QAtest01@parse.meetinireland.com"
	},
	crm: {
		contact: {
			id: "6148a839-05ef-ed11-9135-005056a0ce81",
			fullName: "John Doe"
		},
		accounts: [
			{
				id: "6248a839-05ef-ed11-9135-005056a0ce81",
				name: "Testing again",
				number: "FI037298",
				roles: [
					{
						name: "Financial Contact"
					},
					{
						name: "Trade Contact"
					},
					{
						name: "Premise Contact"
					}
				]
			}
		]
	}
};

describe("parseUserContext", () => {
	it("parses user context data", () => {
		const actual = parseUserContext(mock);
		const expected = {
			id: "4af3dfb6-2df6-448e-a5e9-4edc4323e033",
			userId: "4af3dfb6-2df6-448e-a5e9-4edc4323e033",
			name: "John Doe",
			firstName: "John",
			lastName: "Doe",
			email: "QAtest01@parse.meetinireland.com",
			contactId: "6148a839-05ef-ed11-9135-005056a0ce81"
		};
		expect(actual).toEqual(expected);
	});
});
