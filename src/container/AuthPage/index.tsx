import SendAuthNumberForm from "./SendAuthNumberForm";
import AuthNumberVerifyForm from "@container/AuthPage/AuthNumberVerifyForm";
import NameEntryForm from "./NameEntryForm";
import ProfileEntryForm from "./ProfileEntryForm";
import TermsOfServiceEntryForm from "./TermsOfServiceEntryForm";
import useStep from "./step.store";

const AuthPage = () => {
    const { currentIndex } = useStep();

    switch (currentIndex) {
        case 0:
            return <SendAuthNumberForm />
        case 1:
            return <AuthNumberVerifyForm />
        case 2:
            return <NameEntryForm />
        case 3:
            return <TermsOfServiceEntryForm />
        case 4:
            return <ProfileEntryForm />
        default:
            return <></>
    }
}

export default AuthPage