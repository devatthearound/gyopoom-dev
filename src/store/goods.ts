import create from "zustand"


type Props = {
    scrollPosition: number,
    setScrollPosition: (x: number) => void
}

const useGoodsStore = create<Props>((set) => ({
    scrollPosition: 0,
    setScrollPosition: (x: number) => {
        set((state) => ({ scrollPosition: x }))
    }
}));

export default useGoodsStore