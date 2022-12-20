import React, { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { theme } from "@styles/theme";
import DelayShowElement from "@components/animation/DelayShowElement";
import Flex from "@components/Flex";
import Typography from "@components/Typograpy";
import Loading from "./Loading";
import FillButton from "./FillButton";
import { style3 } from "@utils/theme/button/style3";
import { style5 } from "@utils/theme/button/style5";

interface Value {
    selectedTab: number,
    setSelectedTab: React.Dispatch<React.SetStateAction<number>>,
    totalTabs: number,
    setTotalTabs: React.Dispatch<React.SetStateAction<number>>,
}

type Props = {
    children: React.ReactChild[]
}

type PropsTabHeader = {
    labels: string[],
    width?: string;
}

const TabContext = createContext<Value>({} as Value);
const useTabContext = () => useContext(TabContext);

const Tab = ({ children }: Props) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [totalTabs, setTotalTabs] = useState<number>(0);

    const value = {
        selectedTab,
        setSelectedTab,
        totalTabs,
        setTotalTabs
    }

    return (
        <TabContext.Provider value={value}>
            {children}
        </TabContext.Provider>
    )
}
export const TabHeader: React.FC<PropsTabHeader> = ({ labels }) => {
    const { selectedTab, setSelectedTab } = useTabContext();
    const gap = 100 / labels.length;

    return (
        <div style={{
            backgroundColor: theme.color.N0,
            borderBottom: `1px solid ${theme.color.N30}`
        }}>
            <ul style={{
                display: "flex",
                width: "100%",
                padding: "0 2rem",
                position: "relative"
            }}>
                {labels.map((label, key) => (
                    <Li
                        width="100%"
                        key={key}
                        isClick={key === selectedTab}
                        onClick={() => setSelectedTab(key)}
                    >
                        {`${label}`}
                    </Li>
                ))}
                <UnderLine width={gap}
                    transition={{
                        type: "spring", duration: 0.5
                    }}
                    animate={{
                        x: 100 * selectedTab + "%"
                    }}
                />
            </ul>
        </div>
    )
}

type PropsTabFooter = {
    submit: () => void;
    loading: boolean;
}

type ButtonColor = {
    BackgroundColor: string,
    fontColor: string
}

export const TabFooter: React.FC<PropsTabFooter> = ({ submit, loading }) => {
    const { selectedTab, setSelectedTab, totalTabs } = useTabContext();

    const prev = () => setSelectedTab(selectedTab - 1)
    const next = () => setSelectedTab(selectedTab + 1)

    const MainButtonColor = {
        BackgroundColor: theme.color.B300,
        fontColor: theme.color.N0
    }

    const SubButtonColor = {
        BackgroundColor: theme.color.N30,
        fontColor: theme.color.N900
    }

    return (
        <Flex style={{
            width: "100%",
            padding: "1.2rem 1.6rem",
            borderTop: `1px solid ${theme.color.N40}`,
            background: theme.color.N0,
            justifyContent: "space-between"
        }}>
            <div>
                {selectedTab > 0 &&
                    <FillButton
                        id="prev-button"
                        label="이전"
                        disabled={false}
                        handleOnClick={prev}
                        {...style5} />
                }
            </div>
            <div>
                {selectedTab < totalTabs &&
                    <FillButton
                        id="next-button"
                        label="다음"
                        disabled={false}
                        handleOnClick={next}
                        {...style3} />}
                {selectedTab == totalTabs &&
                    <FillButton
                        id="submit-button"
                        label="완료"
                        disabled={false}
                        loading={loading}
                        handleOnClick={submit}
                        {...style3} />
                }
            </div>
        </Flex>
    )
}

const Li = styled.li<{ width?: string, isClick: boolean }>`
    width: ${(props) => props.width ? props.width : "auto"};
    position: relative;
    padding: 1.1rem 0.8rem;
    cursor: pointer;
    user-select: none;
    font-size: ${theme.fontSize.P200};
    font-weight: ${theme.fontWeight.Bold};
    letter-spacing: ${theme.letterSpacing.normal}px;
    line-height:  ${theme.lineHeight.normal};
    color: ${(props) => props.isClick ? theme.color.N900 : theme.color.N50} !important;
    text-align: center;
`

const UnderLine = styled(motion.div) <{ width: number }>`
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    width: ${props => props.width + "%"};
    background: ${theme.color.B300};
`

type PropsTabBody = {
    children: React.ReactNode[]
}

export const TabBody: React.FC<PropsTabBody> = ({ children }) => {
    const { selectedTab, setSelectedTab, setTotalTabs } = useTabContext();

    setTotalTabs(children.length - 1)

    return (
        <main style={{ height: "100%" }}>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ height: "100%" }}>
                    {children[selectedTab]}
                </motion.div>
            </AnimatePresence>
        </main>
    )
}

export default Tab