import ChatUserDTO from "@dto/chat-user.res";
import CreateRoomDTO from "@dto/create-room.dto";
import MessageResDTO from "@dto/message.res";
import RoomDTO from "@dto/room.dto";
import useGetErrorMessage from "@hooks/useGetErrorMessage";
import { errorRes, Option, successRes } from "@utils/options";
import axios from "axios";

export default class ChatMiddleware {
    constructor(
    ) { }

    async createRooms(body: CreateRoomDTO): Promise<Option<RoomDTO>> {
        try {
            const res = await axios.post("https://api.gyopoom.kr:38120/chat/rooms", {
                secondUser: body.secondUser,
                goodsId: body.goodsId
            })
            if (res.status == 201 || res.status == 200) return successRes(res);

            return errorRes("채팅방 생성에 실패했습니다");
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async getRooms(): Promise<Option<RoomDTO[]>> {
        try {
            const res = await axios.get(`https://api.gyopoom.kr:38120/chat/rooms/current`)
            return successRes(res);
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async getMessage(roomId: string, limit: number, cursor: number): Promise<Option<MessageResDTO>> {
        try {
            const res = await axios.get(`https://api.gyopoom.kr:38120/chat/rooms/${roomId}/messages/pagination?limit=${limit}&cursor=${cursor}`)
            return successRes(res);
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async delete(id: string): Promise<Option<RoomDTO[]>> {
        try {
            const res = await axios.delete(`https://api.gyopoom.kr:38120/chat/rooms/${id}`)
            return successRes(res);
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async getCurrentRoom(limit: number): Promise<Option<ChatUserDTO[]>> {
        try {
            const res = await axios.get(`https://api.gyopoom.kr:38120/chat/rooms/pagination?limit=5`)
            return successRes(res);
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }
}
