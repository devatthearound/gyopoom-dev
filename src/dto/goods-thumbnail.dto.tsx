import ImageEntity from "./image.entity"

type GoodsThumbnailDTO = {
	id: string
	area: string
	title: string
	imageUrls: ImageEntity[]
	price: number
	isNegotiation: boolean
	goodsStateCode: string
	updateAt: string
}


export default GoodsThumbnailDTO