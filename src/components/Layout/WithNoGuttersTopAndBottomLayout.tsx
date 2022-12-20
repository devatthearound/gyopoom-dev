import { theme } from "@styles/theme"
import styled from "styled-components"

const WithNoGuttersTopAndBottomLayout = styled.div<{ bg?: string }>`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: ${({ bg }) => bg ? bg : theme.color.N0};
`

export default WithNoGuttersTopAndBottomLayout
