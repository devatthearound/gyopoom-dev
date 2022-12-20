import CreateUserDTO from "@dto/user-create.body";
import { errorRes, Option, successRes } from "@utils/options";
import useGetErrorMessage from "@hooks/useGetErrorMessage";
import axios, { AxiosError } from "axios";
import { setCookie } from "@hooks/useCookie";

export default class AuthMiddleware {
    async sendCode(phoneNumber: string): Promise<Option<boolean>> {
        try {
            const res = await axios.get(`https://api.gyopoom.kr:4099/auth/code/${phoneNumber}`);
            if (res.status === 200) return successRes(res)

            return errorRes("새로고침을 해주세요");
        } catch (err: unknown) {
            const message = useGetErrorMessage(err);

            return errorRes(message);
        }
    }

    async signIn(verificode: string, phoneNumber: string) {
        const day = new Date();
        try {
            const res = await axios.post("https://api.gyopoom.kr:4099/auth/token", {
                phoneNumber: phoneNumber,
                code: verificode
            });

            if (res.status == 201) {
                if (window.ReactNativeWebView) {
                    // 모바일이라면 모바일에게 token을 전달합니다.
                    window.ReactNativeWebView.postMessage(
                        JSON.stringify({ type: 'accessToken', data: res.data.accessToken })
                    );
                    window.ReactNativeWebView.postMessage(
                        JSON.stringify({ type: 'refreshToken', data: res.data.refreshToken })
                    );
                } else {
                    setCookie("accessToken", res.data.accessToken, {
                        path: '/',
                        expires: new Date(new Date().setDate(day.getDate() + 7)),
                        secure: true,
                        httpOnly: true
                    });
                    setCookie("refreshToken", res.data.refreshToken, {
                        path: '/',
                        expires: new Date(new Date().setDate(day.getDate() + 14)),
                        secure: true,
                        httpOnly: true
                    });
                }

                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
                axios.defaults.headers.common['RefreshToken'] = res.data.refreshToken;
                return successRes(res)
            }

            if (res.status == 202) return successRes(res)
            return errorRes("새로고침을 해주세요");
        } catch (error: any | AxiosError) {
            if (error.response && error.response.status === 404) {
                return errorRes("인증번호가 올바르지 않습니다.");
            }

            const message = useGetErrorMessage(error);
            return errorRes(message);
        }
    }


    async createUser(body: CreateUserDTO): Promise<Option<string>> {
        const day = new Date();
        const { name, profileUrl, phoneNumber, agreements } = body;

        try {
            const res = await axios.post("https://api.gyopoom.kr:4098/users", {
                phoneNumber: phoneNumber,
                name: name,
                userStateCode: "",
                area: "강동구",
                profileUrl: profileUrl,
                agreements: agreements
            });

            if (res.status == 201) {
                if (window.ReactNativeWebView) {
                    // 모바일이라면 모바일에게 token을 전달합니다.
                    window.ReactNativeWebView.postMessage(
                        JSON.stringify({ type: 'accessToken', data: res.data.accessToken })
                    );
                    window.ReactNativeWebView.postMessage(
                        JSON.stringify({ type: 'refreshToken', data: res.data.refreshToken })
                    );
                } else {
                    setCookie("accessToken", res.data.accessToken, {
                        path: '/',
                        expires: new Date(new Date().setDate(day.getDate() + 7)),
                        secure: true,
                        httpOnly: true
                    });
                    setCookie("refreshToken", res.data.refreshToken, {
                        path: '/',
                        expires: new Date(new Date().setDate(day.getDate() + 14)),
                        secure: true,
                        httpOnly: true
                    });
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
                axios.defaults.headers.common['RefreshToken'] = res.data.refreshToken;
                return successRes(res);
            }

            return errorRes("새로고침을 해주세요");
        } catch (err: unknown) {
            const message = useGetErrorMessage(err);

            return errorRes(message);
        }
    }
}