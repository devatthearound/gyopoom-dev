import styled from "styled-components";
import CloseIcon from "@images/icons/close.svg"
import React, { useEffect, useState } from "react";
import Hide from "@components/Hide";
import Typography from "@components/Typograpy";
import { theme } from "@styles/theme";
import ErrorIcon from "@images/icons/modal-error.svg"
import ResetButton from "@components/ResetButton";
import BasicConfirmModal from "@components/BasicConfirmModal";
import ConfireModalDTO from "@dto/confirm-modal.dto";
import { useNavigate } from "react-router-dom";
import useModalStore from "@components/BasicConfirmModal/modal.store";

type Props = {
    label: string,
    state: boolean
    onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
}


const ChangeDataWithApiHeaderNagigation: React.FC<Props> = ({ label, state, onSubmit }) => {
    const navigate = useNavigate();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const toBeClosePage = () => {
        setIsConfirmModalOpen({
            isOpen: true,
            title: "정말로 창을 닫으시겠습니까?",
            icon: ErrorIcon,
            confirmButton: {
                handleOnClick: () => {
                    navigate(-1);
                    setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false });
                },
                label: "확인",
                width: 5
            },
            cancelButton: {
                width: 5,
                label: "취소",
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
            },
        })
    }


    return (
        <>
            <TopMenu>
                <li>
                    <CloseButton onClick={toBeClosePage}><Hide>닫기</Hide></CloseButton>
                </li>
                <li>
                    <Typography.H75M
                        color={theme.color.N900}>
                        {label}
                    </Typography.H75M>
                </li>
                <li>
                    <ResetButton handleOnClick={onSubmit} isLoading={state}>
                        <Typography.H75
                            color={theme.color.B300}>
                            완료
                        </Typography.H75>
                    </ResetButton>
                </li>
            </TopMenu>
        </>
    )
}

const CloseButton = styled.button`
    width: 2.4rem;
    height: 2.4rem;
    background: url(${CloseIcon}) no-repeat center;
    background-size: 100%;
    border: 0px;
    cursor: pointer;
`

const TopMenu = styled.ul`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4.8rem;
    padding: 1.2rem;
    background-color: ${theme.color.N0};
`
export default ChangeDataWithApiHeaderNagigation;