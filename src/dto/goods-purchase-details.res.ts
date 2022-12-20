import MedicationThumbnailEntity from "./medication-thumbnail.entity ";

interface GoodsPurchaseDetailsResDTO extends MedicationThumbnailEntity {
    title: string;
    goodsPurchaseDetailsId: string;
    buyerUserId: string
    sellerUserId: string
    purchasingState: string
    state: string
}

export default GoodsPurchaseDetailsResDTO