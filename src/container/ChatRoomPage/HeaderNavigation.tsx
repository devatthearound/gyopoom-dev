import NotifyIcon from "@images/icons/notifications_none.svg"
import { theme } from "@styles/theme"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import LabelOnTheCenterAndBothActionButtons from "@components/HeaderNavigation/LabelOnTheCenterAndBothActionButtons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import RoomDTO from "@dto/room.dto";
import { useGetUser } from "@context/AuthContext";

type Props = {
    room: RoomDTO
}

const HeaderNavigation: React.FC<Props> = ({ room }) => {
    const { user } = useGetUser();
    const navigate = useNavigate();
    const reciverId = room.user.filter((val) => { if (val.id != user?.id) return val });

    const LeftActions = [{
        event: () => navigate("/my-chat"),
        iconType: BackIcon
    }]

    const RightActions = [{
        event: () => { },
        iconType: NotifyIcon
    }]


    return (
        <HeaderNavigationWrapper style={{ backgroundColor: theme.color.N0 }}>
            {reciverId &&
                <LabelOnTheCenterAndBothActionButtons
                    label={room != undefined ? reciverId[0].name : ""}
                    leftActions={LeftActions}
                    rightActions={RightActions} />
            }

        </HeaderNavigationWrapper>
    )
}
const HeaderNavigationWrapper = styled.div`
    z-index: 99;
    width:100%;
`

export default HeaderNavigation