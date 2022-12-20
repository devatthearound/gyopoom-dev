import SmallTag from "@components/SmallTag";
import { theme } from "@styles/theme";

type Props = {
    stateCode: string
}

enum GoodsSateCode {
    RESERVATION = "RESERVATION",
    SALE = "SALE",
    SOLDOUT = "SOLDOUT",
}

const StateTag: React.FC<Props> = ({ stateCode }) => {
    switch (stateCode) {
        case GoodsSateCode.RESERVATION:
            return <SmallTag color={theme.color.B300} tagName="예약중" />
        case GoodsSateCode.SOLDOUT:
            return <SmallTag color={theme.color.N80} tagName="거래완료" />
        default: return null
    }
}

export default StateTag