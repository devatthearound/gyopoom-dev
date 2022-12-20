import Typography from "@components/Typograpy"
import styled from "styled-components"
import { theme } from "@styles/theme"
import PrivateModal from "@components/PrivateModal"
import DownToUpPageTransition from "@components/animation/DownToUpPageTransition"
import DefaultPageTransition from "@components/animation/DefaultPageTransition"
import ConfireModalDTO from "@dto/confirm-modal.dto"
import Flex from "../Flex"

const BasicConfirmModal: React.FC<ConfireModalDTO> = ({ title, label, confirmButton, isOpen, icon, cancelButton, children }) => {
    return (
        <PrivateModal isOpen={isOpen}>
            <DefaultPageTransition>
                <DownToUpPageTransition key="errorModal">
                    <ModalBox>
                        {
                            icon && (
                                <img src={icon} alt="icon" style={{ marginTop: "1.2rem", width: "2.4rem" }} />
                            )
                        }
                        <Typography.H75M color={theme.color.N900}
                            style={{ marginTop: "0.6rem" }}>{title}</Typography.H75M>
                        {
                            label && (
                                <Typography.P200
                                    style={{ marginTop: "1.2rem" }}
                                    color={theme.color.N100}>
                                    {label}
                                </Typography.P200>
                            )
                        }
                        {
                            children && (
                                <div style={{ marginTop: "1.2rem" }}>
                                    {children}
                                </div>
                            )
                        }
                        <Flex style={{ justifyContent: "center", gap: "10px", marginTop: "2.4rem" }}>
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

export default BasicConfirmModal