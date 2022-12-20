import Typography from "@components/Typograpy";
import { theme } from "@styles/theme";

type Props = {
    price: number
    paymentCode: string;
    isNegotiation: boolean;
}


enum PaymentCode {
    MONEY = "MONEY",
    GOODS = "GOODS"
}


const DealType: React.FC<Props> = ({ price, paymentCode, isNegotiation }) => {
    switch (paymentCode) {
        case PaymentCode.MONEY: {
            if (isNegotiation) {
                return <Typography.P200B
                    style={{ marginTop: "0.4rem" }}
                    color={theme.color.N900}>
                    가격협의 </Typography.P200B>
            }
            return (
                <Typography.P200B
                    style={{ marginTop: "0.4rem" }}
                    color={theme.color.N900}>
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    <span>원</span>
                </Typography.P200B>
            )

        }
        default: return null
    }
}

export default DealType