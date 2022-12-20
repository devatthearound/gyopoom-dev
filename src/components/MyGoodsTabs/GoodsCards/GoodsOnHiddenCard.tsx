import MoreButton from "@components/MoreButton";
import GoodsThumbnailCard from "@components/GoodsThumbnailCard";
import styled from "styled-components";
import personPin from "@images/icons/person_pin.svg"
import CardBottom from "../CardBottom";
import GoodsEntity from "@dto/goods.entity";
import { theme } from "@styles/theme";
import { GoodsSateCode, GoodsSateText } from "@utils/common-status-code";
import Flex from "@components/Flex";
import GoodsMiddleware from "@middleware/goods.middleware";
import { isSuccess } from "@utils/options";
import { useErrorHandlerForm } from "@context/ErrorHandleContext";
import GoodsAndPurchasingStateDTO from "@dto/goods-and-purchasing-state.res";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/blue_error.svg"

type Props = {
    goods: GoodsAndPurchasingStateDTO
    refeching: () => void
    showPopUp: (id: string, state: boolean) => void
}

const GoodsOnHiddenCard: React.FC<Props> = ({ goods, refeching, showPopUp }) => {
    const goodsMiddleware = new GoodsMiddleware;
    const { setModalMessage } = useErrorHandlerForm();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();
    const changeToState = async (state: string) => {
        const res = await goodsMiddleware.changeGoodsState(goods.id, state);
        if (isSuccess(res)) {
            refeching();

            return true;
        }
        setIsConfirmModalOpen({
            isOpen: true,
            title: res.message,
            icon: ErrorIcon,
            confirmButton: {
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                label: "확인",
                bgColor: theme.color.B300,
                textColor: theme.color.N0,
                width: 10
            }
        })
        return false;
    }

    const hanlderOnClick = async (stateToBeChanged: string) => {
        setModalMessage(GoodsSateText.SALE + "로 상태를 변경합니다");

        const result = await changeToState(stateToBeChanged)

        await setTimeout(() => setModalMessage(""), 1000);
    }

    return (
        <CardWrapper>
            <GoodsThumbnailCard goods={{
                id: goods.id,
                area: goods.area,
                title: goods.title,
                imageUrls: goods.imageUrls,
                price: goods.price,
                isNegotiation: goods.isNegotiation,
                goodsStateCode: goods.goodsStateCode,
                updateAt: goods.updateAt
            }} />
            <MoreButton onClick={() => showPopUp(goods.id, true)} />
            <Flex style={{
                backgroundColor: theme.color.N0,
                width: "100%",
                borderTop: `0.5px solid ${theme.color.N40}`
            }}>
                <CardBottom
                    label="숨기기 해제"
                    onCilckAction={() => hanlderOnClick(GoodsSateCode.SALE)}
                    icon={personPin} />
            </Flex>
        </CardWrapper>
    )
}

const CardWrapper = styled.div`
    margin-bottom: 1rem;
    position: relative;
    background-color: ${theme.color.N0};
`
export default GoodsOnHiddenCard