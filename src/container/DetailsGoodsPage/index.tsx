import { useNavigate, useParams } from "react-router-dom";
import NoLabelAndBothActionButtons from "@components/HeaderNavigation/NoLabelAndBothActionButtons";
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import Moment from 'react-moment';
import 'moment/locale/ko';
import GoodsMiddleware from "@middleware/goods.middleware";
import { isSuccess } from "@utils/options";
import styled from "styled-components";
import Typography from "@components/Typograpy";
import { theme } from "@styles/theme";
import Flex from "@components/Flex";
import StateTag from "@components/GoodsDetailCard/StateTag";
import GoodsBottomNavigation from "@components/GoodsDetailCard/BottomNavigation";
import { useQuery } from "react-query";
import RightPageTransition from "@components/animation/RightPageTransition";
import BottomSheetOfTabOnHidden from "@components/MyGoodsTabs/DraggableBottomSheet/BottomSheetOfTabOnHidden";
import { useState } from "react";
import MoreButton from "@components/MoreButton";
import { useGetUser } from "@context/AuthContext";
import { DeliveryMethod, DeliveryMethodKR } from "@utils/common-status-code";

const GoodsDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const goodsMiddleware = new GoodsMiddleware();
    const [isMoreClick, setIsMoreClick] = useState<boolean>(false);
    const { user } = useGetUser();


    const ActionsButton = {
        event: () => navigate(-1),
        iconType: BackIcon
    }

    const getGoods = async () => {
        if (id) {
            const apiRes = await goodsMiddleware.getGoodsById(id);
            if (isSuccess(apiRes)) return apiRes.data;
        }
    };

    const handleOnClickImage = () => {
        navigate(`/goods/${id}/image`)
    }

    const { isLoading, data, refetch } = useQuery(['goods', id], getGoods);

    return (
        <>
            {
                id && (
                    <RightPageTransition>
                        {
                            !isLoading && data ? (
                                <Wrapper>
                                    <ContextCard>
                                        <GoodsImages>
                                            <HeaderNavigationWrapper>
                                                <NoLabelAndBothActionButtons
                                                    bg="none"
                                                    leftActions={[ActionsButton]} />
                                            </HeaderNavigationWrapper>
                                            <ImageWrapper onClick={handleOnClickImage}>
                                                <Img src={data.imageUrls[0].file} alt="약사진" />
                                            </ImageWrapper>
                                            {
                                                user && user.id == data.author.id &&
                                                <MoreButton
                                                    color={theme.svgColor.N900}
                                                    onClick={() => setIsMoreClick(true)} />

                                            }
                                        </GoodsImages>
                                        <UserSelection>
                                            <ProfileImageWrapper>
                                                <Img src={data.author.profileUrl} alt="프로필 사진" />
                                            </ProfileImageWrapper>
                                            <Flex style={{ flexDirection: "column", justifyContent: "space-between" }}>
                                                <Typography.H50B>{data.author.name}</Typography.H50B>
                                                <Typography.P100
                                                    color={theme.color.N100}>
                                                    {data.author.area}
                                                </Typography.P100>
                                            </Flex>
                                        </UserSelection>
                                        <ContentSelection>
                                            <ContentHeader style={{ marginTop: "0.8rem" }}>
                                                <StateTag goods={data} style={{
                                                    marginRight: "0.4rem"
                                                }} />
                                                <Typography.H100B >
                                                    {data.title}
                                                </Typography.H100B>
                                            </ContentHeader>
                                            <Typography.P100 color={theme.color.N200} style={{ marginTop: "0.4rem" }}>
                                                <Moment fromNow ago>{data.updateAt}</Moment><span>전</span>
                                            </Typography.P100>
                                            <ContentBody>
                                                <Typography.H50 >
                                                    {data.title}
                                                </Typography.H50>
                                                <Typography.H50 >
                                                    {data.quantity}개
                                                </Typography.H50>
                                                <Typography.H50 >
                                                    {data.deliveryMethod == DeliveryMethod.MEET ? DeliveryMethodKR.MEET : DeliveryMethodKR.PARCEL}
                                                </Typography.H50>
                                                {
                                                    data.exchangeGoods && <Typography.H50>"{data.exchangeGoods}" 제품으로 맞교환 원합니다. </Typography.H50>
                                                }
                                                <TextArea>
                                                    {data.content}
                                                </TextArea>
                                            </ContentBody>
                                        </ContentSelection>
                                    </ContextCard>
                                    <GoodsBottomNavigation goods={data} />
                                    <BottomSheetOfTabOnHidden
                                        id={id}
                                        isMoreClick={isMoreClick}
                                        setIsMoreClick={setIsMoreClick}
                                        refetch={refetch} />
                                </Wrapper>
                            ) : null
                        }
                    </RightPageTransition>
                )
            }
        </>
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
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`

const TextArea = styled.pre`
    width: 100%;
    color: ${theme.color.N900};
    resize: none;
    border: 0px;
    font-size: ${theme.fontSize.H50};
    font-weight: ${theme.fontWeight.Regular};
    letter-spacing: ${theme.letterSpacing.normal}px;
    line-height:  ${theme.lineHeight.normal};
    color: ${theme.color.N500};
    ::placeholder{
        color: ${theme.color.N50};
    }
`

const ContentHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`
const ContentBody = styled.div`
    margin-top: 2rem;
`
const ContentSelection = styled.div`
    padding: 1.2rem;
`
const GoodsImages = styled.div`
    position: relative;
    img{
        height: 100%;
    }
`
const UserSelection = styled.div`
    display: flex;
    padding: 1.2rem;
    height: 7.2rem;
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

const HeaderNavigationWrapper = styled.div`
    position: absolute;
    top:0;
    left:0;
    background: none;
    z-index: 1;
`

export default GoodsDetailPage