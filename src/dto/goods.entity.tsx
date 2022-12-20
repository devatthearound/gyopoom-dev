import MedicationEntity from "./medication.entity"

interface GoodsEntity extends MedicationEntity {
	id: string,
	author: {
		id: string,
		name: string,
		profileUrl: string
		phoneNumber: string
		area: string
	},
	imageUrls: [
		{
			order: number,
			file: string
		}],
	title: string,
	updateAt: string,
	price: number
	quantity: number
	deliveryMethod: string
	exchangeGoods: string
	content: string
	isNegotiation: boolean
	goodsPurchaseDetailsId?: string,
	purchasingState: string,
	goodsStateCode: string
	postStateCode: string
}

export default GoodsEntity