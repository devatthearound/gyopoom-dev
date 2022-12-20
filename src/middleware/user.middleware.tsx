
import { errorRes, Option, successRes } from "@utils/options";
import useGetErrorMessage from "@hooks/useGetErrorMessage";
import axios from "axios";
import UserDTO from "@dto/user.dto";
import UpdateUserDto from "@dto/user-update.body";
import { setCookie } from "@hooks/useCookie";

export default class UserMiddleware {
    async getUser(): Promise<Option<UserDTO>> {
        try {
            const res = await axios.get("http://54.180.10.194:4098/users");

            return successRes(res);
        } catch (err: unknown) {
            const message = useGetErrorMessage(err);

            return errorRes(message);
        }
    }

    async updateUser(body: UpdateUserDto): Promise<Option<UserDTO>> {
        try {
            const res = await axios.patch(`http://54.180.10.194:4098/users`, body)
            return successRes(res)
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async loginOut(): Promise<Option<string>> {
        if (window.ReactNativeWebView) {
            // 모바일이라면 모바일에게 token을 전달합니다.
            window.ReactNativeWebView.postMessage(
                JSON.stringify({ type: 'loginOut' })
            );
        } else {
            setCookie('accessToken', "")
            setCookie('refreshToken', "")
        }
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    type: 'logout',
                })
            );
        }
        axios.defaults.headers.common['Authorization'] = `Bearer `;
        axios.defaults.headers.common['RefreshToken'] = '';
        return successRes({ status: 204, data: "성공" })
    }


    async deleteUser(): Promise<Option<boolean>> {
        try {
            const res = await axios.delete("http://54.180.10.194:4098/users");

            if (res.status == 204) {
                return successRes(res);
            }

            return errorRes("새로고침을 해주세요");
        } catch (err: unknown) {
            const message = useGetErrorMessage(err);
            return errorRes(message);
        }
    }

}