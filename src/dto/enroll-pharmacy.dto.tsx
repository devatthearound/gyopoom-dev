type EnrollPharmacyDTO = {
    pharmacy: {
        id: string
    },
    user: {
        id: string,
        name: string,
        role: string,
        isAccepted: boolean
    }
}


export default EnrollPharmacyDTO