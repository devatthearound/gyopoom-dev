import InputElements from "@dto/input.elements";
import RoomDTO from "@dto/room.dto";
import TermsDTO from "@dto/terms.dto";
import { defaultName, defaultPhoneNumber, defaultProfile } from "@utils/create-user.input";
import create from "zustand"

type Props = {
    phoneNumber: InputElements
    setPhoneNumber: (value: InputElements) => void
    name: InputElements
    setName: (value: InputElements) => void
    profile: InputElements
    setProfile: (value: InputElements) => void
    checkList: TermsDTO[],
    setCheckList: (value: TermsDTO[]) => void
}

const useRegisterStore = create<Props>((set) => ({
    phoneNumber: defaultPhoneNumber,
    setPhoneNumber: (value: InputElements) => {
        set((state) => ({
            phoneNumber: value
        }));
    },
    name: defaultName,
    setName: (value: InputElements) => {
        set((state) => ({
            name: value
        }));
    },
    profile: defaultProfile,
    setProfile: (value: InputElements) => {
        set((state) => ({
            profile: value
        }));
    },
    checkList: [],
    setCheckList: (value: TermsDTO[]) => {
        set((state) => ({
            checkList: value
        }));
    }
}));

export default useRegisterStore