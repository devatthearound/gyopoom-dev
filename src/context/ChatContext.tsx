import { createContext, useContext, useEffect, useMemo, useState } from "react";
import RoomDTO from "@dto/room.dto";
import { useGetUser } from "./AuthContext";
import ChatMiddleware from "@middleware/chat.middleware";
import ChatRoomListDTO from "@dto/room-list.dto";
import { mainSocket } from "@service/socket";
import { isSuccess } from "@utils/options";
import useChatRoom from "@store/chatRoom";

const ChatProvider = (props: { children: React.ReactNode }) => {
    const { user } = useGetUser();
    const chatMiddleware = new ChatMiddleware();
    const { chatRoomList, setTotalUnReadMessage, setChatRoomList } = useChatRoom();

    const initialChatRoomList = (rooms: RoomDTO[]) => {
        rooms.map((room, key) => {
            setChatRoomList(room)
        })
    }

    useEffect(() => {
        let totalCount = 0;

        Object.entries(chatRoomList).map(([roomId, room]) => {
            if (room.unreadUserId == user?.id) totalCount += room.unreadMessageCount
        })

        console.log(totalCount)

        setTotalUnReadMessage(totalCount)

    }, [chatRoomList])

    useEffect(() => {
        const getRooms = async () => {
            const res = await chatMiddleware.getRooms()
            if (isSuccess(res)) initialChatRoomList(res.data)
        }

        if (user) {
            mainSocket.emit('joinMainNameSpace', (user.id))
            getRooms()
        }

    }, [user])

    return (
        <>{props.children}</>
    )
};

export default ChatProvider;