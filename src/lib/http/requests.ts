/**
 * Make a http GET request with retry
 * @param url URL to call
 * @param controller An optional abort controller
 * @returns
 */
export const httpGet = async (url: string, token?: string, controller?: any): Promise<any> => {
	const headers = { "content-type": "application/json" };
	if (token) headers["Authorization"] = `Bearer ${token}`;
	const options = { method: "GET", headers, signal: controller?.signal };
	return requestWithRetry(url, options);
};

/**
 * Make a http POST request with retry
 * @param url URL to call
 * @param bodyObject The POST request payload
 * @param controller An optional abort controller
 * @returns
 */
export const httpPost = async (url: string, bodyObject: object, token?: string, controller?: any): Promise<any> => {
	const body = JSON.stringify(bodyObject || {});
	const headers = { "content-type": "application/json", Authorization: `Bearer ${token}` };
	const options = { method: "POST", body, headers, signal: controller?.signal };
	return requestWithRetry(url, options);
};

/**
 * Make a http PATCH request with retry
 * @param url URL to call
 * @param bodyObject The POST request payload
 * @param controller An optional abort controller
 * @returns
 */
export const httpPatch = async (url: string, bodyObject: object, token?: string, controller?: any): Promise<any> => {
	const body = JSON.stringify(bodyObject || {});
	const headers = { "content-type": "application/json", Authorization: `Bearer ${token}` };
	const options = { method: "PATCH", body, headers, signal: controller?.signal };
	return requestWithRetry(url, options);
};

/**
 * POST an object as Form Data with retry
 * @param url URL to call
 * @param bodyObject The POST request payload
 * @param controller An optional abort controller
 * @returns
 */
export const httpPostFormData = async (url: string, bodyObject: object, token?: string, controller?: any): Promise<any> => {
	const formData = new FormData();
	Object.keys(bodyObject).forEach(key => formData.append(key, bodyObject[key]));
	const headers = { Authorization: `Bearer ${token}` };
	const options = { method: "POST", body: formData, headers, signal: controller?.signal };
	return requestWithRetry(url, options);
};

/**
 * Make a http DELETE request with retry
 * @param url URL to call
 * @param controller An optional abort controller
 * @returns
 */
export const httpDelete = async (url: string, token?: string, controller?: any): Promise<any> => {
	const headers = { "content-type": "application/json" };
	if (token) headers["Authorization"] = `Bearer ${token}`;
	const options = { method: "DELETE", headers, signal: controller?.signal };
	return requestWithRetry(url, options);
};

// exponential backoff strategy
const requestWithRetry = async (url: string, options: any, retryCount = 0, lastStatus = null, lastError = null): Promise<any> => {
	const delays = [1, 3, 7];
	if (retryCount > delays.length) {
		// retries exhausted for connection errors
		throw new HttpRequestError({ status: lastStatus, error: lastError, url, body: options?.body });
	} else {
		// try a request
		let res: any;
		let status: number;
		let json: any;

		try {
			res = await fetch(url, options);
			status = res.status;
		} catch (e) {
			if (options.signal?.aborted) return; // request was aborted
			throw new HttpRequestError({ status: null, error: e, url, body: options?.body });
		}
		// try to parse the response
		try { json = await res.json(); } catch (e) { json = null; } // prettier-ignore

		// retry if needed
		switch (status) {
			case 200:
			case 201:
			case 204:
				return json;
			case 400:
			case 401:
			case 404: // don't retry, it won't work
				throw new HttpRequestError({ status, error: json, url, body: options?.body });
			default: // retry
				await sleep(delays[retryCount] * 1000);
				return requestWithRetry(url, options, retryCount + 1, status, json);
		}
	}
};

// pause for the exponential backoff
const sleep = (ms: number): Promise<void> => {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
};

// decorate error con request details
export class HttpRequestError extends Error {
	constructor({ status, error, url, body }) {
		const parts = [];
		if (status) parts.push(`HTTP Code ${status}`);
		if (!status) parts.push(`Unexpected HTTP request error`);
		if (error) parts.push(JSON.stringify(error).replace(/\.$/, ""));
		if (url) parts.push(`URL: ${url}`);
		if (body) parts.push(`Request: ${body}`);
		const message = parts.join(". ").replace("..", ".");
		super(message, { cause: error?.message || null });
		this.name = "HttpRequestError";
	}
}
