import ImageEntity from "./image.entity"

type ChatGoodsResDTO = {
	id: string
	authorId: string
	title: string
	imageUrls: ImageEntity[]
	price: number
	goodsStateCode: string
	purchasingState: string | null
}

export default ChatGoodsResDTO