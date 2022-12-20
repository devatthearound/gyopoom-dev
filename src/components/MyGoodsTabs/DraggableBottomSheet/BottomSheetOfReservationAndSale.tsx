import ScrollUpAndDownBox from "@components/animation/DraggableBottomSheetWithHeader";
import { useNavigate } from "react-router-dom";
import BottomSheetBody from "@components/Modal/BottomSheetBody";
import GoodsMiddleware from "@middleware/goods.middleware";
import { useErrorHandlerForm } from "@context/ErrorHandleContext";
import { GoodsSateCode, GoodsSateText } from "@utils/common-status-code";

type Props = {
    id: string,
    isMoreClick: boolean
    refetch: () => void,
    setIsMoreClick: React.Dispatch<React.SetStateAction<boolean>>
}

const BottomSheetOfReservationAndSale: React.FC<Props> = ({ id, isMoreClick, setIsMoreClick, refetch }) => {
    const navigate = useNavigate();

    const stateChange = (state: boolean) => {
        setIsMoreClick(state)
    }

    const { setModalMessage } = useErrorHandlerForm();
    const goodsMiddleware = new GoodsMiddleware();
    const goToChangeGoods = (id: string) => {
        navigate(`/change-goods/${id}`)

        return true;
    }

    const goToHidden = async (id: string) => {
        setModalMessage(GoodsSateText.SUSPEND + "으로 거래상태를 변경합니다");
        setIsMoreClick(false)
        const result = await goodsMiddleware.changeGoodsState(id, GoodsSateCode.SUSPEND);
        refetch();
        await setTimeout(() => setModalMessage(""), 1000);
    }

    const goToDelete = async (id: string) => {
        setModalMessage("해당 게시글이 삭제되었습니다");
        setIsMoreClick(false)
        const result = await goodsMiddleware.deleteGoods(id);
        refetch();
        await setTimeout(() => setModalMessage(""), 1000);
    }



    return (
        <ScrollUpAndDownBox isOpen={isMoreClick} stateChange={stateChange}>
            <ul style={{ width: "100% " }}>
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
    )
}


export default BottomSheetOfReservationAndSale