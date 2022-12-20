import { useEffect, useRef } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";
import styled from "styled-components";

function usePrevious(value: boolean) {
    const previousValueRef = useRef<boolean>();

    useEffect(() => {
        previousValueRef.current = value;
    }, [value]);

    return previousValueRef.current;
}

type Props = {
    isOpen: boolean,
    stateChange: (state: boolean) => void,
    children: React.ReactNode
}

const DraggableBottomSheetWithHeader: React.FC<Props> = ({ isOpen, stateChange, children }) => {

    function onClose() {
        stateChange(false);
    }

    function onOpen() {
        stateChange(true);
    }

    function onToggle() {
        stateChange(!isOpen);
    }

    const prevIsOpen = usePrevious(isOpen);
    const controls = useAnimation();

    function onDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        const shouldClose =
            info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
        if (shouldClose) {
            controls.start("hidden");
            onClose();
        } else {
            controls.start("visible");
            onOpen();
        }
    }

    useEffect(() => {
        if (prevIsOpen && !isOpen) {
            controls.start("hidden");
        } else if (!prevIsOpen && isOpen) {
            controls.start("visible");
        }
    }, [controls, isOpen, prevIsOpen]);


    const draw = {
        visible: {
            opacity: 1
        },
        hidden: {
            opacity: 0,
            display: "none",
            transition: {
                // display: { delay: 0.5, duration: 0.01 }
            }
        },
    };


    return (
        <motion.div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 99999,
            backgroundColor: "rgb(9, 30, 66, 0.6)",
        }}
            animate={isOpen ? "visible" : "hidden"}
            variants={draw} >
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        bottom: 0,
                        left: 0
                    }}>
                    <motion.div
                        drag="y"
                        onDragEnd={onDragEnd}
                        initial="hidden"
                        animate={controls}
                        transition={{
                            type: "spring",
                            damping: 40,
                            stiffness: 400
                        }}
                        variants={{
                            visible: { y: 0 },
                            hidden: { y: "100%" }
                        }}
                        dragConstraints={{ top: 0 }}
                        dragElastic={0.2}
                        style={{
                            display: "inline-block",
                            backgroundColor: "white",
                            width: "100%",
                            height: "fit-content",
                            borderTopLeftRadius: "1.6rem",
                            borderTopRightRadius: "1.6rem",
                        }}
                    >
                        <Header>
                            <Handle />
                        </Header>
                        {children}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

const Handle = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

const Header = styled.div`
    height: 4.8rem;
    display: flex;
    justify-content: flex-end;
    padding: 1.3rem 1.6rem;
`


export default DraggableBottomSheetWithHeader