import DefaultPageTransition from "@components/animation/DefaultPageTransition";
import DownToUpPageTransition from "@components/animation/DownToUpPageTransition";
import Modal from "@components/Modal";
import Signature from "@components/SignatureCanvas";
import { theme } from "@styles/theme";
import styled from "styled-components";
import CloseIcon from "@images/icons/close.svg"
import Typography from "@components/Typograpy";

type Props = {
    isOpen: boolean,
    getSignature: (data: any) => Promise<boolean>,
    isClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignModal: React.FC<Props> = ({ isOpen, getSignature, isClose }) => {
    return (
        <Modal isOpen={isOpen} isClose={isClose}>
            <DefaultPageTransition>
                <DownToUpPageTransition key="errorModal">
                    <ModalBox>
                        <Header onClick={() => isClose(false)}>
                            <Typography.H75M>사인 입력</Typography.H75M>
                            <img src={CloseIcon} width="28px" height="28px" />
                        </Header>
                        <Body>
                            <Signature getSignature={getSignature} />
                        </Body>
                    </ModalBox>
                </DownToUpPageTransition>
            </DefaultPageTransition>
        </Modal>
    )
}

const Header = styled.div`
    height: 4.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Body = styled.div`
    margin-top: 4rem;
`
const ModalBox = styled.div`
    width: 32.8rem;
    border-radius: 0.8rem;
    background-color: ${theme.color.N0};
    margin: auto;
    padding: 1.6rem 2.2rem;
    text-align: center;
`

export default SignModal 