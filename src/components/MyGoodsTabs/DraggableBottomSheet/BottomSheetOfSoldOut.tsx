import ScrollUpAndDownBox from "@components/animation/DraggableBottomSheetWithHeader";
import { useNavigate } from "react-router-dom";
import BottomSheetBody from "@components/Modal/BottomSheetBody";
import GoodsMiddleware from "@middleware/goods.middleware";
import { useErrorHandlerForm } from "@context/ErrorHandleContext";
import { GoodsSateCode, GoodsSateText } from "@utils/common-status-code";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/modal-error.svg"
import { theme } from "@styles/theme";

type Props = {
    id: string,
    isMoreClick: boolean
    refetch: () => void,
    setIsMoreClick: React.Dispatch<React.SetStateAction<boolean>>
}

const BottomSheetOfSoldOut: React.FC<Props> = ({ id, isMoreClick, setIsMoreClick, refetch }) => {
    const navigate = useNavigate();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const stateChange = (state: boolean) => {
        setIsMoreClick(state)
    }

    const { setModalMessage } = useErrorHandlerForm();
    const goodsMiddleware = new GoodsMiddleware();
    const goToChangeGoods = (id: string) => {
        navigate(`/change-goods/${id}`)

        return true;
    }



    const goToSale = async (id: string) => {
        setModalMessage(GoodsSateText.SALE + "으로 거래상태를 변경합니다");
        setIsMoreClick(false)
        const result = await goodsMiddleware.changeGoodsState(id, GoodsSateCode.SALE);
        refetch();
        await setTimeout(() => setModalMessage(""), 1000);
    }

    const goToHidden = async (id: string) => {
        setIsMoreClick(false)
        setIsConfirmModalOpen({
            isOpen: true,
            title: "정말로 게시물을 숨기시겠습니까?",
            label: "요청중/작성된 거래명세서도 함께 삭제됩니다",
            icon: ErrorIcon,
            confirmButton: {
                width: 5,
                label: "확인",
                handleOnClick: async () => {
                    setModalMessage(GoodsSateText.SUSPEND + "으로 거래상태를 변경합니다");
                    setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
                    const result = await goodsMiddleware.changeGoodsState(id, GoodsSateCode.SUSPEND);
                    refetch();
                    await setTimeout(() => setModalMessage(""), 1000);
                }
            },
            cancelButton: {
                width: 5,
                label: "취소",
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
            }
        })
    }

    const goToDelete = async (id: string) => {
        setIsMoreClick(false)
        setIsConfirmModalOpen({
            title: "정말로 게시물을 삭제하시겠습니까?",
            label: "요청중/작성된 거래명세서도 함께 삭제됩니다",
            icon: ErrorIcon,
            confirmButton: {
                width: 5,
                label: "확인",
                handleOnClick: async () => {
                    setModalMessage("해당 게시글이 삭제되었습니다");
                    setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
                    const result = await goodsMiddleware.deleteGoods(id);
                    refetch();
                    await setTimeout(() => setModalMessage(""), 1000);
                }
            },
            cancelButton: {
                width: 5,
                label: "취소",
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
            },
            isOpen: true
        })
    }



    return (
        <>
            <ScrollUpAndDownBox isOpen={isMoreClick} stateChange={stateChange}>
                <ul style={{ width: "100% " }}>
                    <BottomSheetBody
                        label="판매중으로 변경"
                        id={id}
                        changeFC={goToSale} />
                    <BottomSheetBody
                        label="게시글 수정"
                        id={id}
                        changeFC={goToChangeGoods} />
                    <BottomSheetBody
                        label="숨기기"
                        id={id}
                        changeFC={goToHidden} />
                    <BottomSheetBody
                        label="삭제"
                        id={id}
                        changeFC={goToDelete} />
                </ul>
            </ScrollUpAndDownBox>
        </>
    )
}


export default BottomSheetOfSoldOut