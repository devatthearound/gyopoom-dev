import Flex from "@components/Flex"
import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import styled from "styled-components"
import { useGetUser } from "@context/AuthContext"
import MessageDTO, { receiptMessageType } from "@dto/message.dto"
import { useNavigate } from "react-router-dom"
import GoodsPurchaseDetailsMiddleware from "@middleware/goods-purchase-details.middleware"
import { isSuccess } from "@utils/options"
import { useQuery } from "react-query"
import MessageTimeAndRead from "./MessageTimeAndRead"
import FillMediumButton from "@components/FillMediumButton"
import { style3 } from "@utils/theme/button/style3"

type Props = {
    item: MessageDTO
}

const MessageTypeOfInProgressCard: React.FC<Props> = ({ item }) => {
    const { user } = useGetUser()
    const navigate = useNavigate();
    const goodsPurchaseDetailsMiddleware = new GoodsPurchaseDetailsMiddleware();

    const text = JSON.parse(item.text) as receiptMessageType;


    return (
        <Wrapper isOwn={item.senderId === user?.id}>
            <MessageTimeAndRead isRead={item.isRead} date={item.createAt} />
            <Container isOwn={item.senderId === user?.id}>
                <Header>
                    <Typography.H50B color={theme.color.N0}>서명요청</Typography.H50B>
                </Header>
                <Body>
                    <Typography.P100>
                        서명요청<br />
                        {text.sellerName}님의 서명요청
                        {text.buyerName}님,
                         "{text.goodsTitle}"에 대한 의약품 거래내역서에 서명해 주세요.<br /><br />

                        ▷서명 요청자 :<br />
                        {text.sellerName}({text.sellerPharmacyName})<br /><br />

                        ▷서명자 :<br />
                        {text.buyerName}({text.buyerPharmacyName})<br /><br />

                        약국교품거래내역서는 [내정보] 메뉴에서 확인하실 수 있습니다.<br /><br />

                        ▼ 버튼을 눌러 서명하기▼
                    </Typography.P100>
                    {
                        item.senderId === user?.id ?
                            <FillMediumButton
                                id="no-action"
                                label="내용 확인하고 서명하기"
                                disabled={false}
                                handleOnClick={() => { }}
                                {...style3} />
                            : <FillMediumButton
                                id="go-new-receipt"
                                label="내용 확인하고 서명하기"
                                disabled={false}
                                handleOnClick={() => navigate(`/goods/${text.idForButton}/new-receipt`)}
                                {...style3} />
                    }
                </Body>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled(Flex) <{ isOwn: boolean }>`
    gap: 0.5rem;
    padding: 0.4rem 0;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: ${(props) => props.isOwn ? "row" : "row-reverse"};
`


const Header = styled.div`
    width:100%;
    padding: 1.6rem 1.5rem 1.1rem;
    background-color: ${theme.color.B300};
    border-radius: 0.8rem  0.8rem 0  0;
`
const Body = styled.div`
    width:100%;
    padding: 1.6rem 1.5rem;
    border-radius: 0 0 0.8rem 0.8rem;

    button{
        margin-top: 2.3rem;
    }
`

const Container = styled(Flex) <{ isOwn: boolean }>`
    background-color:  ${theme.color.N0};
    flex-direction: column;
    border-radius: 1.2rem;
    align-items: center;
    justify-content: center;
    max-width: 26rem;
    position: relative;
    ::after {
        border-top:15px solid ${theme.color.B300};
        border-left: ${(props) => props.isOwn ? "0px solid transparent" : "15px solid transparent"}; ;
        border-right: ${(props) => props.isOwn ? "15px solid transparent" : "0px solid transparent"}; ;
        border-bottom: 0px solid transparent;
        content:"";
        position:absolute;
        top: 7px;
        left:  ${(props) => props.isOwn ? "auto" : "-14px"};
        right:  ${(props) => props.isOwn ? "-14px" : "auto"};
    }
`
export default MessageTypeOfInProgressCard;