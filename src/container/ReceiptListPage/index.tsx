import styled from "styled-components";
import { theme } from "@styles/theme";
import { useEffect, useRef, useState } from "react";
import { isSuccess } from "@utils/options";
import { useInfiniteQuery } from "react-query";
import Loading from "@components/Loading";
import HeaderNavigation from "./HeaderNavigation";
import UserGoodsReceiptMiddleware from "@middleware/user-goods-receipt.middleware";
import ReceiptCard from "./ReceiptCard";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import WithGuttersFourSidesLayoutForScroll from "@components/Layout/WithGuttersFourSidesLayoutForScroll";
import BasicRadioButton from "@components/RadioButton/basic";

const ReceiptPage = () => {
    const userGoodsReceiptMiddleware = new UserGoodsReceiptMiddleware();
    const [checkInput, setCheckInput] = useState<boolean>(false);
    const [currentFilter, setCurrentFilter] = useState<string>("all");
    const target = useRef<any>(null);

    const OFFSET = 0

    const fetchRecipts = async ({ pageParam = OFFSET }) => {
        const res = await userGoodsReceiptMiddleware.getReceiptList(currentFilter, 5, pageParam);
        if (isSuccess(res)) {
            return {
                data: res.data.items,
                cursor: res.data.cursor
            }
        };
    };

    useEffect(() => {
        if (checkInput) {
            setCurrentFilter("done")
        } else {
            setCurrentFilter("all")
        }
    }, [checkInput])

    const { data, isLoading, error, fetchNextPage } = useInfiniteQuery(["receiptList", currentFilter], fetchRecipts, {
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

    return (
        <WithNoGuttersTopAndBottomLayout bg={theme.color.N20}>
            <HeaderNavigation />
            <ButtonWrap>
                <BasicRadioButton
                    elements={{
                        name: "all",
                        type: "checkbox",
                        label: "삭제된 거래 제외",
                        value: "done"
                    }}
                    checkColor={theme.color.N900A}
                    unCheckColor={theme.color.N900A}
                    onChange={() => setCheckInput(!checkInput)} />
            </ButtonWrap>
            <WithGuttersFourSidesLayoutForScroll bg={theme.color.N20}>
                {
                    isLoading ? <Loading width="2rem" height="2rem" /> :
                        <ListCard>
                            {
                                data && data?.pages?.map((page: any, key: number) => (
                                    page?.data?.map((item: any, key: number) => (
                                        <li key={key} ref={target}>
                                            <ReceiptCard item={item} />
                                        </li>
                                    ))
                                ))
                            }
                        </ListCard>
                }
            </WithGuttersFourSidesLayoutForScroll>
        </WithNoGuttersTopAndBottomLayout>
    )
}

const ButtonWrap = styled.div`
    padding: 1.2rem 0 0 2rem ;
`

const ListCard = styled.ul`
    li:not(:first-child) {
        margin-top: 1.4rem;
    }
`
export default ReceiptPage