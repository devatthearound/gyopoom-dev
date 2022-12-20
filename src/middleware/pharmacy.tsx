import { errorRes, Option, successRes } from "@utils/options";
import useGetErrorMessage from "@hooks/useGetErrorMessage";
import axios from "axios";
import PharmacySearchResDTO from "@dto/pharmacy-search.res.dto";
import PharmacyDTO from "@dto/pharmacy.dto";
import EnrollPharmacyDTO from "@dto/enroll-pharmacy.dto";
import EnrollPharmacyCreateDTO from "@dto/enroll-pharmacy-create.body.dto";
import PharmacyCreateDTO from "@dto/pharmacy-create.dto";
import PharmacyUpdateDTO from "@dto/pharmacy-update.dto";
import EnrollPharmacyUpdateDTO from "@dto/enroll-pharmacy-update.body.dto";
import EnrollPharmacyCurrentDTO from "@dto/enroll-pharmacy-current.dto";

export default class PharmacyMiddleware {
    async getPharmacyId(businessNumber: string): Promise<Option<PharmacySearchResDTO>> {
        try {
            const res = await axios.get(`https://api.gyopoom.kr:4096/pharmacies/business-number/${businessNumber}`);
            if (res.data) {
                return successRes(res)
            } else {
                return errorRes("등록되어 있지않은 사업자번호입니다.")
            }
        } catch (err: unknown) {
            // const message = useGetErrorMessage(err);

            return errorRes("올바른 사업자번호를 입력해주세요.");
        }
    }

    async createEnrollPharmacy(body: EnrollPharmacyCreateDTO): Promise<Option<PharmacySearchResDTO>> {
        try {
            const res = await axios.post("https://api.gyopoom.kr:4096/pharmacies/enroll", body);
            if (res.status === 201) return successRes(res)

            return errorRes("새로고침을 해주세요.");
        } catch (err: unknown) {
            const message = useGetErrorMessage(err);

            return errorRes("새로고침을 해주세요.");
        }
    }


    async updateEnrollPharmacy(body: EnrollPharmacyUpdateDTO): Promise<Option<PharmacySearchResDTO>> {
        try {
            const res = await axios.patch("https://api.gyopoom.kr:4096/pharmacies/enroll", body);
            if (res.status === 200) return successRes(res)
            if (res.status === 403) return errorRes("관리자만 수락이 가능합니다.");

            return errorRes("새로고침을 해주세요");
        } catch (err: unknown) {
            return errorRes("새로고침을 해주세요");
        }
    }

    async createPharmacy(body: PharmacyCreateDTO): Promise<Option<PharmacySearchResDTO>> {
        try {
            const res = await axios.post("https://api.gyopoom.kr:4096/pharmacies", body);
            if (res.status === 201) return successRes(res)
            if (res.status === 202) return errorRes("이미 등록된 사업자 번호입니다.");
            return errorRes("새로고침을 해주세요");
        } catch (err: unknown) {
            return errorRes("새로고침을 해주세요");
        }
    }

    async getPharmacy(): Promise<Option<PharmacyDTO>> {
        try {
            const res = await axios.get("https://api.gyopoom.kr:4096/pharmacies");
            if (res.status === 200) return successRes(res)

            return errorRes("새로고침을 해주세요");
        } catch (err: unknown) {
            return errorRes("새로고침을 해주세요");
        }
    }

    async updatePharmacy(body: PharmacyUpdateDTO): Promise<Option<string>> {
        try {
            const res = await axios.patch("https://api.gyopoom.kr:4096/pharmacies", body);
            if (res.status === 200) return successRes(res)
            if (res.status === 403) return errorRes("관리자만 수정이 가능합니다.");

            return errorRes("새로고침을 해주세요.");
        } catch (err: unknown) {
            return errorRes("새로고침을 해주세요");
        }
    }

    async deletePharmacy(): Promise<Option<string>> {
        try {
            const res = await axios.delete("https://api.gyopoom.kr:4096/pharmacies");
            if (res.status === 204) return successRes(res)
            if (res.status === 202) return errorRes("진행중인 거래명세서가 있습니다. 삭제 후 다시 진행해주세요");

            if (res.status === 403) return errorRes("관리자만 삭제가 가능합니다");
            return errorRes("새로고침을 해주세요.");

        } catch (err: unknown) {
            return errorRes("새로고침을 해주세요.");
        }
    }

    async unConnectPharmacy(): Promise<Option<string>> {
        try {
            const res = await axios.delete("https://api.gyopoom.kr:4096/pharmacies/enroll");

            if (res.status === 204) return successRes(res)
            if (res.status === 202) return errorRes("완료되지 않은 거래명세서가 있습니다");

            return errorRes("새로고침을 해주세요.");
        } catch (err: unknown) {
            return errorRes("새로고침을 해주세요");
        }
    }

    async getAllEnrollPharmacy(): Promise<Option<EnrollPharmacyDTO[]>> {
        try {
            const res = await axios.get("https://api.gyopoom.kr:4096/pharmacies/enroll");
            if (res.status === 200) {
                if (res.data) return successRes(res)
                return errorRes("등록된 약국이 없습니다.")
            }

            return errorRes("새로고침을 해주세요");
        } catch (err: unknown) {
            const message = useGetErrorMessage(err);

            return errorRes("새로고침을 해주세요");
        }
    }

    async getMyEnrollPharmacy(): Promise<Option<EnrollPharmacyCurrentDTO>> {
        try {
            const res = await axios.get("https://api.gyopoom.kr:4096/pharmacies/enroll/current");
            if (res.status === 200) {
                if (res.data) return successRes(res)
                return errorRes("등록된 약국이 없습니다.")
            }

            return errorRes("새로고침을 해주세요");
        } catch (err: unknown) {
            const message = useGetErrorMessage(err);

            return errorRes("새로고침을 해주세요");
        }
    }
}