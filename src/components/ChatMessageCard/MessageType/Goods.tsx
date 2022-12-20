import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import styled from "styled-components"
import MessageDTO, { UrlMessageType } from "@dto/message.dto"
import GoodsMiddleware from "@middleware/goods.middleware"
import { useQuery } from "react-query"
import { isSuccess } from "@utils/options"
import ListAltIcon from "@images/icons/list_alt.svg"
import { useGetUser } from "@context/AuthContext"
import { GoodsPurchaseState } from "@utils/common-status-code"
import useReceiptNewStore from "@store/receipt.new"
import { useLocation, useNavigate } from "react-router-dom"
import useLocalStorage from "@hooks/useLocalStorage"

type Props = {
    item: MessageDTO
}

const MessageTypeOfGoodsCard: React.FC<Props> = ({ item }) => {
    const { user } = useGetUser()
    const navigate = useNavigate();
    const goodsMiddleware = new GoodsMiddleware();

    const getGoods = async () => {
        const apiRes = await goodsMiddleware.getChatGoodsById(item.text);
        if (isSuccess(apiRes)) return { ...apiRes.data };
    };

    const { isLoading, data } = useQuery(['goodsOne', item.id], getGoods);

    if (isLoading || !data) return null;
    const {pathname} = useLocation();
    const { setLocalStorage } = useLocalStorage();
    const handleOnClick = () => {
        if (data) {
            setLocalStorage("goodsId", data.id)
            setLocalStorage("buyerId", item.senderId)
            setLocalStorage("currentRoute", pathname)
            navigate(`/new-purchase-details`)
        }
    }

    const returnButtonCard = (type: string | null) => {
        switch (type) {
            case null:
                return (
                    <Button onClick={handleOnClick}>
                        <img src={ListAltIcon} width="16px" height="16px" />
                        <Typography.P100B color={theme.color.N900}>
                            거래내역서
                        </Typography.P100B>
                    </Button>)
            case GoodsPurchaseState.inProgress:
                return (
                    <Button>
                        <img src={ListAltIcon} width="16px" height="16px" />
                        <Typography.P100B color={theme.color.N900}>
                            거래 진행중
                        </Typography.P100B>
                    </Button>)
            case GoodsPurchaseState.done:
                return (
                    <Button>
                        <img src={ListAltIcon} width="16px" height="16px" />
                        <Typography.P100B color={theme.color.N900}>
                            거래 완료
                        </Typography.P100B>
                    </Button>)
            default: return null;
        }
    }

    return (
        <Wrapper>
            <ImageWrapper>
                <img src={data.imageUrls[0].file} alt="상품 이미지" />
            </ImageWrapper>
            <TextWrapper>
                <Typography.H50M style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}>
                    {data?.title}
                </Typography.H50M >
                <Typography.P50 color={theme.color.N100} style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}>
                    {data?.price} 원
                </Typography.P50>
            </TextWrapper>
            {
                item.senderId != user?.id && returnButtonCard(data.purchasingState)
            }
        </Wrapper>
    )
}


const TextWrapper = styled.div`
    margin-left: 0.8rem;
    text-overflow: ellipsis;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
`

const ImageWrapper = styled.div`
    position: relative;
    width: 7.2rem;
    height: 6.4rem;
    border: 1px solid ${theme.color.N60};
    border-radius: 0.9rem;
    img{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.8rem;
    }
`

const Button = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border: 1px solid ${theme.color.N60};
    background-color: ${theme.color.N0};
    border-radius: 0.8rem;
    width: fit-content;
    padding: 1rem 1.6rem;
    cursor: pointer;
`

const Wrapper = styled.div`
    display: flex;
    margin: 0.4rem 0;
    padding: 1.5rem 1.6rem;
    border-radius: 0.8rem;
    align-items: center;
    justify-content: flex-start;
    background-color:${theme.color.N0};
`

export default MessageTypeOfGoodsCard;