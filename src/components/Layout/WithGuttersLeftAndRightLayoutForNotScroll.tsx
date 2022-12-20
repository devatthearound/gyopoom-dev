import { theme } from "@styles/theme"
import styled from "styled-components"

const WithGuttersLeftAndRightLayoutForNotScroll = styled.div<{ bg?: string }>`
    display:flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    padding: 0 2rem;
    background-color: ${({ bg }) => bg ? bg : theme.color.N0};
`

export default WithGuttersLeftAndRightLayoutForNotScroll
