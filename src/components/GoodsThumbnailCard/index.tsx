import Flex from "@components/Flex"
import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Moment from "react-moment";
import StateTag from "./StateTag"
import GoodsThumbnailDTO from "@dto/goods-thumbnail.dto"

type Props = {
    goods: GoodsThumbnailDTO
}

const GoodsThumbnailCard: React.FC<Props> = ({ goods }) => {
    return (
        <CardWrapper>
            <Link to={"/" + goods.id}>
                <Flex>
                    <ImageWrapper>
                        <img src={goods.imageUrls[0].file} alt="테스트 이미지" />
                    </ImageWrapper>
                    <div style={{ marginLeft: "1.4rem" }}>
                        <Typography.H50M
                            color={theme.color.N900}>
                            {goods.title}
                        </Typography.H50M>
                        <Flex>
                            <Typography.P100
                                color={theme.color.N80}>
                                {goods.area}&nbsp;·&nbsp;</Typography.P100>
                            <Typography.P100
                                color={theme.color.N80}>
                                <Moment fromNow ago>{goods.updateAt}</Moment>
                                <span> 전</span>
                            </Typography.P100>
                        </Flex>
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