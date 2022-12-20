import { useErrorHandlerForm } from "@context/ErrorHandleContext";
import { isSuccess } from "@utils/options";
import GoodsMiddleware from "@middleware/goods.middleware";
import { useQuery } from "react-query";
import GoodsOnReservationAndSaleCard from "../GoodsCards/GoodsOnReservationAndSaleCard";
import { useCallback, useState } from "react";
import BottomSheetOfReservationAndSale from "@components/MyGoodsTabs/DraggableBottomSheet/BottomSheetOfReservationAndSale"
import ErrorIcon from "@images/icons/blue_error.svg"
import useModalStore from "@components/BasicConfirmModal/modal.store";
import { theme } from "@styles/theme";
const TabOnReservationAndSale = () => {
    const goodsMiddleware = new GoodsMiddleware();
    const [selectGoodsId, setSelectGoodsId] = useState<string>("");
    const [isMoreClick, setIsMoreClick] = useState<boolean>(false);
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const showPopup = (id: string, state: boolean) => {
        setSelectGoodsId(id)
        setIsMoreClick(state)
    }
    const getMyGoods = async () => {
        const apiRes = await goodsMiddleware.getMyGoodsOnReservationAndSale();
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

    const { isLoading, data, refetch } = useQuery('myGoodsOnReservationAndSale', getMyGoods);

    const refeching = useCallback(() => {
        refetch()
    }, [refetch])

    return (
        <>
            {
                !isLoading && data &&
                data.map((goods, key) => (
                    <GoodsOnReservationAndSaleCard
                        goods={goods}
                        key={key}
                        showPopUp={showPopup}
                        refeching={refeching} />
                ))
            }
            <BottomSheetOfReservationAndSale
                id={selectGoodsId}
                isMoreClick={isMoreClick}
                setIsMoreClick={setIsMoreClick}
                refetch={refeching} />
        </>
    )
}
export default TabOnReservationAndSale