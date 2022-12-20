import GoodsEntity from "@dto/goods.entity"
import { theme } from "@styles/theme"
import styled from "styled-components"
import FillButton from "@components/FillButton";
import DealType from "../DealType";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "@context/AuthContext";
import { ChatMessageTypeCode } from "@utils/common-status-code";
import { style3 } from "@utils/theme/button/style3";
import ChatMiddleware from "@middleware/chat.middleware";
import { isSuccess } from "@utils/options";

type Props = {
    goods: GoodsEntity
}

const BottomNavigation: React.FC<Props> = ({ goods }) => {
    const { user } = useGetUser();
    const navigate = useNavigate();
    const chatMiddleware = new ChatMiddleware();
    const handleOnClick = async () => {
        if (goods) {
            const res = await chatMiddleware.createRooms({
                secondUser: goods.author.id,
                goodsId: goods.id
            })

            if (isSuccess(res)) {
                // 첫번째 B
                return navigate(`/my-chat/room/${res.data.roomId}`, {
                    state: {
                        text: goods.id,
                        type: ChatMessageTypeCode.goods
                    }
                })
            }
        }
    }

    return (
        <Wrapper>
            <DealType goods={goods} />
            <ButtonWrapper>
                {
                    user && user.id != goods.author.id &&
                    <FillButton
                        id="navigate"
                        label="채팅하기"
                        handleOnClick={handleOnClick}
                        disabled={false}
                        {...style3} />
                }
            </ButtonWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1.2rem;
    align-items: center;
    height: 7.2rem;
    border-top: 0.5px solid ${theme.color.N40};
    background-color: ${theme.color.N0};
    width: 100%;
`

const ButtonWrapper = styled.div`
    width: fit-content;
`
export default BottomNavigation