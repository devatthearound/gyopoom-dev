type CreateUserDTO = {
    name: string
    phoneNumber: string
    profileUrl: string
    agreements: {
        id: string
        isAgreement: boolean
    }[]

}

export default CreateUserDTO