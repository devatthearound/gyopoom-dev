import { theme } from "@styles/theme"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import LabelOnTheCenterAndBothActionButtons from "@components/HeaderNavigation/LabelOnTheCenterAndBothActionButtons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderNavigation: React.FC = () => {
    const navigate = useNavigate();

    const LeftActions = [{
        event: () => navigate("/account"),
        iconType: BackIcon
    }]


    return (
        <HeaderNavigationWrapper style={{ backgroundColor: theme.color.N0 }}>
            <LabelOnTheCenterAndBothActionButtons
                label="판매내역"
                leftActions={LeftActions} />
        </HeaderNavigationWrapper>
    )
}
const HeaderNavigationWrapper = styled.div`
    z-index: 99;
    width:100%;
`

export default HeaderNavigation