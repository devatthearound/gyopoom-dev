import DelayShowElement from "@components/animation/DelayShowElement";
import DownToUpPageTransition from "@components/animation/DownToUpPageTransition";
import Flex from "@components/Flex";
import WithGuttersLayout from "@components/Layout/WithGuttersLeftAndRightLayoutForNotScroll";
import Typography from "@components/Typograpy";
import InputWithLable from "@components/Input/InputWithLable";
import { isSuccess } from "@utils/options";
import AuthMiddleware from "@middleware/auth.middleware";
import { theme } from "@styles/theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FillButton from "@components/FillButton";
import styled from "styled-components";
import { useErrorHandlerForm } from "@context/ErrorHandleContext";
import InputElements from "@dto/input.elements";
import { defaultCode } from "@utils/create-user.input";
import { useGetUser } from "@context/AuthContext";
import useGetCountDown from "@hooks/useGetCountDown";
import CountDownInputWithLable from "@components/Input/CountDownInputWithLable";
import useStep from "@container/AuthPage/step.store";
import { style1 } from "../../utils/theme/button/style1";
import { style4 } from "../../utils/theme/button/style4";
import HeaderNavigation from "./HeaderNavigation";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/blue_error.svg"
import useRegisterStore from "@store/terms";


const AuthNumberVerifyForm: React.FC = () => {
    const { minutes, seconds, resetButton } = useGetCountDown(3, 0)
    const authMiddleware = new AuthMiddleware();
    const [code, setCode] = useState<InputElements>(defaultCode)
    const { phoneNumber } = useRegisterStore();
    const { setUserValue } = useGetUser();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { nextStep } = useStep();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();
    const verifiAuthCode = async (e: React.MouseEvent<HTMLElement>) => {
        setLoading(true);

        const apiRes = await authMiddleware.signIn(code.value, phoneNumber.value);

        if (isSuccess(apiRes)) {
            if (apiRes.status == 201) {
                setUserValue();
                return navigate('/')
            }

            if (apiRes.status == 202) {
                return nextStep();
            }
        } else {
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
        }
    }

    const handleResendButton = async () => {
        const apiRes = await authMiddleware.sendCode(phoneNumber.value);

        if (isSuccess(apiRes)) {
            return resetButton();
        }

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
    }

    return (
        <>
            <HeaderNavigation />
            <WithGuttersLayout>
                <DownToUpPageTransition>
                    <Typography.H200M
                        color={theme.color.N700}>
                        인증번호를 입력해주세요.
                    </Typography.H200M>
                    <Typography.P200
                        style={{ marginTop: "1.6rem" }}
                        color={theme.color.N700}>
                        {phoneNumber.value}로 인증번호가 전송되었습니다.
                    </Typography.P200>
                    <Flex style={{ gap: "0.7rem", marginTop: "3rem" }}>
                        <CountDownInputWithLable
                            elements={code}
                            onChange={setCode}
                            minutes={minutes}
                            seconds={seconds} />
                        <FillButton
                            id="resend-button"
                            label="재전송"
                            handleOnClick={handleResendButton}
                            disabled={(minutes == 0 && seconds == 0) ? false : true}
                            height="4.8rem"
                            {...style4} />
                    </Flex>
                </DownToUpPageTransition>
                <BottomWrapper>
                    <DelayShowElement>
                        <FillButton
                            id="authCode"
                            label="다음"
                            loading={loading}
                            handleOnClick={verifiAuthCode}
                            disabled={code.invalid || (minutes == 0 && seconds == 0)}
                            {...style1} />
                    </DelayShowElement>
                </BottomWrapper>
            </WithGuttersLayout>
        </>
    )
}

const TypographyH50M = styled(Typography.H50M)`
    color: ${theme.color.N50};
`

const BottomWrapper = styled.div`
    width: calc(100% - 4rem);
    position: absolute;
    text-align: center;
    left: 50%;
    bottom: 1.6rem;
    transform: translate(-50%, 0);
`
export default AuthNumberVerifyForm;