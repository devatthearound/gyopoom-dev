type EnrollPharmacyCurrentDTO = {
    pharmacy: {
        id: string,
        name: string,
        address: string,
        businessNumber: string,
    },
    user: {
        id: string,
        name: string,
        role: string,
        isAccepted: boolean
    }
}


export default EnrollPharmacyCurrentDTO