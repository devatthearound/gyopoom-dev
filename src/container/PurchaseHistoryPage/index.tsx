import styled from "styled-components";
import { theme } from "@styles/theme";
import { useEffect, useRef } from "react";
import { isSuccess } from "@utils/options";
import { useInfiniteQuery } from "react-query";
import GoodsOnBuyCard from "@components/MyGoodsTabs/GoodsCards/GoodsOnBuyCard";
import Loading from "@components/Loading";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import HeaderNavigation from "./HeaderNavigation";
import UserGoodsReceiptMiddleware from "@middleware/user-goods-receipt.middleware";

const PurchaseHistoryPage = () => {
    const userGoodsReceiptMiddleware = new UserGoodsReceiptMiddleware();
    const target = useRef<any>(null);

    const OFFSET = 0

    const fetchGoodsOfReceiptList = async ({ pageParam = OFFSET }) => {
        const res = await userGoodsReceiptMiddleware.getGoodsList(5, pageParam);
        if (isSuccess(res)) {
            return {
                data: res.data.items,
                cursor: res.data.nextCursor
            }
        };
    };

    const { data, isLoading, error, fetchNextPage } = useInfiniteQuery(["goodsOfReceipt", "done"], fetchGoodsOfReceiptList, {
        staleTime:0,
        getNextPageParam: (lastPage) => {
            if (lastPage?.data && lastPage?.data.length > 0) {
                return lastPage?.cursor;
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
        <WithNoGuttersTopAndBottomLayout>
            <HeaderNavigation />
            <Container>
                {
                    !isLoading && data && data?.pages?.map((page: any, key: number) => (
                        page?.data?.map((item: any, key: number) => (
                            <div key={key} ref={target}>
                                <GoodsOnBuyCard item={item} key={key} />
                            </div>
                        ))
                    ))
                }
            </Container>
        </WithNoGuttersTopAndBottomLayout>
    )
}

const Container = styled.div`
    height:100%;
    overflow: scroll;
    background-color: ${theme.color.N20};
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`
export default PurchaseHistoryPage