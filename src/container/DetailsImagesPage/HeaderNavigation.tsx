import ResetButton from "@components/ResetButton"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import { theme } from "@styles/theme"
import styled from "styled-components"

type Props = {
    prevAction: () => void
}

const HeaderNavigation: React.FC<Props> = ({ prevAction }) => {
    const ActionsButton = {
        event: prevAction,
        iconType: BackIcon
    }

    return (
        <Wrapper>
            <ResetButton handleOnClick={ActionsButton.event}>
                <Img src={ActionsButton.iconType} alt="아이콘 이미지" />
            </ResetButton>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    position: absolute;
    top: 10px;
    left: 5px;
`

const Img = styled.img`
    width: 2.4rem;
    height: 2.4rem;
    filter: ${theme.svgColor.N0};
`

export default HeaderNavigation