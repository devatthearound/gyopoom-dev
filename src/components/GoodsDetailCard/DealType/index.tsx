
import Typography from "@components/Typograpy";
import GoodsEntity from "@dto/goods.entity";
import { theme } from "@styles/theme";

type Props = {
    goods: GoodsEntity;
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

const DealType: React.FC<Props> = ({ goods }) => {
    if (goods.goodsStateCode === GoodsSateCode.SOLDOUT) {
        return <Typography.H75B
            color={theme.color.N80}>
            거래완료
        </Typography.H75B>
    } else {
        return <Typography.H75B
            color={theme.color.N900}>
            {goods.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            <span>원</span>
        </Typography.H75B>
        // switch (goods.paymentCode) {
        //     case PaymentCode.MONEY: {
        //         if (goods.isNegotiation) {
        //             return <Typography.H75B
        //                 color={theme.color.N900}>
        //                 가격협의
        //             </Typography.H75B>
        //         }
        //         return <Typography.H75B
        //             color={theme.color.N900}>
        //             {goods.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        //             <span>원</span>
        //         </Typography.H75B>
        //     }
        //     case PaymentCode.GOODS:
        //         return <Typography.H75B
        //             color={theme.color.N900}>
        //             {goods.exchangeGoods}
        //         </Typography.H75B>
        //     default: return null
        // }
    }
}

export default DealType