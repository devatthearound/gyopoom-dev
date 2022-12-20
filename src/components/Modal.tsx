import { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"

type Props = {
    isOpen: boolean;
    isClose: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactChild
}

const Modal: React.FC<Props> = ({ isOpen, isClose, children }) => {
    const outSideClickRef = useRef<any>();

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

    return (
        <>
            <Wrapperper isOpen={isOpen}>
                <Conatiner ref={outSideClickRef}>
                    {children}
                </Conatiner>
            </Wrapperper>
        </>
    )
}

const Wrapperper = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgb(20,20,20, 0.6);
`

const Conatiner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default Modal