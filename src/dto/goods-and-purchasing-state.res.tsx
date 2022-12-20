import GoodsThumbnailDTO from "./goods-thumbnail.dto"

interface GoodsAndPurchasingStateDTO extends GoodsThumbnailDTO {
	purchasingState: string
	goodsPurchaseDetailsId?: string
}


export type GoodsAndPurchasingStateResDTO = {
	items: GoodsAndPurchasingStateDTO[]
	cursor: number
}

export default GoodsAndPurchasingStateDTO