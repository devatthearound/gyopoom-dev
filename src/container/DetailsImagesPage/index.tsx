import DefaultPageTransition from "@components/animation/DefaultPageTransition";
import HeaderNavigation from "./HeaderNavigation";
import GoodsMiddleware from "@middleware/goods.middleware";
import { isSuccess } from "@utils/options";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components";

const GoodsImagePage = () => {
    const { goodsId } = useParams();
    const goodsMiddleware = new GoodsMiddleware();
    const navigate = useNavigate();

    const getGoods = async () => {
        if (goodsId) {
            const apiRes = await goodsMiddleware.getGoodsById(goodsId);
            if (isSuccess(apiRes)) return apiRes.data;
        }
    };


    const { isLoading, data } = useQuery('goods', getGoods);

    return (
        <DefaultPageTransition>
            <Wrapper>
                <HeaderNavigation prevAction={() => navigate(-1)} />
                {!isLoading && data ?
                    <Img src={data.imageUrls[0].file} alt="약사진" />
                    : null}
            </Wrapper>
        </DefaultPageTransition>
    )

}


const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: black;
`

const Img = styled.img`
  width: 85%;
  height: auto;
`

export default GoodsImagePage