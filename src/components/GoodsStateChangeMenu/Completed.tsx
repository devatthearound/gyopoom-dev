import Typography from "@components/Typograpy"
import GoodsMiddleware from "@middleware/goods.middleware"
import { theme } from "@styles/theme"
import { GoodsSateCode } from "@utils/common-status-code"
import { isSuccess } from "@utils/options"
import styled from "styled-components"

type Props = {
    goodsId: string
}
const CompletedMenu: React.FC<Props> = ({ goodsId }) => {
    const goodsMiddleware = new GoodsMiddleware();
    
    const changeToReservation = async () => {
        const res = await goodsMiddleware.changeGoodsState(goodsId, GoodsSateCode.RESERVATION);
        if (isSuccess(res)) return;
    }

    const changeToCompleted = async () => {
        const res = await goodsMiddleware.changeGoodsState(goodsId, GoodsSateCode.SOLDOUT);
        if (isSuccess(res)) return;
    }

    return (
        <Card>
            <Button onClick={changeToReservation}>
                <Typography.P200
                    color={theme.color.N900}>
                    예약중
                </Typography.P200>
            </Button>
            <Button onClick={changeToCompleted}>
                <Typography.P200
                    color={theme.color.N900}>
                    거래완료
                </Typography.P200>
            </Button>
        </Card>
    )
}

const Card = styled.div`
    width: 100%;
    border-top: 0.5px solid ${theme.color.N40};
`
const Button = styled.button`
    width: 50%;
    border: 0px;
    height: 4.9rem;
    background: none;
    :nth-child(1){
        border-right: 0.5px solid ${theme.color.N40};
    }
`

export default CompletedMenu