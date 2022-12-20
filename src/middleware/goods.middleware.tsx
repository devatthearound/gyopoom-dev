import CreateGoodsDTO from "../dto/goods.create.req";
import UpdateProductDto from "../dto/goods-update.body";
import axios from 'axios';
import { errorRes, isSuccess, Option, successRes } from "@utils/options";
import GoodsEntity from "@dto/goods.entity";
import useGetErrorMessage from "@hooks/useGetErrorMessage";
import { GoodsSateCode } from "@utils/common-status-code";
import S3Middleware from "./s3.middleware";
import GoodsMedicationResDTO from "@dto/goods-medication.res";
import GoodsAndPurchasingStateDTO from "@dto/goods-and-purchasing-state.res";
import ChatGoodsResDTO from "@dto/chat-goods.res";
import GoodsTHumbnailListRES from "@dto/goods-thumbnail-list.res";
import GoodsThumbnailDTO from "@dto/goods-thumbnail.dto";

export default class GoodsMiddleware {
    constructor(
        private readonly s3Middleware = new S3Middleware()
    ) { }
    async create(body: CreateGoodsDTO): Promise<Option<string>> {
        try {
            const imgRes = await this.s3Middleware.createGoodsImage(body.imageUrls[0].file)

            if (isSuccess(imgRes)) {
                const res = await axios.post('https://api.gyopoom.kr:4097/goods',
                    {
                        ...body,
                        imageUrls: [{
                            order: body.imageUrls[0].order,
                            file: imgRes.data.imageUrl
                        }]
                    });
                return successRes(res)
            } else {
                return errorRes(useGetErrorMessage("이미지 업로드에 실패하였습니다"));
            }
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async getThumbnailList(limit: number, cursor: number): Promise<Option<GoodsTHumbnailListRES>> {
        try {
            const res = await axios.get(`https://api.gyopoom.kr:4097/goods/pagination?limit=${limit}&cursor=${cursor}`)
            return successRes(res);
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async updateGoods(id: string, body: UpdateProductDto): Promise<Option<string>> {
        try {
            if (body.imageUrls) {
                if (typeof body.imageUrls[0].file != "string") {
                    const imgRes = await this.s3Middleware.createGoodsImage(body.imageUrls[0].file);
                    if (isSuccess(imgRes)) {
                        const res = await axios.patch(`https://api.gyopoom.kr:4097/goods/${id}`,
                            {
                                ...body,
                                imageUrls: [{
                                    order: body.imageUrls[0].order,
                                    file: imgRes.data.imageUrl
                                }]
                            })
                        return successRes(res)
                    } else {
                        return errorRes(useGetErrorMessage("이미지 업로드에 실패하였습니다"));
                    }
                } else {
                    const res = await axios.patch(`https://api.gyopoom.kr:4097/goods/${id}`,
                        {
                            ...body
                        })
                    return successRes(res)
                }

            }

            const res = await axios.patch(`https://api.gyopoom.kr:4097/goods/${id}`, body)
            return successRes(res)


        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async deleteGoods(id: string): Promise<Option<{ id: string }>> {
        try {
            const res = await axios.delete(`https://api.gyopoom.kr:4097/goods/${id}`)
            if (res.status == 204) {
                return successRes(res);
            }
            return errorRes("삭제 요청이 실패했습니다.");
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }

    }


    async getGoodsById(id: string): Promise<Option<GoodsEntity>> {
        try {
            const res = await axios.get(`https://api.gyopoom.kr:4097/goods/${id}`);
            if (res.status == 404) {
                return errorRes("삭제된 게시물입니다.");
            }
            return successRes(res);
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async getChatGoodsById(id: string): Promise<Option<ChatGoodsResDTO>> {
        try {
            const res = await axios.get(`https://api.gyopoom.kr:4097/goods/part/${id}`);
            if (res.status == 404) {
                return errorRes("삭제된 게시물입니다.");
            }
            return successRes(res);
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }


    async getMyGoodsOnReservationAndSale(): Promise<Option<GoodsAndPurchasingStateDTO[]>> {
        try {

            const res = await axios.get(`https://api.gyopoom.kr:4097/goods/current?goods-state-code=${GoodsSateCode.RESERVATION}&goods-state-code=${GoodsSateCode.SALE}`)
            return successRes(res)
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async getMyGoodsOnHidden(): Promise<Option<GoodsAndPurchasingStateDTO[]>> {
        try {
            const res = await axios.get(`https://api.gyopoom.kr:4097/goods/current?goods-state-code=${GoodsSateCode.SUSPEND}`)
            return successRes(res)
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async getMyGoodsOnSoldOut(): Promise<Option<GoodsAndPurchasingStateDTO[]>> {
        try {
            const res = await axios.get(`https://api.gyopoom.kr:4097/goods/current?goods-state-code=${GoodsSateCode.SOLDOUT}`)
            return successRes(res)
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async changeGoodsState(id: string, state: string): Promise<Option<{ id: string }>> {
        const res = await axios.patch(`https://api.gyopoom.kr:4097/goods/${id}`, {
            goodsStateCode: state
        })
        return successRes(res)
    }

    async getSearchGoods(keyword: string): Promise<Option<GoodsThumbnailDTO[]>> {
        const res = await axios.get(`https://api.gyopoom.kr:4097/goods/search?query=${keyword}`)
        return successRes(res)
    }

    async getGoodsMedicine(goodsId: string): Promise<Option<GoodsMedicationResDTO>> {
        try {
            const res = await axios.get(`https://api.gyopoom.kr:4097/goods/medicine/${goodsId}`);
            console.log(res)
            return successRes(res);

        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }

    async deleteBuyGoods(id: string): Promise<Option<GoodsEntity>> {
        return await axios.delete(`https://api.gyopoom.kr:4094/goods-purchase-details/${id}`)
    }
}