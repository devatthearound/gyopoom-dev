import ChatRoomListDTO from "@dto/room-list.dto";
import RoomDTO from "@dto/room.dto";
import create from "zustand"


type Props = {
    chatRoomList: ChatRoomListDTO,
    setChatRoomList: (room: RoomDTO) => void,
    totalUnreadMessage: number,
    setTotalUnReadMessage: (count: number) => void,
}

const useChatRoom = create<Props>((set) => ({
    chatRoomList: {},
    setChatRoomList: (room: RoomDTO) => {
        set((state) => ({
            chatRoomList: { ...state.chatRoomList, [room.roomId]: room }
        }));
    },
    totalUnreadMessage: 0,
    setTotalUnReadMessage: (count: number) => {
        set((state) => ({ totalUnreadMessage: count }))
    }
}));

export default useChatRoom