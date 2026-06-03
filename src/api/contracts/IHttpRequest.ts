import { HttpMethod } from "./HttpMethod";

export interface IHttpRequest {

    readonly method: HttpMethod;

    readonly url: string;

    readonly headers?: Record<string, string>;

    readonly queryParams?: Record<string, string>;

    readonly body?: unknown;
}