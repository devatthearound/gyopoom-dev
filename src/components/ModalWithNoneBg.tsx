import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"

type Props = {
    isOpen: boolean;
    isClose: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactChild
}

const ModalWithNoneBg: React.FC<Props> = ({ isOpen, isClose, children }) => {
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

    const draw = {
        visible: {
            opacity: 1
        },
        hidden: {
            opacity: 0,
            display: "none",
            transition: {
                display: { duration: 0.01 }
            }
        },
    };

    return (
        <Wrapperper isOpen={isOpen}
            animate={isOpen ? "visible" : "hidden"}
            variants={draw}>
            <Conatiner ref={outSideClickRef}>
                {children}
            </Conatiner>
        </Wrapperper>
    )
}

const Wrapperper = styled(motion.div) <{ isOpen: boolean }>`
    display: ${({ isOpen }) => isOpen ? 'none' : 'block'};
`

const Conatiner = styled.div`

`

export default ModalWithNoneBg