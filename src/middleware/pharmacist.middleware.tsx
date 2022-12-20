import { errorRes, Option, successRes } from "@utils/options";
import axios from "axios";
import PharmacySearchResDTO from "@dto/pharmacy-search.res.dto";
import UsersPharmacistLicenseResDTO from "@dto/users-pharmacist-license.res";
export default class PharmacistMiddleware {

    async getPharmacistNumber(): Promise<Option<UsersPharmacistLicenseResDTO>> {
        try {
            const res = await axios.get("https://api.gyopoom.kr:4096/users-pharmacist-license");
            if (res.data) {
                return successRes(res)
            } else {
                return errorRes("약사 번호가 인증되지 않았습니다")
            }
        } catch (err: unknown) {
            // const message = useGetErrorMessage(err);
            return errorRes("올바른 사업자번호를 입력해주세요.");
        }
    }
}