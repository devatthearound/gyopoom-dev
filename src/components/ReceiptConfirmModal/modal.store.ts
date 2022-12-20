import ConfireModalDTO from "@dto/confirm-modal.dto";
import create from "zustand"

type Props = {
    isConfirmModalOpen: ConfireModalDTO,
    setIsConfirmModalOpen: (value: ConfireModalDTO) => void
}

const useModalStore = create<Props>((set) => ({
    isConfirmModalOpen: {} as ConfireModalDTO,
    setIsConfirmModalOpen: (value: ConfireModalDTO) => {
        set((x) => ({ isConfirmModalOpen: value }))
    }
}));

export default useModalStore