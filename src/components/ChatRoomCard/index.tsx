import Flex from "@components/Flex"
import MoreButton from "@components/MoreButton"
import Typography from "@components/Typograpy"
import { useGetUser } from "@context/AuthContext"
import RoomDTO from "@dto/room.dto"
import UnReadMessageNotifiCard from "@components/UnReadMessageNotifiCard"
import { theme } from "@styles/theme"
import userEvent from "@testing-library/user-event"
import { ChatMessageTypeCode } from "@utils/common-status-code"
import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import MoreMenu from "./MoreMenu"

type Props = {
    item: RoomDTO
}

const ChatRoomCard: React.FC<Props> = ({ item }) => {
    const { user } = useGetUser()
    const otherUser = item.user.filter((val) => { if (val.id != user?.id) return val })

    return (
        <Wrapper>
            <Container>
                <ImageBox>
                    <Img src={otherUser[0].profile} alt="사용자 프로필" />
                </ImageBox>
                <Link to={"/my-chat/room/" + item.roomId} style={{ flex: 1, overflow: "hidden" }}>
                    <ContentBox>
                        <Flex style={{ alignItems: "center" }}>
                            <Typography.H75
                                style={{ marginRight: "0.4rem" }}
                                color={theme.color.N900}>
                                {otherUser[0].name}
                            </Typography.H75>
                            <Typography.P50 color={theme.color.N80}>
                                {otherUser[0].area} · {item.lastConversationDate}
                            </Typography.P50>
                        </Flex>
                        <Flex style={{ alignItems: "center" }}>
                            <Typography.H50
                                style={{
                                    marginTop: " 0.8rem",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    flex: 1
                                }}
                                color={theme.color.N900}>
                                {
                                    item.lastMessageType == ChatMessageTypeCode.message ?
                                        item.lastMessage : item.lastMessageType == ChatMessageTypeCode.purchaseDone ?
                                            "거래명세서 작성 완료" : item.lastMessageType == ChatMessageTypeCode.purchaseInProgress ?
                                                "거래명세서 작성 요청" : item.lastMessageType == ChatMessageTypeCode.goods ?
                                                    "게시글을 보냈습니다" : item.lastMessage
                                }
                            </Typography.H50>
                            {
                                item.unreadUserId === user?.id &&
                                <UnReadMessageNotifiCard count={item.unreadMessageCount} />
                            }
                        </Flex>
                    </ContentBox>
                </Link>
                {/* <MoreButton onClick={() => setIsMoreClick(true)} /> */}
            </Container>
            {/* <MoreMenu
                id={item.roomId}
                isMoreClick={isMoreClick}
                setIsMoreClick={setIsMoreClick} /> */}
        </Wrapper>

    )
}

const Wrapper = styled.div`
    background-color: ${theme.color.N0};
`
const Container = styled(Flex)`
    align-items: center;
    justify-content: flex-start;
    padding: 1.3rem 1.7rem;
    border-top: 1px solid ${theme.color.N40};
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

const ContentBox = styled.div`
    margin-left: 1.2rem;
    overflow: hidden;
    display: block;
    position:relative;
`

export default ChatRoomCard