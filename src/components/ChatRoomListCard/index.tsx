import ChatRoomListDTO from "@dto/room-list.dto"
import ChatRoomCard from "@components/ChatRoomCard"
import { theme } from "@styles/theme"
import styled from "styled-components"

type Props = {
    rooms: ChatRoomListDTO
}

const ChatRoomListCard: React.FC<Props> = ({ rooms }) => {
    return (
        <Wrapper>
            {
                Object.entries(rooms).map(([key, value]) =>
                (
                    <div key={key}>
                        <ChatRoomCard item={value} />
                    </div>
                ))
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height:100%;
    background-color: ${theme.color.N20};
    overflow: scroll;
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`

export default ChatRoomListCard