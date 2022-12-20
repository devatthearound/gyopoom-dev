import MedicationEntity from "./medication.entity"

interface GoodsMedicationResDTO extends MedicationEntity {
    goodsId: string
    userId: string // 작성자 ID
    quantity: number
    price: number
}

export default GoodsMedicationResDTO