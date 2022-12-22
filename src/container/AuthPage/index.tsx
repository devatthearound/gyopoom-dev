import SendAuthNumberForm from "./SendAuthNumberForm";
import { useState } from "react";
import InputElements from "@dto/input.elements";
import { defaultName, defaultPhoneNumber, defaultProfile } from "@utils/create-user.input";
import AuthNumberVerifyForm from "@container/AuthPage/AuthNumberVerifyForm";
import NameEntryForm from "./NameEntryForm";
import ProfileEntryForm from "./ProfileEntryForm";
import TermsOfServiceEntryForm from "./TermsOfServiceEntryForm";
import useStep from "./step.store";

type TremsDTO = {
    id: string
    thumbnail: string
    required: boolean
    link: string
    isAgree: boolean
    registrationItem: boolean
}

const AuthPage = () => {
    const { currentIndex } = useStep();
    const [phoneNumber, setPhoneNumber] = useState<InputElements>(defaultPhoneNumber)
    const [name, setName] = useState<InputElements>(defaultName)
    const [profile, setProfile] = useState<InputElements>(defaultProfile)
    const [checkList, setCheckList] = useState<TremsDTO[]>([]);

    const formData = {
        phoneNumber,
        setPhoneNumber,
        checkList,
        setCheckList,
        name,
        setName,
        profile,
        setProfile
    }

    switch (currentIndex) {
        case 0:
            return <SendAuthNumberForm item={formData} />
        case 1:
            return <AuthNumberVerifyForm item={formData} />
        case 2:
            return <NameEntryForm item={formData} />
        case 3:
            return <TermsOfServiceEntryForm item={formData} />
        case 4:
            return <ProfileEntryForm item={formData} />
        default:
            return <></>
    }
}

export default AuthPage