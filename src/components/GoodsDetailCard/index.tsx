import styled from "styled-components";
import { isSuccess } from "@utils/options";
import GoodsMiddleware from "@middleware/goods.middleware";
import { useQuery } from "react-query";
import Typography from "@components/Typograpy";
import { theme } from "@styles/theme";
import 'moment/locale/ko';
import Moment from 'react-moment';

import GoodsBottomNavigation from "@components/GoodsDetailCard/BottomNavigation";
import StateTag from "./StateTag";
import Flex from "@components/Flex";

type Props = {
    goodsId: string
}

const GoodsDetailCard: React.FC<Props> = ({ goodsId }) => {
    const goodsMiddleware = new GoodsMiddleware();

    const getGoods = async () => {
        if (goodsId) {
            const apiRes = await goodsMiddleware.getGoodsById(goodsId);
            if (isSuccess(apiRes)) return apiRes.data;
        }
    };

    const { isLoading, data } = useQuery('goods', getGoods);

    return (
        !isLoading && data? (
            <Wrapper>
                <ContextCard>
                    <GoodsImages>
                        <ImageWrapper>
                            <Img src={data.imageUrls[0].file} alt="약사진" />
                        </ImageWrapper>
                    </GoodsImages>
                    <UserSelection>
                        <ProfileImageWrapper>
                            <Img src={data.author.profileUrl} alt="프로필 사진" />
                        </ProfileImageWrapper>
                        <Typography.P200B>{data.author.name}</Typography.P200B>
                        <Typography.P100
                            color={theme.color.N100}>
                            {data.author.area}
                        </Typography.P100>
                    </UserSelection>
                    <ContentSelection>
                        <ContentHeader>
                            <Flex>
                                <StateTag goods={data} />
                                <Typography.H50M
                                    color={theme.color.N900}>{data.title}</Typography.H50M>
                            </Flex>
                            <Typography.Caption
                                color={theme.color.N100}>
                                <Moment fromNow ago>{data.updateAt}</Moment>
                                <span>전</span>
                            </Typography.Caption>
                        </ContentHeader>
                        <TextArea readOnly>
                            {data.content}
                        </TextArea>
                    </ContentSelection>
                </ContextCard>
                <GoodsBottomNavigation goods={data} />
            </Wrapper>
        ):null
    )
}

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
`
const ContextCard = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
`

const TextArea = styled.textarea`
    width: 100%;
    color: ${theme.color.N900};
    resize: none;
    border: 0px;
    margin-top: 1.6rem;
    font-size: ${theme.fontSize.H50};
    font-weight: ${theme.fontWeight.Regular};
    letter-spacing: ${theme.letterSpacing.normal}px;
    line-height:  ${theme.lineHeight.normal};
    color: ${theme.color.N500};
    height: 100%;
    ::placeholder{
        color: ${theme.color.N50};
    }
`

const ContentHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`

const ContentSelection = styled.div`
    padding: 1.2rem;
    height: 100%;
`
const GoodsImages = styled.div`
    img{
        height: 100%;
    }
`
const UserSelection = styled.div`
    padding: 1.2rem;
    height: 7.2rem;
    clear: both;
    border-bottom: 0.5px solid ${theme.color.N40};
`
const ProfileImageWrapper = styled.div`
    width: 4.8rem;
    height: 4.8rem;
    margin-right: 1.6rem;
    float: left;
    img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
        object-fit: cover;
    }
`

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 37.5rem;
    ::after
    {
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        top: 0;
        width: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 87.47%, rgba(0, 0, 0, 0.2) 104.4%), linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(217, 217, 217, 0) 100%);
    }
`
const Img = styled.img`
  width: 100%;
  object-fit: cover;
`
export default GoodsDetailCard