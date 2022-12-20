import { useRef, useEffect } from 'react';


export const useChangeScrollTop = (scrollPosition: number, setScrollPosition: (x: number) => void) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            const setGoodsScrollPosition = () => {
                if (scrollRef.current) {
                    setScrollPosition(scrollRef.current.scrollTop);
                }
            }

            scrollRef.current.scrollTop = scrollPosition;
            scrollRef.current.addEventListener("scroll", setGoodsScrollPosition);

            return () => (scrollRef.current)?.removeEventListener("scroll", setGoodsScrollPosition);
        }
    }, [scrollRef.current])


    return { scrollRef };
}