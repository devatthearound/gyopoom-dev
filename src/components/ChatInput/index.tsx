import Flex from "@components/Flex";
// import { socket, useSocket } from "@context/SocketContext";
import InputElements from "@dto/input.elements";
import { theme } from "@styles/theme";
import { defaultMessage } from "@utils/create-message.input";
import { useRef, useState } from "react";
import styled from "styled-components"
import Input from "./Input"
import PlusIcon from "@images/icons/plus.svg";
import SendIcon from "@images/icons/arrow_forward.svg";
import { Socket } from "socket.io";
import { useGetUser } from "@context/AuthContext";
import RoomDTO from "@dto/room.dto";
import { messageSocket } from "@service/socket";
import { ChatMessageTypeCode } from "@utils/common-status-code";

// 유저 접속시 소켓을 contextAPi로 생성하여 socket.id를 보관한다(OK)
// { socket.id, username, roomId } 를 가지고 채팅 룸에 참여한다.(OK)
// roomId로 메세지를 주고 받을 것이며, 보낼때 해당 룸에 socket.id를 가진 유저가 있는지 점검 한다.(SERVER)
// roomId에 참여한 유저면 메세지를 보낸다(SERVER)
// 메세지를 보낼때 마다 저장하는 api를 쏜다(OK)
// 실시간으로 메세지를 주고 받을 때는 소켓으로 주고 받는다(OK)
// 대신, 첫 채팅방 접속 때만 api로 전체 메세지를 불러온다(OK)


type Props = {
    room: RoomDTO
}

const ChatInput: React.FC<Props> = ({ room }) => {
    const [message, setMessage] = useState<InputElements>(defaultMessage)
    const InputBox = useRef<any>();
    const { user } = useGetUser();

    const sendMessage = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        const reciverId = room.user.filter((val) => { if (val.id != user?.id) return val });
        // Get message text
        const msg = message.value.trim();

        if (!msg) {
            return false;
        }

        messageSocket.emit('chatMessage',
            user?.id,
            reciverId[0].id,
            room.roomId,
            message,
            ChatMessageTypeCode.message
        )

        // Clear input
        setMessage({ ...message, value: '' })
        InputBox.current.focus();
    }

    const onKeyUpEventHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode == 13) {
            sendMessage(e);
        }
    }

    return (
        <Wrapper>
            <Container>
                <Button>
                    {/* <PlusImage src={PlusIcon} alt="더보기 버튼" /> */}
                </Button>
                <InputWrapper>
                    <Input
                        elements={message}
                        onChange={setMessage}
                        ref={InputBox}
                        onKeyUpEvent={onKeyUpEventHandler} />
                </InputWrapper>
                <CircleButton onClick={sendMessage}>
                    <SendImage src={SendIcon} alt="전송 버튼" />
                </CircleButton>
            </Container>
        </Wrapper>
    )
}

const SendImage = styled.img`
    position: absolute;
    left: 50%;
    top: 50%;
    width:1.6rem;
    height: 1.6rem;
    transform: translate(-50%, -50%);
    filter: ${theme.svgColor.N0};
`

const Wrapper = styled.div`
    width: 100%;
    height: 5.6rem;
`

const Container = styled(Flex)`
    padding: 0.8rem 0;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.color.N30};
`
const InputWrapper = styled.div`
    flex: 1;
`
const PlusImage = styled.img`
    width: 1.1rem;
    height: 1.1rem;
    filter: ${theme.svgColor.N60};
`

const Button = styled.button`
    display: flex;
    align-items: center;
    border: 0px;
    background: none;
    /* width: 2.4rem;
    height: 2.4rem; */
    margin: 0 0.5rem;
    cursor: pointer;
`

const CircleButton = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    border: 0px;
    background: none;
    width: 2.4rem;
    height: 2.4rem;
    margin: 0 1rem;
    background-color: ${theme.color.N60};
    border-radius: 100%;
    cursor: pointer;
`

export default ChatInput