import Typography from "@components/Typograpy"
import styled from "styled-components"
import { theme } from "@styles/theme"
import PrivateModal from "@components/PrivateModal"
import DownToUpPageTransition from "@components/animation/DownToUpPageTransition"
import DefaultPageTransition from "@components/animation/DefaultPageTransition"
import ConfireModalDTO from "@dto/confirm-modal.dto"
import Flex from "../Flex"

const ReceiptConfirmModal: React.FC<ConfireModalDTO> = ({ title, label, confirmButton, isOpen, icon, cancelButton, children }) => {
    return (
        <PrivateModal isOpen={isOpen}>
            <DefaultPageTransition>
                <DownToUpPageTransition key="errorModal">
                    <ModalBox>
                        <Typography.H200M color={theme.color.N900}
                            style={{ marginTop: "0.6rem" }}>전자서명에 대한 동의</Typography.H200M>
                        <Ul style={{ marginTop: "3.4rem" }}>
                            <li>
                                <Typography.P200
                                    style={{ marginTop: "0.5rem" }}
                                    color={theme.color.N900}>
                                    전자서명 및 전자문서의 법적 효력에 대해 동의합니다.
                                </Typography.P200>
                            </li>
                            <li>
                                <Typography.P200
                                    style={{ marginTop: "0.5rem" }}
                                    color={theme.color.N900}>
                                    서명완료 후  전송되는 전자문서를 원본으로 인정합니다
                                </Typography.P200>
                            </li>
                            <li>
                                <Typography.P200
                                    style={{ marginTop: "0.5rem" }}
                                    color={theme.color.N900}>
                                    모든 서명자가 전자서명에 정당한 권한을 가지는 것을 확인했습니다.
                                </Typography.P200>
                            </li>
                            <li>
                                <Typography.P200
                                    style={{ marginTop: "0.5rem" }}
                                    color={theme.color.N900}>
                                    기타 자세한 내용은 전자서명 이용약관에 따라 동의합니다.
                                </Typography.P200>
                            </li>
                        </Ul>
                        <Flex style={{ justifyContent: "center", gap: "10px", marginTop: "5.6rem" }}>
                            {
                                cancelButton &&
                                <Button
                                    bgColor={cancelButton.bgColor ? cancelButton.bgColor : theme.color.N30}
                                    width={cancelButton.width * 10 + "%"}
                                    onClick={cancelButton.handleOnClick}>
                                    <Typography.H50M
                                        style={{ lineHeight: 3 }}
                                        color={cancelButton.textColor ? cancelButton.textColor : theme.color.N80}>{cancelButton.label}</Typography.H50M>
                                </Button>
                            }

                            {
                                confirmButton &&
                                <Button
                                    bgColor={confirmButton.bgColor ? confirmButton.bgColor : theme.color.B300}
                                    width={confirmButton.width * 10 + "%"}
                                    onClick={confirmButton.handleOnClick}>
                                    <Typography.H50M
                                        style={{ lineHeight: 3 }}
                                        color={confirmButton.textColor ? confirmButton.textColor : theme.color.N0}>{confirmButton.label}</Typography.H50M>
                                </Button>
                            }

                        </Flex>
                    </ModalBox>
                </DownToUpPageTransition>
            </DefaultPageTransition>
        </PrivateModal>
    )
}

const ModalBox = styled.div`
    width: 32.8rem;
    border-radius: 0.8rem;
    background-color: ${theme.color.N0};
    margin: auto;
    padding: 1.6rem 2.2rem;
    text-align: center;
`

const Button = styled.button<{ bgColor: string, width: string }>`
    width: ${props => props.width};
    height: 4.8rem;
    text-align: center;
    background-color:${props => props.bgColor};
    border-radius: 0.8rem;
    padding: 0 2rem;
    border: 0px;
    cursor: pointer;
`

const Ul = styled.ul`
    text-align: left;
    list-style: disc;
    padding-left: 20px;
`
export default ReceiptConfirmModal