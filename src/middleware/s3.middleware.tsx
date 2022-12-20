
import { errorRes, Option, successRes } from "@utils/options";
import useGetErrorMessage from "@hooks/useGetErrorMessage";
import axios from "axios";

export default class S3Middleware {
    async createGoodsImage(file: File): Promise<Option<{ imageUrl: string }>> {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('https://api.gyopoom.kr:5057/s3/goods', formData);
            return successRes(res);
        } catch (err: unknown) {
            const message = useGetErrorMessage(err);

            return errorRes(message);
        }
    }

    async createProfileImage(file: File): Promise<Option<{ imageUrl: string }>> {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('https://api.gyopoom.kr:5057/s3/profile', formData);
            return successRes(res)
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }


    async createSignatureImage(file: any): Promise<Option<{ imageUrl: string }>> {
        const formData = new FormData();
        formData.append('file', file, "signature.png");

        try {
            const res = await axios.post('https://api.gyopoom.kr:5057/s3/signature', formData);
            return successRes(res)
        } catch (err: unknown) {
            return errorRes(useGetErrorMessage(err));
        }
    }
}