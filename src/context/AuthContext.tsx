import UserDTO from '@dto/user.dto';
import { getCookie } from '@hooks/useCookie';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Value {
    user: UserDTO | undefined,
    setUser: any,
    setUserValue: () => void
}

const authContext = createContext<Value>({} as Value);

const useGetUser = (): Value => {
    return useContext(authContext);
}

const AuthProvider = (props: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserDTO>();
    const location = useLocation();
    const setUserValue = async () => {
        const res = await axios.get(`https://api.gyopoom.kr:4098/users`)
        if (res.status == 200) {
            setUser(res.data)
        }
    }

    useEffect(() => {
        if (location.pathname != '/landing' && location.pathname != '/healer-auth') {
            setUserValue();
        }
    }, [])

    const value = { user, setUser, setUserValue };

    return <authContext.Provider value={value} {...props} />
};


declare global {
    interface Window {
        ReactNativeWebView: {
            postMessage(msg: string): void;
        };
    }
}

export { AuthProvider, useGetUser, authContext };