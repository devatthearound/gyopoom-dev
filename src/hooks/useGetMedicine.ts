import useModalStore from "@components/BasicConfirmModal/modal.store";
import GoodsMiddleware from "@middleware/goods.middleware";
import { isSuccess } from "@utils/options";
import { useNavigate } from "react-router-dom";

const useGetMedicine = () => {
    const goodsMiddleware = new GoodsMiddleware();
    const navigate = useNavigate();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const getMedicine = async (goodsId: string) => {
        const res = await goodsMiddleware.getGoodsMedicine(goodsId);
        if (isSuccess(res)) {
            return res.data;
        }
        return setIsConfirmModalOpen({
            isOpen: true,
            title: "게시글 데이터를 불러올 수 없습니다",
            confirmButton: {
                handleOnClick: () => {
                    navigate(-1);
                    setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false });
                },
                label: "확인",
                width: 10
            },
        })
    }

    return { getMedicine }
}

export default useGetMedicine;