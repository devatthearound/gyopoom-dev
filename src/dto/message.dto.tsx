type MessageDTO = {
    id: string
    roomId: string,
    reciverId: string
    senderId: string
    text: string
    createAt: string
    updateAt: string
    isRead: boolean
    type: string
}

export type TextMessageType = {
    text: string
}

export type receiptMessageType = {
    otherUserId: string
    sellerName: string
    sellerPharmacyName: string
    buyerName: string
    buyerPharmacyName: string
    goodsTitle: string
    idForButton: string
}

export type UrlMessageType = {
    url: string
}

export default MessageDTO