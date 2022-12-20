import { theme } from "@styles/theme"
import styled from "styled-components"

const WithNoGuttersForScroll = styled.div<{ bg?: string }>`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: scroll;
    background-color: ${({ bg }) => bg ? bg : theme.color.N0};
`

export default WithNoGuttersForScroll
