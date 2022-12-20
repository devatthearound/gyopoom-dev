import axios from 'axios';
import { errorRes, Option, successRes } from "@utils/options";
import CreateReceiptDTO from "@dto/_receipt-create.body";
import useGetErrorMessage from "@hooks/useGetErrorMessage";
import ReciptListDTO from '@dto/receipt-list.res';
import ReciptThumnailDTO from '@dto/receipt-thumnail.res';
import ReceiptMessageFormatRes from '@dto/receipt-message-format.res';
import GoodsListOfReceiptDTO from '@dto/receipt-goods-list.res';
import UserGoodsReceiptRes from '@dto/user-goods-receipt.res';

export default class UserGoodsReceiptMiddleware {
    async create(body: CreateReceiptDTO, id: string): Promise<Option<ReceiptMessageFormatRes>> {
        try {
            const res = await axios.post(`http://54.180.10.194:5056/pdf/${id}`, body)

            return successRes(res)

        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async getOne(id: string): Promise<Option<UserGoodsReceiptRes>> {
        try {
            const res = await axios.get(`http://54.180.10.194:5056/user-goods-receipts/${id}`)
            if (res.status == 204) return errorRes("삭제된 거래명세서 입니다");
            return successRes(res)

        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async getReceiptList(state: string, limit: number, cursor: number): Promise<Option<ReciptListDTO>> {
        try {
            const res = await axios.get(`http://54.180.10.194:5056/goods-receipts/filter?state=${state}&limit=${limit}&cursor=${cursor}`)

            return successRes(res)
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async getGoodsList(limit: number, cursor: number): Promise<Option<GoodsListOfReceiptDTO>> {
        try {
            const res = await axios.get(`http://54.180.10.194:4097/goods/purchase/pagination?limit=${limit}&cursor=${cursor}`)

            return successRes(res)
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }


    async updateReceiptTitle(id: string, title: string): Promise<Option<{ id: string }>> {
        try {
            console.log(title)
            const res = await axios.patch(`http://54.180.10.194:5056/goods-receipts/${id}`, {
                title: title
            })

            return successRes(res)

        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async delete(id: string): Promise<Option<{ id: string }>> {
        try {
            const res = await axios.delete(`http://54.180.10.194:5056/goods-receipts/${id}`)

            return successRes(res)
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }
}