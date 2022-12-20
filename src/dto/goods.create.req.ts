import ImageCreateREQ from "./image.create.req"
import MedicationInfoEntity from "./medication.entity"

interface CreateGoodsDTO extends MedicationInfoEntity {
    title: string
    price: number
    content: string
    imageUrls: ImageCreateREQ[]
    isNegotiation: boolean
    exchangeGoods: string
    deliveryMethod: string,
    goodsStateCode: string

    // 11.28 new field
    quantity: number
}

export default CreateGoodsDTO