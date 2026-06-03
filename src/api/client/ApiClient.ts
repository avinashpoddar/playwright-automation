import { APIRequestContext, APIResponse } from '@playwright/test';

import { IHttpRequest } from '../contracts/IHttpRequest';
import { HttpMethod } from '../contracts/HttpMethod';
import { ApiResponse } from '../response/ApiResponse';

export class ApiClient {
    constructor(private readonly request: APIRequestContext) {}

    async processRequest<T>(requestData: IHttpRequest): Promise<ApiResponse<T>> {
        const response = await this.send(requestData);
        const body = await this.parseBody<T>(response);

        return new ApiResponse(body, response.status(), response);
    }

    private async send(requestData: IHttpRequest): Promise<APIResponse> {
        const options = {
            headers: requestData.headers,
            params: requestData.queryParams,
            data: requestData.body,
        };

        switch (requestData.method) {
            case HttpMethod.GET:
                return this.request.get(requestData.url, options);
            case HttpMethod.POST:
                return this.request.post(requestData.url, options);
            case HttpMethod.PUT:
                return this.request.put(requestData.url, options);
            case HttpMethod.DELETE:
                return this.request.delete(requestData.url, { headers: requestData.headers });
            default:
                throw new Error(`Unsupported HTTP method: ${requestData.method}`);
        }
    }

    private async parseBody<T>(response: APIResponse): Promise<T> {
        const contentType = response.headers()['content-type'] ?? '';

        if (!contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(
                `Expected JSON response (${response.status()}). Body starts with: ${text.slice(0, 120)}`,
            );
        }

        return response.json() as Promise<T>;
    }
}
