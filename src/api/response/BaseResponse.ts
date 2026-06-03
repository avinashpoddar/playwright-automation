import { APIResponse } from "@playwright/test";

export abstract class BaseResponse {

    constructor(
        public readonly statusCode: number,
        public readonly rawResponse: APIResponse
    ) {}
}