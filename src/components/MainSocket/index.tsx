import { mainSocket } from "@service/socket";
import RoomDTO from "@dto/room.dto";
import useChatRoom from "@store/chatRoom";

const MainSocket = (props: { children: React.ReactNode }) => {
    const { setChatRoomList } = useChatRoom();

    mainSocket.on('updateChatRoom', (room: RoomDTO) => {
        setChatRoomList(room)
    })


    return (
        <>
            {
                props.children
            }
        </>
    );
}

export default MainSocket