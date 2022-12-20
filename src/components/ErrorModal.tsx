import Typography from "@components/Typograpy"
import styled from "styled-components"
import { theme } from "@styles/theme"
import ErrorIcon from "@images/icons/blue_error.svg"
import Modal from "@components/Modal"
import DownToUpPageTransition from "@components/animation/DownToUpPageTransition"
import DefaultPageTransition from "@components/animation/DefaultPageTransition"
import FillButton from "./FillButton"
import { style3 } from "@utils/theme/button/style3"

type Props = {
    isClose: () => void,
    message: string | undefined
}

const ErrorModal: React.FC<Props> = ({ isClose, message }) => {

    return (
        <DefaultPageTransition>
            <Modal isOpen={message !== undefined} isClose={isClose}>
                <DownToUpPageTransition>
                    <ModalBox>
                        <img style={{ marginTop: "1.2rem" }} src={ErrorIcon} alt="에러 아이콘" />
                        <Typography.H100M color={theme.color.N300} style={{ marginTop: "0.5rem" }}>{message}</Typography.H100M>
                        <ButtonWrapperper>
                            <FillButton
                                id="yes-button"
                                label="확인"
                                disabled={false}
                                handleOnClick={isClose}
                                {...style3} />
                        </ButtonWrapperper>
                    </ModalBox>
                </DownToUpPageTransition>
            </Modal>
        </DefaultPageTransition>
    )
}

const ButtonWrapperper = styled.div`
    margin-top: 2.4rem;
`

const ModalBox = styled.div`
    width: 32.8rem;
    border-radius: 0.8rem;
    background-color: ${theme.color.N0};
    margin: auto;
    padding: 1.2rem 1rem;
    text-align: center;
`

export default ErrorModal