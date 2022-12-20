import ChatInput from '@components/ChatInput'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import HeaderNavigation from './HeaderNavigation'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import WithNoGuttersTopAndBottomLayout from '@components/Layout/WithNoGuttersTopAndBottomLayout'
import DownToUpPageTransition from '@components/animation/DownToUpPageTransition'
import { messageSocket } from '@service/socket'
import { errorRes, isSuccess } from '@utils/options'
import axios from 'axios'
import useGetObjectSliceValueWithNumericKey from '@hooks/useGetUnReadMessageIdList'
import MessageListDTO from '@dto/message-list.dto'
import MessageDTO from '@dto/message.dto'
import { useGetUser } from '@context/AuthContext'
import RoomDTO from '@dto/room.dto'
import DefaultMessageCard from '@components/ChatMessageCard/DefaultMessageCard'
import useGetErrorMessage from '@hooks/useGetErrorMessage'
import { ChatMessageTypeCode, GoodsSateCode } from '@utils/common-status-code'
import MessageTypeOfDoneCard from '@components/ChatMessageCard/MessageType/Done'
import MessageTypeOfInProgressCard from '@components/ChatMessageCard/MessageType/InProgress'
import MessageTypeGoodsCard from '@components/ChatMessageCard/MessageType/Goods'
import useChatRoom from '@store/chatRoom'
import { theme } from '@styles/theme'
import ScrollUpAndDownBoxNewReceipt from './ScrollUpAndDownBoxNewReceipt'
import Typography from '@components/Typograpy'
import GoodsCard from './Goods'

type LocationState = {
    text: string,
    type: string
}

const ChatRoomPage = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const goodsId = roomId?.split("_")[0];
    const state = location.state as LocationState;
    const { user } = useGetUser();
    const { chatRoomList } = useChatRoom();
    const [chatRoom, setChatRoom] = useState<RoomDTO>();
    const [socketMessageList, setSocketMessageList] = useState<MessageListDTO>({});
    const [isFocus, setIsFocus] = useState<boolean>(true);
    const ChatContainer = useRef<any>(null);
    const target = useRef<any>(null);
    const footer = useRef<any>(null);
    // pagination value
    const [key, setKey] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [noMore, setNoMore] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(0);

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

    const getFirstData = async () => {
        if (roomId && chatRoom) {
            const res = await axios.get(`http://54.180.10.194:38120/chat/rooms/${roomId}/messages/pagination?limit=30&cursor=${chatRoom.lastMessageId}`)
            try {
                setLoading(true);
                messagesAddedByPagenation(res.data.items);
                setKey(res.data.nextCursor);
            } catch (err: unknown) {
                return errorRes(useGetErrorMessage(err));
            }

            if (target.current) {
                setTimeout(() => { target.current.scrollTop = target.current.scrollHeight }, 0);
            }
            setLoading(false)
        }
    };

    const loadMore = useCallback(async (loadCount: number) => {
        setLoading(true)
        if (roomId && key && key > 0) {
            const res = await axios.get(`http://54.180.10.194:38120/chat/rooms/${roomId}/messages/pagination?limit=${loadCount}&cursor=${key}`)
            try {
                if (res.data.items.length < 0) {
                    setNoMore(true)
                } else {
                    setKey(res.data.nextCursor)
                    messagesAddedByPagenation(res.data.items);
                    if (target.current) {
                        target.current.scrollTop = target.current.scrollHeight - scrollHeight
                    }
                }
            } catch (err: unknown) {
                return errorRes(useGetErrorMessage(err));
            }

            setNoMore(true)
        }
        setLoading(false)
    }, [key])

    const onIntersect = useCallback(
        async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            // 만약에 지정한 요소가 화면에 보이거나 현재 데이터를 더 불러오는 상황이 아닐경우,
            // 기존 요소의 주시를 해체하고 추가로 3개의 문서를 더 불러오도록 설정
            setScrollHeight(target.current.scrollHeight)
            if (entry.isIntersecting && !loadingMore) {
                setLoadingMore(true);
                await loadMore(15);
                setLoadingMore(false);
            }
        },
        [loadMore]
    );

    useEffect(() => {
        if (chatRoom) {
            const rootSentinel = target.current;
            const targetSentinel = ChatContainer.current;

            const observer = new IntersectionObserver(onIntersect, {
                root: rootSentinel,
                threshold: 0,
            });

            observer.observe(targetSentinel);

            // 메모리 해제 작업
            return () => {
                setLoading(false);
                setLoadingMore(false);
                observer.unobserve(targetSentinel);
            };
        }
    }, [onIntersect, noMore]);


    useEffect(() => {
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);

        getFirstData();

        if (state && chatRoom && user) {
            navigate(location.pathname, {});
            console.log(state.text)

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
            const res = await axios.get(`http://54.180.10.194:38120/chat/rooms/${roomId}`)
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
                    {
                        goodsId && <GoodsCard goodsId={goodsId} senderId={chatRoom.user[0].id === user?.id ? chatRoom.user[1].id : chatRoom.user[0].id} />
                    }
                    <Container ref={target}>
                        <div ref={ChatContainer} />
                        {
                            socketMessageList &&
                            Object.entries(socketMessageList).map(([messageId, message], key, array) => {
                                {
                                    if (key > 0) {
                                        if (message.createAt.split(" ")[0] != array[key - 1][1].createAt.split(" ")[0]) {
                                            return (
                                                <div>
                                                    <Date>
                                                        <Typography.P100 color={theme.color.N0}>{message.createAt.split(" ")[0]}</Typography.P100>
                                                    </Date>
                                                    <div key={messageId}>
                                                        {returnMessageCard(message)}
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={messageId}>
                                                    {returnMessageCard(message)}
                                                </div>
                                            )
                                        }
                                    } else {
                                        return (
                                            <div>
                                                <Date>
                                                    <Typography.P100 color={theme.color.N0}>{message.createAt.split(" ")[0]}</Typography.P100>
                                                </Date>
                                                <div key={messageId}>
                                                    {returnMessageCard(message)}
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                            })
                        }
                        <div ref={footer} />
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

const Date = styled.div`
    margin :1.5rem auto;
    width: fit-content;
    background: rgba(9, 30, 66, 0.08);
    padding: 0.1rem 0.9rem;
    border-radius: 5rem;
`
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