import create from "zustand"


type Props = {
    scrollPosition: number,
    setScrollPosition: (x: number) => void
}

const useNoticeStore = create<Props>((set) => ({
    scrollPosition: 0,
    setScrollPosition: (x: number) => {
        set((state) => ({ scrollPosition: x }))
    }
}));

export default useNoticeStore