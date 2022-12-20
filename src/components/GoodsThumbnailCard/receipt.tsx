import Flex from "@components/Flex"
import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { GoodsOfReceiptDTO } from "@dto/receipt-goods-list.res"
import Moment from "react-moment"
import StateTag from "./StateTag"

type Props = {
    item: GoodsOfReceiptDTO
}

const GoodsThumbnailCard: React.FC<Props> = ({ item }) => {
    return (
        <CardWrapper>
            <Link to={"/" + item.id}>
                <Flex>
                    <ImageWrapper>
                        <img src={item.imageUrls[0].file} alt="테스트 이미지" />
                    </ImageWrapper>
                    <div style={{ marginLeft: "1.4rem" }}>
                        <Typography.H50M
                            color={theme.color.N900}>
                            {item.title}
                        </Typography.H50M>
                        <Flex>
                            <Typography.P100
                                color={theme.color.N80}>
                                {item.area}&nbsp;·&nbsp;</Typography.P100>
                            <Typography.P100
                                color={theme.color.N80}>
                                <Moment fromNow ago>{item.updateAt}</Moment>
                                <span> 전</span>
                            </Typography.P100>
                        </Flex>
                        <Flex style={{ marginTop: "0.4rem" }}>
                            <StateTag stateCode={item.goodsStateCode} />
                            <Typography.P200B
                                style={{ marginTop: "0.4rem" }}
                                color={theme.color.N900}>
                                {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                <span>원</span>
                            </Typography.P200B>
                        </Flex>
                    </div>
                </Flex>
            </Link>
        </CardWrapper>
    )
}


const CardWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.color.N40};
    padding: 1.5rem;
`

const ImageWrapper = styled.div`
    position: relative;
    width: 12rem;
    height: 10rem;
    flex: none;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.8rem;
        border-bottom: 1px solid ${theme.color.N40};
    }

    ::after
    {
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        top: 0;
        width: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 48.52%, rgba(0, 0, 0, 0.08) 100%);
    }
`
export default GoodsThumbnailCard