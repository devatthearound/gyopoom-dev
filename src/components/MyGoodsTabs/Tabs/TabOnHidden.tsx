import { useErrorHandlerForm } from "@context/ErrorHandleContext";
import { isSuccess } from "@utils/options";
import GoodsMiddleware from "@middleware/goods.middleware";
import { useQuery } from "react-query";
import GoodsOnHiddenCard from "../GoodsCards/GoodsOnHiddenCard";
import { useCallback, useState } from "react";
import BottomSheetOfTabOnHidden from "../DraggableBottomSheet/BottomSheetOfTabOnHidden";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import { theme } from "@styles/theme";
import ErrorIcon from "@images/icons/blue_error.svg"
const TabOnHidden = () => {
    const goodsMiddleware = new GoodsMiddleware();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();
    const [selectGoodsId, setSelectGoodsId] = useState<string>("");
    const [isMoreClick, setIsMoreClick] = useState<boolean>(false);


    const showPopup = (id: string, state: boolean) => {
        setSelectGoodsId(id)
        setIsMoreClick(state)
    }

    const getMyGoods = async () => {
        const apiRes = await goodsMiddleware.getMyGoodsOnHidden();
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

    const { isLoading, data, refetch } = useQuery('myGoodsOnHidden', getMyGoods);

    const refeching = useCallback(() => {
        refetch()
    }, [refetch])
    return (
        <>
            {
                !isLoading && data &&
                data.map((goods, key) => (
                    <GoodsOnHiddenCard
                        key={key}
                        goods={goods}
                        showPopUp={showPopup}
                        refeching={refeching} />
                ))
            }
            <BottomSheetOfTabOnHidden
                id={selectGoodsId}
                isMoreClick={isMoreClick}
                setIsMoreClick={setIsMoreClick}
                refetch={refeching} />
        </>
    )
}


export default TabOnHidden