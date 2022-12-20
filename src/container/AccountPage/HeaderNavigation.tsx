import LabelOnTheLeftAndActionButtonsOnTheRightEnd from "@components/HeaderNavigation/LabelOnTheLeftAndActionButtonsOnTheRightEnd"
import styled from "styled-components"

const AccountHeaderNavigation = () => {
    return (
        <HeaderNavigationWrapper>
            <LabelOnTheLeftAndActionButtonsOnTheRightEnd
                label="약사가 만든 스마트한 의약품교품 " />
        </HeaderNavigationWrapper>
    )
}


const HeaderNavigationWrapper = styled.div`
    z-index: 99;
    width:100%;
`

export default AccountHeaderNavigation