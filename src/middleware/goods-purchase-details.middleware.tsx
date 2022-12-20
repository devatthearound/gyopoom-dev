import axios, { AxiosError } from 'axios';
import { errorRes, Option, successRes } from "@utils/options";
import useGetErrorMessage from "@hooks/useGetErrorMessage";
import GoodsPurchaseDetailsCreateDTO from '@dto/goods-purchase-details-create.dto';
import GoodsPurchaseDetailsUpdateDTO from '@dto/goods-purchase-details-update.dto';
import GoodsPurchaseDetailsResDTO from '@dto/goods-purchase-details.res';
import ReceiptMessageFormatRes from '@dto/receipt-message-format.res';

export default class GoodsPurchaseDetailsMiddleware {
    async getUserReceiptId(id: string): Promise<Option<{ userGoodsReceiptsId: string }>> {
        try {
            const res = await axios.get(`http://54.180.10.194:5056/user-goods-receipts/user-goods-receipts-id/${id}`)
            return successRes(res)

        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }
    async create(body: GoodsPurchaseDetailsCreateDTO): Promise<Option<ReceiptMessageFormatRes>> {
        try {
            const res = await axios.post("http://54.180.10.194:4094/goods-purchase-details", body)
            return successRes(res)

        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async sendSignatureOffer(body: GoodsPurchaseDetailsUpdateDTO, id: string): Promise<Option<ReceiptMessageFormatRes>> {
        try {
            const res = await axios.patch(`http://54.180.10.194:4094/goods-purchase-details/${id}`, body)
            return successRes(res)
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }
}