import { GetOneSentence } from "../pages/api/zApps/folktales/getOneSentence";
import { ServerResponse } from "../types/fetch";
import { getErrorMessage } from "./error";

export function fetchZApps(url: string) {
    console.log("fetch Z-Apps:", url);
    return fetch(`https://articles.lingual-ninja.com/${url}`);
}

export type Apis = GetOneSentence;

export async function fetchGet<T extends Apis>(
    url: T["url"],
    params: T["params"]
): Promise<ServerResponse<T["response"]>> {
    try {
        const paramKeys = Object.keys(params) as (keyof typeof params)[];
        const strParams = paramKeys.length
            ? "?" + paramKeys.map(key => `${key}=${params[key]}`).join("&")
            : "";
        const response = await fetch(url + strParams);
        const result: ServerResponse<T["response"]> = await response.json();
        return result;
    } catch (e) {
        return {
            responseType: "system_error",
            message: getErrorMessage(e),
        } as const;
    }
}

export async function fetchPost<T, U extends ServerResponse<unknown>>(
    url: string,
    params: T
) {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: { "Content-Type": "application/json" },
        });
        const result: U = await response.json();
        return result;
    } catch (e) {
        return {
            responseType: "system_error",
            message: getErrorMessage(e),
        } as const;
    }
}
