import DelayShowElement from "@components/animation/DelayShowElement";
import DownToUpPageTransition from "@components/animation/DownToUpPageTransition";
import Typography from "@components/Typograpy";
import InputWithLable from "@components/Input/InputWithLable";
import { theme } from "@styles/theme";
import { useState } from "react";
import { isSuccess } from "@utils/options";
import styled from "styled-components";
import FillButton from "@components/FillButton";
import { useErrorHandlerForm } from "@context/ErrorHandleContext";
import AuthMiddleware from "@middleware/auth.middleware";
import useStep from "@container/AuthPage/step.store";
import HeaderNavigation from "@container/AuthPage/HeaderNavigation";
import WithGuttersLeftAndRightLayoutForNotScroll from "@components/Layout/WithGuttersLeftAndRightLayoutForNotScroll";
import { style1 } from "@utils/theme/button/style1";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/blue_error.svg"
import useRegisterStore from "@store/terms";

const SendAuthNumberForm: React.FC = () => {
    const { phoneNumber, setPhoneNumber } = useRegisterStore();
    const { nextStep } = useStep();
    const authMiddleware = new AuthMiddleware();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const [loading, setLoading] = useState<boolean>(false);

    const sendAuthCode = async () => {
        setLoading(true);
        const apiRes = await authMiddleware.sendCode(phoneNumber.value);

        if (isSuccess(apiRes)) return nextStep()

        setLoading(false);
        setIsConfirmModalOpen({
            isOpen: true,
            title: apiRes.message,
            icon: ErrorIcon,
            confirmButton: {
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                label: "확인",
                bgColor: theme.color.B300,
                textColor: theme.color.N0,
                width: 10
            }
        })
    };

    return (
        <>
            <HeaderNavigation />
            <WithGuttersLeftAndRightLayoutForNotScroll>
                <DownToUpPageTransition>
                    <Typography.H200M
                        color={theme.color.N900}>
                        약사님 확인을 위해<br /> 전화번호를 입력해주세요.
                    </Typography.H200M>
                    <InputWithLable style={{ width: "100%", marginTop: "2rem" }}
                        elements={phoneNumber}
                        onChange={setPhoneNumber} />
                    <Typography.P100
                        margin="0.3rem 0 0 0"
                        color={theme.color.N70}>
                        인증번호는 문자메세지로 발송되며,<br />
                        수신하지 못했다면 차단된 메세지를 확인해주세요.
                    </Typography.P100>
                </DownToUpPageTransition>
                <BottomWrapper>
                    <DelayShowElement>
                        <FillButton
                            id="phoneNumber"
                            label="확인"
                            loading={loading}
                            handleOnClick={sendAuthCode}
                            disabled={phoneNumber.invalid}
                            {...style1} />
                    </DelayShowElement>
                </BottomWrapper>
            </WithGuttersLeftAndRightLayoutForNotScroll>
        </>
    )
}

const BottomWrapper = styled.div`
    width: calc(100% - 4rem);
    position: absolute;
    text-align: center;
    left: 50%;
    bottom: 1.6rem;
    transform: translate(-50%, 0);
`

export default SendAuthNumberForm;