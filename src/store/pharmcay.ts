import create from "zustand"

type Props = {
    storeBusnessNumber: null | number,
    storePharmacyName: string
    storePharmacyAddress: string,
    setStoreBusnessNumber: (x: null | number) => void,
    setStorePharmacyName: (x: string) => void,
    setStorePharmacyAddress: (x: string) => void,
}

const usePharmacyStore = create<Props>((set) => ({
    storeBusnessNumber: null,
    storePharmacyName: "",
    storePharmacyAddress: "",
    setStoreBusnessNumber: (x: null | number) => {
        set((state) => ({ storeBusnessNumber: x }))
    },
    setStorePharmacyName: (x: string) => {
        set((state) => ({ storePharmacyName: x }))
    },
    setStorePharmacyAddress: (x: string) => {
        set((state) => ({ storePharmacyAddress: x }))
    },
}));

export default usePharmacyStore