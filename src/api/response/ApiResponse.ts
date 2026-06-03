import { APIResponse } from "@playwright/test";
import { BaseResponse } from "./BaseResponse";

export class ApiResponse<T>
extends BaseResponse {

    constructor(
        public readonly body: T,
        statusCode: number,
        rawResponse: APIResponse
    ) {
        super(
            statusCode,
            rawResponse
        );
    }
}