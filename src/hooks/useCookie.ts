import { Cookies } from "react-cookie"
const cookie = new Cookies();

export declare type Cookie = any;

export interface CookieSetOptions {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean | 'none' | 'lax' | 'strict';
    encode?: (value: string) => string;
}

export const setCookie = (name: string, value: Cookie, options?: CookieSetOptions) => {
    return cookie.set(name, value);
}

export const getCookie = (name: string) => {
    return cookie.get(name);
}