import BigTag from "@components/BigTag";
import Tag from "@components/SmallTag";
import GoodsEntity from "@dto/goods.entity";
import { theme } from "@styles/theme";

type Props = {
    goods: GoodsEntity;
    style?: React.CSSProperties
}

enum PaymentCode {
    MONEY = "MONEY",
    GOODS = "GOODS"
}

enum GoodsSateCode {
    RESERVATION = "RESERVATION",
    SALE = "SALE",
    SOLDOUT = "SOLDOUT",
}

const StateTag: React.FC<Props> = ({ goods, style }) => {
    switch (goods.goodsStateCode) {
        // case GoodsSateCode.SALE: {
        //     if (goods.paymentCode === PaymentCode.GOODS) {
        //         if (goods.isExchange) {
        //             return <BigTag color={theme.color.N400} tagName="필수맞교환" style={style}/>
        //         }
        //         return <BigTag color={theme.color.N400} tagName="맞교환" style={style}/>
        //     }
        //     return null
        // }
        case GoodsSateCode.RESERVATION:
            return <BigTag color={theme.color.B300} tagName="예약중" style={style}/>
        case GoodsSateCode.SOLDOUT:
            return <BigTag color={theme.color.N80} tagName="거래완료" style={style}/>
        default: return null
    }
}

export default StateTag