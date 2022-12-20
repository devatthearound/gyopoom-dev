import Typography from "@components/Typograpy"
import { isSuccess, successRes } from "@utils/options"
import GoodsMiddleware from "@middleware/goods.middleware"
import { theme } from "@styles/theme"
import { GoodsSateCode } from "@utils/common-status-code"
import styled from "styled-components"

type Props = {
    goodsId: string
}
const HiddenMenu: React.FC<Props> = ({ goodsId }) => {
    const goodsMiddleware = new GoodsMiddleware();
    
    const changeToOnSale = async() => {
        const res = await goodsMiddleware.changeGoodsState(goodsId, GoodsSateCode.SALE);
        if (isSuccess(res)) return;
    }

    return (
        <Card>
            <Button onClick={changeToOnSale}>
                <Typography.P200
                    color={theme.color.N900}>
                    숨기기 해제
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
    width: 100%;
    border: 0px;
    height: 4.9rem;
    background: none;
    :nth-child(1){
        border-right: 0.5px solid ${theme.color.N40};
    }
`

export default HiddenMenu