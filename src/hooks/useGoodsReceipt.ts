import useModalStore from "@components/BasicConfirmModal/modal.store";
import GoodsMiddleware from "@middleware/goods.middleware";
import { isSuccess } from "@utils/options";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useGoodsReceipt = () => {
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const getPreviewReceiptPDF = async (goodsId: string, buyerId: string, sellerSign?: string) => {
        const res = await axios.post(`http://54.180.10.194:5056/pdf/goods/preview`, {
            goodsId: goodsId,
            buyerId: buyerId,
            sellerSign: sellerSign ? sellerSign : null
        }, {
            responseType: 'blob',
            transformResponse: [function (data) {
                let blob = new window.Blob([data], { type: 'application/pdf' })
                return window.URL.createObjectURL(blob)
            }]
        })
        return res;
    }

    const getPreviewReceiptPDFFormGoodsPurchaseDetails = async (goodsPurchaseDetailsId: string, buyerSign?: string) => {
        const res = await axios.post(`http://54.180.10.194:5056/pdf/goodspurchaseDetails/preview`, {
            goodsPurchaseDetailsId: goodsPurchaseDetailsId,
            buyerSign: buyerSign
        }, {
            responseType: 'blob',
            transformResponse: [function (data) {
                let blob = new window.Blob([data], { type: 'application/pdf' })
                return window.URL.createObjectURL(blob)
            }]
        })
        return res;
    }

    const deleteSign = async (goodsPurchaseDetailsId: string) => {
        const res = await axios.delete(`http://3.39.24.118:4094/goods-purchase-details/signature-offer/${goodsPurchaseDetailsId}`)
        if (res.status === 200) return true;
        if (res.status === 400) return res.data.message;

        return res.data.message;
    }

    return { getPreviewReceiptPDF, getPreviewReceiptPDFFormGoodsPurchaseDetails, deleteSign }
}

export default useGoodsReceipt;