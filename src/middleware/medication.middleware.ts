import { errorRes, Option, successRes } from "@utils/options";
import axios from "axios";
import MedicationEntity from "@dto/medication.entity";

export default class MedicationMiddleware {
    async getList(keyward: string): Promise<Option<MedicationEntity[]>> {
        try {
            console.log(keyward)
            const res = await axios.get(`http://3.39.52.201:5999?keyword=${keyward}`);
            if (res.data) {
                return successRes(res)
            } else {
                return errorRes("오류 발생")
            }
        } catch (err: unknown) {
            // const message = useGetErrorMessage(err);

            return errorRes("오류 발생");
        }
    }
}