import styled from "styled-components"
import { theme } from "@styles/theme"
import AddIcon from "@images/icons/plus.svg"
import { Link } from "react-router-dom"
const FloatingActionButtons = () => {
    return (
        <Circle>
            <Img src={AddIcon} alt="교품 판매글 쓰기 버튼" />
        </Circle>
    )
}

const Circle = styled.div`
    position: relative;
    width: 4.3rem;
    height: 4.3rem;
    background-color: ${theme.color.B300};
    border-radius: 100%;
    box-shadow: ${theme.shadow.Float1};
`

const Img = styled.img`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    filter: ${theme.svgColor.N0};
`

export default FloatingActionButtons