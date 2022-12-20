export type GoodsOfReceiptDTO = {
    id: string
    userGoodsReceiptsId: string
    imageUrls: [{ order: number, file: string }]
    area: string
    updateAt: string,
    title: string,
    price: number
    isNegotiation: boolean
    goodsStateCode: string
    paymentCode: string
    postStateCode: string
}

type GoodsListOfReceiptDTO = {
    items: GoodsOfReceiptDTO[]
    nextCursor: number
}


export default GoodsListOfReceiptDTO