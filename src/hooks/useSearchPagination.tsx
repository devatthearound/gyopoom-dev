import axios from 'axios';
import { useEffect, useState, useCallback } from "react";
import useGetErrorMessage from "@hooks/useGetErrorMessage";
import { errorRes } from '../utils/options';

// collectionName -> 컬렉션 이름,
// limitCount -> 총 몇개의 데이터를 끊어서 요청할건지, 
// target -> 교차 요소 (요소의 ref 전달) 

const useSearchPagination = (keyword: string, limitCount: number, target: React.MutableRefObject<any>) => {
  const [key, setKey] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [noMore, setNoMore] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const getFirstData = useCallback(async () => {
    const res = await axios.get(`http://54.180.10.194:4097/goods/search?query=${keyword}&limit=50&cursor=`)

    try {
      setLoading(true);
      setData(res.data.items);
      setKey(res.data.nextCursor);

    } catch (err: unknown) {
      return errorRes(useGetErrorMessage(err));
    }

    setLoading(false)
  }, [keyword, limitCount]);

  const loadMore = useCallback(async (loadCount: number) => {
    if(key && !noMore){
      const res = await axios.get(`http://54.180.10.194:4097/goods/search?query=${keyword}&limit=${loadCount}&cursor=${key}`)
      try {
        if (res.data.items.length <= 0) {
          setNoMore(true)
        } else {
          setKey(res.data.nextCursor)
          // 문서 저장
          setData([...data, ...res.data.items]);
        }
      } catch (err: unknown) {
        return errorRes(useGetErrorMessage(err));
      }
    }else{
      setNoMore(true)
    }
    
  }, [keyword, data, key])


  const onIntersect = useCallback(
    async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      // 만약에 지정한 요소가 화면에 보이거나 현재 데이터를 더 불러오는 상황이 아닐경우,
      // 기존 요소의 주시를 해체하고 추가로 3개의 문서를 더 불러오도록 설정
      if (entry.isIntersecting && !loadingMore) {
        observer.unobserve(entry.target);
        setLoadingMore(true);
        await loadMore(10);
        setLoadingMore(false);
      }
    },
    [loadMore, loadingMore]
  );

  // 처음 화면이 랜더링 되었을때 첫번째 페이지를 문서를 가져오도록 설정
  useEffect(() => {
    getFirstData();
  }, [getFirstData]);


  useEffect(() => {
    let observer: IntersectionObserver;
    if (target.current && !noMore) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0,
      });
      observer.observe(target.current);
    }
    // 메모리 해제 작업
    return () => {
      setLoading(false);
      setLoadingMore(false);
      observer && observer.disconnect();
    };
  }, [target, onIntersect, noMore]);

  return { data, loading, loadingMore, noMore };
};

export default useSearchPagination;