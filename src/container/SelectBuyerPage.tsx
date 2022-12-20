import LabelOnTheCenterAndBothActionButtons from "@components/HeaderNavigation/LabelOnTheCenterAndBothActionButtons"
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout"
import Typography from "@components/Typograpy"
import ChatUserDTO from "@dto/chat-user.res"
import ChatUserCard from "@components/ChatUserCard"
import GoodsThumbnailSimpleCard from "@components/GoodsThumbnailCard/simple"
import ChatMiddleware from "@middleware/chat.middleware"
import { theme } from "@styles/theme"
import { isSuccess } from "@utils/options"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import ErrorIcon from "@images/icons/blue_error.svg"
import GoodsMiddleware from "@middleware/goods.middleware"
import useModalStore from "@components/BasicConfirmModal/modal.store"
import GoodsThumbnailDTO from "@dto/goods-thumbnail.dto"
import useLocalStorage from "@hooks/useLocalStorage"

const SelectBuyerPage = () => {
    const { goodsId } = useParams();
    const navigate = useNavigate();
    const goodsMiddleware = new GoodsMiddleware();
    const [goods, setGoods] = useState<GoodsThumbnailDTO>();
    const chatMiddleware = new ChatMiddleware();
    const [currentRoomList, setCurrentRoomList] = useState<ChatUserDTO[]>([]);
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const getGoods = async () => {
        if (goodsId) {
            const res = await goodsMiddleware.getGoodsById(goodsId);
            if (isSuccess(res)) setGoods({
                id: res.data.id,
                area: res.data.author.area,
                title: res.data.title,
                imageUrls: res.data.imageUrls,
                price: res.data.price,
                isNegotiation: res.data.isNegotiation,
                goodsStateCode: res.data.goodsStateCode,
                updateAt: res.data.updateAt
            })
        }
    };

    const getCurrentRoom = async (limite: number) => {
        const res = await chatMiddleware.getCurrentRoom(5)
        if (isSuccess(res)) {
            setCurrentRoomList(oldArray => [...oldArray, ...res.data])
        } else {
            setIsConfirmModalOpen({
                isOpen: true,
                title: res.message,
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "확인",
                    width: 10
                }
            })
        }
    }

    useEffect(() => {
        getCurrentRoom(5);
        getGoods();
    }, [])

    const { setLocalStorage } = useLocalStorage();
    const { pathname } = useLocation();
    const createBuyer = async (id: string) => {
        if (goods) {
            setLocalStorage("goodsId", goodsId)
            setLocalStorage("buyerId", id)
            setLocalStorage("currentRoute", pathname)
            navigate(`/new-purchase-details`)
        }
    }

    const LeftActions = [{
        event: () => navigate(-1),
        iconType: BackIcon
    }]

    return (
        <WithNoGuttersTopAndBottomLayout>
            <Container>
                <LabelOnTheCenterAndBothActionButtons label="구매자 선택" leftActions={LeftActions} />
                {goods && <GoodsThumbnailSimpleCard goods={goods} />}
                {
                    currentRoomList && (
                        currentRoomList.map((room, key) => (
                            <div key={key}>
                                <ChatUserCard item={room} onClick={() => createBuyer(room.id)} />
                            </div>
                        ))
                    )
                }
                <div style={{ textAlign: "center" }}>
                    <Typography.H50
                        style={{ textDecoration: 'underline', textUnderlinePosition: 'under', marginTop: "3.5rem" }}
                        color={theme.color.N50}>
                        최근 채팅 목록에서 구매자 찾기
                    </Typography.H50>
                </div>
            </Container>
        </WithNoGuttersTopAndBottomLayout>
    )
}

const Container = styled.div`
    height:100%;
    overflow: scroll;
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`

export default SelectBuyerPage