"use client";

import { ErrorTemplate } from "templates";

type ErrorProps = { error: Error };
const ErrorPage = ({ error }: ErrorProps) => {
	const message = ["AuthRequiredError"].includes(error.name) ? error.message : "Something unexpected went wrong";
	return <ErrorTemplate>{message}</ErrorTemplate>;
};

export class AuthRequiredError extends Error {
	constructor(message = "Something went wrong when we tried to retrieve your account details") {
		super(message);
		this.name = "AuthRequiredError";
	}
}

export default ErrorPage;
