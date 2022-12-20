import Flex from "@components/Flex"
import Typography from "@components/Typograpy"
import { useGetUser } from "@context/AuthContext"
import ChatUserDTO from "@dto/chat-user.res"
import { theme } from "@styles/theme"
import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Moment from "react-moment";

type Props = {
    item: ChatUserDTO,
    onClick: (id: string) => void
}

const ChatUserCard: React.FC<Props> = ({ item, onClick }) => {
    const [isMoreClick, setIsMoreClick] = useState<boolean>(false);

    return (
        <Wrapper>
            <Container>
                <ImageBox>
                    <Img src={item.profile} alt="사용자 프로필" />
                </ImageBox>
                <ContentBox onClick={() => onClick(item.id)} style={{ flex: 1 }}>
                    <Flex style={{ alignItems: "center" }}>
                        <Typography.H50B
                            style={{ marginRight: "0.4rem" }}
                            color={theme.color.N900}>
                            {item.name}
                        </Typography.H50B>
                        <Typography.P100 color={theme.color.N200}>
                            {item.area}
                        </Typography.P100>
                    </Flex>
                    <Typography.P100
                        color={theme.color.N70}>
                        <span>마지막 대화 </span>
                        <Moment fromNow ago>{item.lastChatTime}</Moment>
                        <span> 전</span>
                    </Typography.P100>
                </ContentBox>
            </Container>
        </Wrapper>

    )
}

const Wrapper = styled.div`
    background-color: ${theme.color.N10};
`
const Container = styled(Flex)`
    align-items: center;
    justify-content: flex-start;
    padding: 1.3rem 1.7rem;
    border-top: 1px solid ${theme.color.N30};
    position: relative;
`
const Img = styled.img`
    border-radius: 100%;
    width: 4.8rem;
    height: 4.8rem;
    object-fit: cover;
`
const ImageBox = styled.div`
    width: 4.8rem;
    height: 4.8rem;
`

const ContentBox = styled.button`
    margin-left: 1.2rem;
    overflow: hidden;
    display: block;
    position:relative;
    border: 0px;
    background-color: ${theme.color.N10};
    cursor: pointer;
    text-align: left;
`

export default ChatUserCard