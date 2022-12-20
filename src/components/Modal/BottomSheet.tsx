import React, { FC, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import BottomSheetHeader from './BottomSheetHeader';
import { useBottomSheet } from '@hooks/useBottomSheet';
type Props = {
    isOpen: boolean,
    isClose: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode | React.ReactNode[],
    y: number
}

const BottomSheet: React.FC<Props> = ({ isOpen, isClose, children, y }) => {
    const { sheetRef, modelSheetRef, isShow } = useBottomSheet(isOpen, y)
    const outSideClickRef = useRef<any>();

    const Wrapperper = styled.div<{ isOpen: boolean }>`
        display: flex;
        flex-direction: column;
        position: fixed;
        z-index: 1;
        bottom: 0;
        left: 0;
        right: 0;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        background-color: #fff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
        height: ${y}px;
        transition: transform 150ms ease-out;
`;


    const handleOurSideClickEvent = useCallback((e: any) => {
        if (!outSideClickRef.current.contains(e.target)) {
            isClose(false)
        }
    }, [isClose]);

    useEffect(() => {
        window.addEventListener('mousedown', handleOurSideClickEvent);
        return () => {
            window.removeEventListener('mousedown', handleOurSideClickEvent);
        }
    }, [handleOurSideClickEvent]);

    useEffect(() => {
        if (isOpen) {
            isClose(isShow)
        }
    }, [isShow])

    return (
        <>
            <Modal isOpen={isOpen} ref={modelSheetRef}>
                <div ref={outSideClickRef}>
                    <Wrapperper ref={sheetRef} isOpen={false}>
                        <BottomSheetHeader />
                        <ItemList>
                            {children}
                        </ItemList>
                    </Wrapperper>
                </div>
            </Modal>
        </>
    );
};

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;
`

const Modal = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgb(20,20,20, 0.6);
    transition: transform 150ms ease-out;
`
export default BottomSheet;