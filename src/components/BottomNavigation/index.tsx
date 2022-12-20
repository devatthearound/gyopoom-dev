import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import HomeIconSvg from "@images/icons/home.svg"
import InfoIconSVg from "@images/icons/library_books.svg"
import ChatIconSvg from "@images/icons/chat.svg"
import MyIconSvg from "@images/icons/user.svg"
import { theme } from "@styles/theme"
import Typography from "@components/Typograpy"
import FloatingActionButtons from "./FloatingActionButtons"
import BounceClickAnimation from "@components/animation/BounceClickAnimation"
import UnReadMessageNotifiCard from "@components/UnReadMessageNotifiCard"
import useChatRoom from "@store/chatRoom"

const BottomNavigationBar = () => {
    const { pathname } = useLocation();
    const { totalUnreadMessage } = useChatRoom();
    return (
        <Ul>
            <Li>
                <Link to="/">
                    <BounceClickAnimation>
                        <Img src={HomeIconSvg} alt="홈" active={pathname === "/"} />
                        <StyledTypography active={pathname === "/"}><span>홈</span></StyledTypography>
                    </BounceClickAnimation>
                </Link>
            </Li>
            <Li style={{ position: "relative" }}>
                <Link to="/my-chat">
                    <BounceClickAnimation>
                        <Img src={ChatIconSvg} alt="메세지" active={pathname === "/my-chat"} />
                        <StyledTypography active={pathname === "/my-chat"}><span>메시지</span></StyledTypography>
                    </BounceClickAnimation>
                </Link>
                <Wrapper count={totalUnreadMessage}>
                    <UnReadMessageNotifiCard count={totalUnreadMessage} />
                </Wrapper>
            </Li>
            <Li>
                <Link to="/account">
                    <BounceClickAnimation>
                        <Img src={MyIconSvg} alt="내정보" active={pathname === "/account"} />
                        <StyledTypography active={pathname === "/account"}><span>내정보</span></StyledTypography>
                    </BounceClickAnimation>
                </Link>
            </Li>
            <li>
                <Link to="/new-goods">
                    <BounceClickAnimation>
                        <FloatingActionButtons />
                    </BounceClickAnimation>
                </Link>
            </li>
        </Ul>
    )
}

const Ul = styled.ul`
    background-color: ${theme.color.N0};
    display: flex;
    justify-content: space-around;
    border-top: 1px solid ${theme.color.N40};
    padding: 0.8rem 0;
    text-align: center;
    height: 7.4rem;
`

const Li = styled.li`
    :hover{
        span{
            color: ${theme.color.B300}
        }
        img{
            filter: ${theme.svgColor.B300};
        }
    }
`
const StyledTypography = styled(Typography.Link) <{ active: boolean }>`
    margin-top: 0.2rem;
    span{
        color: ${(props) => props.active ? theme.color.B300 : theme.color.N80}
    }
`

const Img = styled.img<{ active: boolean }>`
    width: 3rem;
    height: 3rem;
    filter: ${(props) => props.active ? theme.svgColor.B300 : theme.svgColor.N80};
`

const Wrapper = styled.div<{ count: number }>`
    position:absolute;
    right: -15px;
    top:${(props) => props.count > 999 ? "-13px" : props.count > 99 ? "-5px" : props.count > 9 ? "" : 0};
`
export default BottomNavigationBar