import React, { createContext, useContext, useState } from 'react';
import { User } from 'firebase/auth';
import InputElements from '@dto/input.elements';
import { defaultCode, defaultName, defaultPhoneNumber, defaultProfile } from '@utils/create-user.input';

interface Value {
    modalMessage: string
    setModalMessage: React.Dispatch<React.SetStateAction<string>>
}

const errorHandlerContext = createContext<Value>({} as Value);

const useErrorHandlerForm = (): Value => {
    return useContext(errorHandlerContext);
}

const ErrorHandlerProvider = (props: { children: React.ReactNode }) => {
    const [modalMessage, setModalMessage] = useState<string>("");

    const value = {
        modalMessage,
        setModalMessage
    };

    return <errorHandlerContext.Provider value={value} {...props} />
};

export { ErrorHandlerProvider, useErrorHandlerForm, errorHandlerContext };