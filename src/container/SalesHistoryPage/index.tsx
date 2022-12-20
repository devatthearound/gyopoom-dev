import styled from "styled-components";
import { theme } from "@styles/theme";
import TabOnHidden from "@components/MyGoodsTabs/Tabs/TabOnHidden";
import TabOnReservationAndSale from "@components/MyGoodsTabs/Tabs/TabOnReservationAndSale";
import TabOnSoldOut from "@components/MyGoodsTabs/Tabs/TabOnSoldOut";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import HeaderNavigation from "./HeaderNavigation";

const SalesHistoryPage = () => {
    const headMenu = [{
        label: "판매중",
        hash: "sale",
    }, {
        label: "거래완료",
        hash: "sold-out"
    }, {
        label: "숨김",
        hash: "suspend",
    }];

    const gap = 100 / headMenu.length;

    const [currentMenuIndex, setCurrentMenuIndex] = useState<number>(0);

    const { hash } = useLocation();

    useEffect(() => {
        if (hash.includes("sale")) {
            setCurrentMenuIndex(0)
        } else if (hash.includes("sold-out")) {
            setCurrentMenuIndex(1)
        } else if (hash.includes("suspend")) {
            setCurrentMenuIndex(2)
        }
    }, [hash])

    return (

        <WithNoGuttersTopAndBottomLayout>
            <HeaderNavigation />
            <Container>
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
                        {
                            headMenu.map((menu, key) => (
                                <Li key={key} width={gap + "%"} isClick={key == currentMenuIndex}>
                                    <Link to={`#${menu.hash}`} style={{ display: "block", width: "100%", padding: " 1.1rem 0.8rem" }}>
                                        {menu.label}
                                    </Link>
                                </Li>
                            ))
                        }
                        <UnderLine
                            tabWidth={gap}
                            transition={{ type: "spring" }}
                            animate={{ x: 100 * currentMenuIndex + "%" }} />
                    </ul>
                </div>
                {
                    currentMenuIndex == 0 ?
                        <TabOnReservationAndSale />
                        : currentMenuIndex == 1 ?
                            <TabOnSoldOut />
                            : <TabOnHidden />
                }
            </Container>
        </WithNoGuttersTopAndBottomLayout>

    )
}

const Container = styled.div`
    height:100%;
    overflow: scroll;
    background-color: ${theme.color.N20};
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`
const Li = styled.li<{ width?: string, isClick: boolean }>`
    width: ${(props) => props.width ? props.width : "auto"};
    position: relative;
    cursor: pointer;
    user-select: none;
    font-size: ${theme.fontSize.P200};
    font-weight: ${theme.fontWeight.Bold};
    letter-spacing: ${theme.letterSpacing.normal}px;
    line-height:  ${theme.lineHeight.normal};
    color: ${(props) => props.isClick ? theme.color.N900 : theme.color.N50} !important;
    text-align: center;
    transition: all 0.2s ease;
`
const UnderLine = styled(motion.div) <{ tabWidth: number }>`
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    width: ${props => props.tabWidth + "%"};
    background: ${theme.color.B300};
`
export default SalesHistoryPage