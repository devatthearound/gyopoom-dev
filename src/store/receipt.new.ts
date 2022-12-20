import create from "zustand"


type Props = {
    buyerId: string | null,
    setBuyerId: (id: string) => void
}

const useReceiptNewStore = create<Props>((set) => ({
    buyerId: null,
    setBuyerId: (id: string) => {
        set((state) => ({ buyerId: id }))
    }
}));

export default useReceiptNewStore