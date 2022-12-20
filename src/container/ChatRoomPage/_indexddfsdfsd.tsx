import ChatInput from '@components/ChatInput'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import HeaderNavigation from './HeaderNavigation'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import WithNoGuttersTopAndBottomLayout from '@components/Layout/WithNoGuttersTopAndBottomLayout'
import DownToUpPageTransition from '@components/animation/DownToUpPageTransition'
import { messageSocket } from '@service/socket'
import { isSuccess } from '@utils/options'
import axios from 'axios'
import useGetObjectSliceValueWithNumericKey from '@hooks/useGetUnReadMessageIdList'
import MessageListDTO from '@dto/message-list.dto'
import MessageDTO from '@dto/message.dto'
import { useGetUser } from '@context/AuthContext'
import RoomDTO from '@dto/room.dto'
import DefaultMessageCard from '@components/ChatMessageCard/DefaultMessageCard'
import { ChatMessageTypeCode, GoodsSateCode } from '@utils/common-status-code'
import MessageTypeOfDoneCard from '@components/ChatMessageCard/MessageType/Done'
import MessageTypeOfInProgressCard from '@components/ChatMessageCard/MessageType/InProgress'
import MessageTypeGoodsCard from '@components/ChatMessageCard/MessageType/Goods'
import useChatRoom from '@store/chatRoom'
import { theme } from '@styles/theme'
import ScrollUpAndDownBoxNewReceipt from './ScrollUpAndDownBoxNewReceipt'
import ChatMiddleware from '@middleware/chat.middleware'
import { useInfiniteQuery } from 'react-query'

type LocationState = {
    text: string,
    type: string
}

const ChatRoomPage = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const state = location.state as LocationState;
    const { user } = useGetUser();
    const { chatRoomList } = useChatRoom();
    const [chatRoom, setChatRoom] = useState<RoomDTO>();
    const [socketMessageList, setSocketMessageList] = useState<MessageListDTO>({});
    const [isFocus, setIsFocus] = useState<boolean>(true);
    const ChatContainer = useRef<any>(null);
    const target = useRef<any>(null);
    const footer = useRef<any>(null);

    const onFocus = () => setIsFocus(true)
    const onBlur = () => setIsFocus(false)

    const navigate = useNavigate();

    const messagesAddedByPagenation = (messages: MessageDTO[]) => {
        messages.map((message, key) => {
            setSocketMessageList((pre) => { return { ...pre, [message.id]: message } })
        })
    }

    const addMessage = (message: MessageDTO) => {
        setSocketMessageList((pre) => { return { ...pre, [message.id]: message } })
    }

    const updateMessage = (message: MessageDTO) => {
        setSocketMessageList((pre) => { return { ...pre, [message.id]: message } })
    }

    let OFFSET = 0
    const chatMiddleware = new ChatMiddleware();

    const fetchGoodsMessages = async ({ pageParam = OFFSET }) => {
        if (roomId && chatRoom) {
            if (OFFSET === 0) OFFSET == chatRoom.lastMessageId
            const res = await chatMiddleware.getMessage(roomId, 10, chatRoom.lastMessageId);
            if (isSuccess(res)) {
                messagesAddedByPagenation(res.data.items);
                return {
                    data: res.data.items,
                    nextCursor: res.data.nextCursor
                };
            }

            if (target.current) {
                setTimeout(() => { target.current.scrollTop = target.current.scrollHeight }, 0);
            }
        }
    };

    const { data, isLoading, fetchNextPage } = useInfiniteQuery("messageList", fetchGoodsMessages, {
        getNextPageParam: (lastPage) => {
            if (lastPage?.data) {
                return lastPage?.nextCursor;
            }
        }
    });

    useEffect(() => {
        if (chatRoom) {
            const targetSentinel = ChatContainer.current;
            const observer = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
                if (entry.isIntersecting) {
                    fetchNextPage()
                }
            },
                {
                    root: null,
                    threshold: 0,
                });

            observer.observe(targetSentinel);

            // 메모리 해제 작업
            return () => {
                observer && observer.disconnect();
            };
        }
    }, [data, fetchNextPage]);



    useEffect(() => {
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);

        if (state && chatRoom && user) {
            navigate(location.pathname, {});

            const reciverId = chatRoom.user.filter((val) => { if (val.id != user.id) return val });
            messageSocket.emit('chatMessage',
                user.id,
                reciverId[0].id,
                roomId,
                state.text,
                state.type
            )
        }

        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };

    }, [chatRoom, user]);

    useEffect(() => {

        const updateToAllReadMessage = (roomId: string) => {
            const unreadMessageCount = chatRoomList[roomId].unreadMessageCount;
            const unreadMessageIdArray = useGetObjectSliceValueWithNumericKey(socketMessageList, unreadMessageCount);
            messageSocket.emit('convertMessageRead', unreadMessageIdArray, roomId, user?.id)
        }

        if (isFocus && roomId && user) {
            updateToAllReadMessage(roomId)
        }

        messageSocket.on('message', (message: MessageDTO) => {
            if (user) {
                if (message.senderId === user.id) { // 보낸 사람이 나라면
                    addMessage(message)
                } else { // 보낸 사람이 내가 아니라면
                    if (isFocus) {
                        addMessage(message)
                        messageSocket.emit('convertMessageRead', [message.id], roomId, user.id)
                    } else {
                        addMessage(message)
                    }
                }
            }
        })

        messageSocket.on('convertMessageRead', (message: MessageDTO) => {
            updateMessage(message)
        })

        return () => {
            messageSocket.off('message')
            messageSocket.off('convertMessageRead')
        }

    }, [isFocus, chatRoomList])


    useEffect(() => {
        messageSocket.emit('joinChatRoom', roomId, user?.id);

        const getChatRoom = async () => {
            const res = await axios.get(`https://api.gyopoom.kr:38120/chat/rooms/${roomId}`)
            setChatRoom(res.data)
        }

        getChatRoom()

        return () => {
            messageSocket.emit('leaveChatRoom', roomId);
        }

    }, []);

    useEffect(() => {
        if (footer.current) {
            setTimeout(() => { target.current.scrollTop = target.current.scrollHeight }, 0);
        }

    }, [chatRoomList, socketMessageList])

    const [isNewReceipt, setIsNewReceipt] = useState({
        state: false,
        action: () => { }
    })


    const returnMessageCard = (message: MessageDTO) => {
        switch (message.type) {
            case ChatMessageTypeCode.message:
                return <DefaultMessageCard item={message} />
            case ChatMessageTypeCode.purchaseDone:
                return <MessageTypeOfDoneCard item={message} />
            case ChatMessageTypeCode.purchaseInProgress:
                return <MessageTypeOfInProgressCard item={message} />
            case ChatMessageTypeCode.goods:
                return <MessageTypeGoodsCard item={message} />
            default: return <DefaultMessageCard item={message} />
        }
    }

    return (
        roomId && chatRoom ?
            <DownToUpPageTransition>
                <WithNoGuttersTopAndBottomLayout>
                    <HeaderNavigation room={chatRoom} />
                    <Container>
                        {/* {
                            socketMessageList &&
                            Object.entries(socketMessageList).map(([messageId, message]) =>
                            (
                                <div key={messageId} ref={ChatContainer} >
                                    {returnMessageCard(message)}
                                </div>
                            ))
                        } */}
                        {
                            !isLoading && data && data?.pages.map((page: any, key: number) => (
                                page?.data.map((item: any, key: number) => (
                                    <div key={key} ref={ChatContainer}>
                                        {returnMessageCard(item)}
                                    </div>
                                ))
                            ))
                        }
                        {/* <div ref={footer} /> */}
                    </Container>
                    <InputBottom>
                        <ChatInput room={chatRoom} />
                    </InputBottom>
                </WithNoGuttersTopAndBottomLayout>
                {
                    isNewReceipt.state && <ScrollUpAndDownBoxNewReceipt defaultValue={isNewReceipt.state} action={isNewReceipt.action} />
                }

            </DownToUpPageTransition>
            : null
    )
}


const Container = styled.div`
    padding: 1.2rem 1.6rem;
    overflow: scroll;
    height:100%;
    background-color: ${theme.color.B75};
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    } 
`

const InputBottom = styled.div`
    z-index: 99;
    width:100%;
`

export default ChatRoomPage