import GoodsThumbnailDTO from "./goods-thumbnail.dto"

type GoodsTHumbnailListRES = {
	items: GoodsThumbnailDTO[],
	nextCursor: number
}

export default GoodsTHumbnailListRES