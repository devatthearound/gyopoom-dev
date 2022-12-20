import Flex from "@components/Flex"
import Typography from "@components/Typograpy"
import GoodsThumbnailDTO from "@dto/goods-thumbnail.dto"
import { theme } from "@styles/theme"
import styled from "styled-components"
import StateTag from "./StateTag"

type Props = {
    goods: GoodsThumbnailDTO
}

const GoodsThumbnailSimpleCard: React.FC<Props> = ({ goods }) => {
    return (
        <CardWrapper>
            <Flex>
                <ImageWrapper>
                    <img src={goods.imageUrls[0].file} alt="상품 이미지" />
                </ImageWrapper>
                <div style={{ marginLeft: "1.4rem" }}>
                    <Typography.H50M
                        color={theme.color.N900}>
                        {goods.title}
                    </Typography.H50M>
                    <Flex style={{ marginTop: "0.4rem" }}>
                        <StateTag stateCode={goods.goodsStateCode} />
                        <Typography.P200B
                            style={{ marginTop: "0.4rem" }}
                            color={theme.color.N900}>
                            {goods.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            <span>원</span>
                        </Typography.P200B>
                    </Flex>
                </div>
            </Flex>
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
    width: 7.2rem;
    height: 6.4rem;
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

export default GoodsThumbnailSimpleCard