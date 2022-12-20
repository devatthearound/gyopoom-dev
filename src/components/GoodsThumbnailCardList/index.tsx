import Loading from "@components/Loading"
import GoodsThumbnailCard from "@components/GoodsThumbnailCard"
import { isSuccess } from "@utils/options"
import { forwardRef, useEffect, useRef } from "react"

import GoodsMiddleware from "@middleware/goods.middleware"
import { useInfiniteQuery } from "react-query"
import styled from "styled-components"
import HomeTopSlider from "@components/GoodsTopSlider"
import useGoodsStore from "@store/goods"
import { useChangeScrollTop } from "@hooks/useChangeScrollTop"


const GoodsThumbnailCardList = (() => {
    const goodsMiddleware = new GoodsMiddleware();
    const { scrollPosition, setScrollPosition } = useGoodsStore()
    const { scrollRef } = useChangeScrollTop(scrollPosition, setScrollPosition);

    const target = useRef<any>(null);
    const OFFSET = 0

    const fetchGoods = async ({ pageParam = OFFSET }) => {
        const res = await goodsMiddleware.getThumbnailList(5, pageParam);
        if (isSuccess(res)) {
            return {
                data: res.data.items,
                nextCursor: res.data.nextCursor
            }
        };
    };

    const { data, isLoading, error, fetchNextPage } = useInfiniteQuery("mainGoodsList", fetchGoods, {
        getNextPageParam: (lastPage) => {
            if (lastPage?.data && lastPage?.data.length > 0) {
                return lastPage?.nextCursor;
            }
        }
    });

    useEffect(() => {
        let observer: IntersectionObserver;
        if (target.current) {
            observer = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
                if (entry.isIntersecting) {
                    fetchNextPage()
                }
            },
                {
                    root: null,
                    threshold: 0,
                });
            observer.observe(target.current);
        }
        // 메모리 해제 작업
        return () => {
            observer && observer.disconnect();
        };
    }, [data, fetchNextPage]);

    if (error) {
        return <div>Error...</div>
    }

    if (isLoading) {
        return <Loading width="2rem" height="2rem" />
    }

    return (
        <Container ref={scrollRef}>
            <HomeTopSlider />
            {
                !isLoading && data && data?.pages.map((page: any, key: number) => (
                    page?.data.map((item: any, key: number) => (
                        <div key={key} ref={target}>
                            <GoodsThumbnailCard goods={item} />
                        </div>
                    ))
                ))
            }
        </Container>
    )
})

const Container = styled.div`
    height:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`

export default GoodsThumbnailCardList