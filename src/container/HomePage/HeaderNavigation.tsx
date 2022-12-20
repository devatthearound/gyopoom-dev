import LabelOnTheLeftAndActionButtonsOnTheRightEnd from "@components/HeaderNavigation/LabelOnTheLeftAndActionButtonsOnTheRightEnd"
import { isSuccess } from "@utils/options"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import NotifyIcon from "@images/icons/notifications_none.svg"
import SearchIcon from "@images/icons/search.svg"
import { theme } from "@styles/theme"
import styled from "styled-components"
import UserDTO from "@dto/user.dto"
import UserMiddleware from "@middleware/user.middleware"

const HeaderNavigation = () => {
    const navigate = useNavigate();
    const userMiddleware = new UserMiddleware();

    const getUsers = async () => {
        const apiRes = await userMiddleware.getUser();
        if (isSuccess(apiRes)) return apiRes.data as UserDTO;
    };

    const { isLoading, data } = useQuery('user', getUsers);

    const Actions = [
        {
            event: () => navigate('/search'),
            iconType: SearchIcon
        },
        {
            event: () => { },
            iconType: NotifyIcon
        }
    ]

    return (
        <HeaderNavigationWrapper style={{ backgroundColor: theme.color.N0 }}>
            <LabelOnTheLeftAndActionButtonsOnTheRightEnd
                label={`안녕하세요. ${data?.name} 약사님 👋`}
                actions={Actions} />
        </HeaderNavigationWrapper>
    )
}

const HeaderNavigationWrapper = styled.div`
    z-index: 99;
    width:100%;
`

export default HeaderNavigation