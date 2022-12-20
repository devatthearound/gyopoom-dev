import ReceiptEntity from "./receipt.entity"

interface ReceiptCreateDTO extends ReceiptEntity {
    goodsId: string
    buyerId: string
    buyerSignature: string
    sellerSignature: string
}
export default ReceiptCreateDTO