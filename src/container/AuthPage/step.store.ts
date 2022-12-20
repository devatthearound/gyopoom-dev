import create from "zustand"

type Props = {
    currentIndex: number,
    nextStep: () => void,
    prevStep: () => void,
}

const useStep = create<Props>((set) => ({
    prevIndex: 0,
    currentIndex: 0,
    nextIndex: 1,
    nextStep: () => {
        set((state) => ({
            currentIndex: state.currentIndex + 1,
            nextIndex: state.currentIndex + 2,
            prevIndex: state.currentIndex,
        }));
    },
    prevStep: () => {
        set((state) => ({
            currentIndex: state.currentIndex > 0 ? state.currentIndex - 1 : 0,
            nextIndex: state.currentIndex,
            prevIndex: state.currentIndex > 1 ? state.currentIndex - 2 : 0,
        }));
    },
}));

export default useStep