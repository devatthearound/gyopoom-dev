import styled from "styled-components";
import { theme } from "@styles/theme";
import GoodsThumbnailCard from "@components/GoodsThumbnailCard/receipt";
import personPin from "@images/icons/person_pin.svg"
import Flex from "@components/Flex";
import CardBottom from "../CardBottom";
import { useNavigate } from "react-router-dom";
import { GoodsOfReceiptDTO } from "@dto/receipt-goods-list.res";

type Props = {
    item: GoodsOfReceiptDTO
}

const GoodsOnBuyCard: React.FC<Props> = ({ item }) => {
    const navigate = useNavigate();

    return (
        <CardWrapper>
            <GoodsThumbnailCard item={item} />
            <Flex style={{
                backgroundColor: theme.color.N0,
                width: "100%",
                borderTop: `0.5px solid ${theme.color.N40}`
            }}>
                {
                    <CardBottom
                        label="의약품 거래내역서 확인하기"
                        onCilckAction={() => navigate(`/receipt/${item.userGoodsReceiptsId}`)}
                        icon={personPin} />
                }
            </Flex>
        </CardWrapper>
    )
}

const CardWrapper = styled.div`
    margin-bottom: 1rem;
    background-color: ${theme.color.N0};
`

export default GoodsOnBuyCard