import styled from "styled-components";
import { theme } from "@styles/theme";
import MoreButton from "@components/MoreButton";
import GoodsThumbnailCard from "@components/GoodsThumbnailCard";
import ErrorIcon from "@images/icons/modal-error.svg"
import { GoodsPurchaseState } from "@utils/common-status-code";
import CardBottom from "../CardBottom";
import personPin from "@images/icons/person_pin.svg"
import Flex from "@components/Flex";
import { useNavigate } from "react-router-dom";
import GoodsAndPurchasingStateDTO from "@dto/goods-and-purchasing-state.res";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import GoodsPurchaseDetailsMiddleware from "@middleware/goods-purchase-details.middleware";
import { isSuccess } from "@utils/options";


type Props = {
    goods: GoodsAndPurchasingStateDTO
    refeching: () => void
    showPopUp: (id: string, state: boolean) => void
}

const GoodsOnSoldOutCard: React.FC<Props> = ({ goods, refeching, showPopUp }) => {
    const navigate = useNavigate();
    const goodsPurchaseDetailsMiddleware = new GoodsPurchaseDetailsMiddleware();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const returnNavigate = (purchasingState: string) => {
        switch (purchasingState) {
            case GoodsPurchaseState.inProgress:
                return {
                    label: "의약품 거래내역서 진행중",
                    action: () => setIsConfirmModalOpen({
                        title: "구매자가 서명을 완료하지 않았습니다",
                        icon: ErrorIcon,
                        confirmButton: {
                            width: 5,
                            label: "확인",
                            handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
                        },
                        isOpen: true
                    })
                }
            case GoodsPurchaseState.done:
                return {
                    label: "의약품 거래내역서 확인하기",
                    action: async () => {
                        if (goods.goodsPurchaseDetailsId) {
                            const res = await goodsPurchaseDetailsMiddleware.getUserReceiptId(goods.goodsPurchaseDetailsId);
                            if (isSuccess(res)) navigate(`/receipt/${res.data.userGoodsReceiptsId}`)
                        }

                    }
                }
            default:
                return {
                    label: "의약품 거래내역서 작성하기",
                    action: () => navigate(`/goods/${goods.id}/connect-buyer`, { state: { goods } })
                }
        }
    }

    return (
        <>
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
                    {
                        <CardBottom
                            label={returnNavigate(goods.purchasingState).label}
                            onCilckAction={returnNavigate(goods.purchasingState).action}
                            icon={personPin} />
                    }
                </Flex>
            </CardWrapper>
        </>
    )
}

const CardWrapper = styled.div`
    margin-bottom: 1rem;
    position: relative;
    background-color: ${theme.color.N0};
`

export default GoodsOnSoldOutCard