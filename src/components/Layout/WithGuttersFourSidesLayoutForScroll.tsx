import styled from "styled-components"

const WithGuttersFourSidesLayoutForScroll = styled.div<{ bg: string }>`
    display: flex;
    flex-direction: column;
    width:100%;
    height: 100%;
    padding: 2rem;
    overflow: scroll;
    background-color: ${({ bg }) => bg};
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`

export default WithGuttersFourSidesLayoutForScroll
