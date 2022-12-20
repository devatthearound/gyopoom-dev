type RoomDTO = {
    roomId: string,
    user: [{
        id: string,
        profile: string,
        name: string,
        area: string
    }, {
        id: string,
        profile: string,
        name: string,
        area: string
    },
    ],
    lastMessageId: number,
    lastMessage: string,
    lastMessageType: string,
    lastConversationDate: string,
    unreadMessageCount: number,
    unreadUserId: string
}

export default RoomDTO