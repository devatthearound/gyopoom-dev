import create from "zustand"

type Props = {
    state: boolean,
    setChangeState: (value: boolean) => void
}

const useMoreStore = create<Props>((set) => ({
    state: false,
    setChangeState: (value: boolean) => {
        set((x) => ({ state: value }))
    }
}));

export default useMoreStore