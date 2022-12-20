import ReceiptEntity from "./receipt.entity"

interface GoodsPurchaseDetailsCreateDTO extends ReceiptEntity {
    goodsId: string,
    userId: string
    sellerSignature: string
}

export default GoodsPurchaseDetailsCreateDTO