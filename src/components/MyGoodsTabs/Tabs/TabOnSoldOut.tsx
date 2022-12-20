import { useErrorHandlerForm } from "@context/ErrorHandleContext";
import { isSuccess } from "@utils/options";
import GoodsMiddleware from "@middleware/goods.middleware";
import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { theme } from "@styles/theme";
import GoodsOnSoldOutCard from "../GoodsCards/GoodsOnSoldOutCard";
import BottomSheetOfSoldOut from "../DraggableBottomSheet/BottomSheetOfSoldOut";
import ErrorIcon from "@images/icons/blue_error.svg"
import useModalStore from "@components/BasicConfirmModal/modal.store";

const TabOnSoldOut = () => {
    const goodsMiddleware = new GoodsMiddleware();
    const [selectGoodsId, setSelectGoodsId] = useState<string>("");
    const [isMoreClick, setIsMoreClick] = useState<boolean>(false);
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const showPopup = (id: string, state: boolean) => {
        setSelectGoodsId(id)
        setIsMoreClick(state)
    }
    const getMyGoods = async () => {
        const apiRes = await goodsMiddleware.getMyGoodsOnSoldOut();
        if (isSuccess(apiRes)) return apiRes.data;
        setIsConfirmModalOpen({
            isOpen: true,
            title: apiRes.message,
            icon: ErrorIcon,
            confirmButton: {
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                label: "확인",
                bgColor: theme.color.B300,
                textColor: theme.color.N0,
                width: 10
            }
        })
    };

    const { isLoading, data, refetch } = useQuery('myGoodsOnSoldOut', getMyGoods);

    const refeching = useCallback(() => refetch(), [refetch])

    return (
        <>
            {
                !isLoading && data &&
                data.map((goods, key) => (
                    <GoodsOnSoldOutCard
                        goods={goods}
                        key={key}
                        showPopUp={showPopup}
                        refeching={refeching} />
                ))
            }
            <BottomSheetOfSoldOut
                id={selectGoodsId}
                isMoreClick={isMoreClick}
                setIsMoreClick={setIsMoreClick}
                refetch={refeching} />
        </>
    )
}
const CardWrapper = styled.div`
    margin-bottom: 1rem;
    position: relative;
`

export default TabOnSoldOut