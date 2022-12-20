import { theme } from "@styles/theme"
import styled from "styled-components"

const WithGuttersFourSidesLayoutForNotScroll = styled.div<{ bg?: string }>`
  display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
    padding: 2rem;
    background-color: ${({ bg }) => bg ? bg : theme.color.N0};
`

export default WithGuttersFourSidesLayoutForNotScroll
