import DelayShowElement from "@components/animation/DelayShowElement";
import DownToUpPageTransition from "@components/animation/DownToUpPageTransition";
import Modal from "@components/Modal"
import Typography from "@components/Typograpy";
import { theme } from "@styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
    isOpen: boolean;
    isClose: React.Dispatch<React.SetStateAction<string>>
    label: string,
    icon: string
}

const Complete: React.FC<Props> = ({ isOpen, isClose, label, icon }) => {
    const [close, setClose] = useState<boolean>(false);

    useEffect(() => {
        isClose("");
    }, [close])

    return (
        <DownToUpPageTransition>
            <Modal isOpen={isOpen} isClose={setClose} >
                <DelayShowElement>
                    <ModalBox>
                        <Typography.H50
                            color={theme.color.N600}>{label}
                        </Typography.H50>
                        <Img src={icon} alt={label} />
                    </ModalBox>
                </DelayShowElement>
            </Modal>
        </DownToUpPageTransition>
    )
}

const ModalBox = styled.div`
    width: 32.8rem;
    border-radius: 0.8rem;
    background-color: ${theme.color.N0};
    margin: auto;
    padding: 3rem 2rem;
    text-align: center;
`

const Img = styled.img`
    width: 5.4rem;
    height: 5.4rem;
    margin-top: 0.8rem;
`

export default Complete