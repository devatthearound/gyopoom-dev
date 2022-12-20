import { theme } from "@styles/theme"
import { motion } from "framer-motion"
import styled from "styled-components"

export const Li = styled.li<{ width?: string, isClick: boolean }>`
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
    /* transition: all 0.2s ease; */
`
export const UnderLine = styled(motion.div) <{ tabWidth: number }>`
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    width: ${props => props.tabWidth + "%"};
    background: ${theme.color.B300};
`

export const Container = styled.div`
    height:100%;
    overflow: hidden;
`

export const Footer = styled.div`
    z-index: 99;
    width: 100%;
`
