import { setCookie } from '@hooks/useCookie';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    function (response) {
        return response
    },
    async function (error) {
        if (error.response && error.response.status === 401) {
            if (error.response.data.message == "Auth token has expired") {
                const data = await axios.patch('https://api.gyopoom.kr:4099/auth/token');
                if (data.data) {
                    const { accessToken } = data.data;
                    const day = new Date;
                    if (window.ReactNativeWebView) {
                        // 모바일이라면 모바일에게 token을 전달합니다.
                        window.ReactNativeWebView.postMessage(
                            JSON.stringify({ type: 'accessToken', data: accessToken })
                        );
                    } else {
                        setCookie("accessToken", accessToken, {
                            path: '/',
                            expires: new Date(new Date().setDate(day.getDate() + 7)),
                            secure: true,
                            httpOnly: true
                        });
                    }
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    return await axios.request(error.config);
                } else {
                    window.location.href = '/landing';
                }
            }

            window.location.href = '/landing';
        }
        if (error.response && error.response.status === 500) {
            console.log(error)
        }
        return Promise.reject(error)
    }
)