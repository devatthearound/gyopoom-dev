import LabelOnTheLeftAndActionButtonsOnTheRightEnd from "@components/HeaderNavigation/LabelOnTheLeftAndActionButtonsOnTheRightEnd"
import NotifyIcon from "@images/icons/notifications_none.svg"
import { theme } from "@styles/theme"
import styled from "styled-components"

const HeaderNavigation = () => {

    const Actions = [
        {
            event: () => { },
            iconType: NotifyIcon
        }
    ]

    return (
        <HeaderNavigationWrapper style={{ backgroundColor: theme.color.N0 }}>
            <LabelOnTheLeftAndActionButtonsOnTheRightEnd
                label="채팅"
                actions={Actions} />
        </HeaderNavigationWrapper>
    )
}

const HeaderNavigationWrapper = styled.div`
    z-index: 99;
    width:100%;
`

export default HeaderNavigation