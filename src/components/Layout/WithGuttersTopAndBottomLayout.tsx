import styled from "styled-components"

const WithGuttersTopAndBottomLayout = styled.div`
    position:relative;
    height: 100%;
    padding-top: 4.8rem !important;
    padding-bottom: 8.0rem !important;
    overflow: scroll;
    ::-webkit-scrollbar {
        width: 0px;
    }
`

export default WithGuttersTopAndBottomLayout