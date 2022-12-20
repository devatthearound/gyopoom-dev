type CreateUserDTO = {
    name: string
    phoneNumber: string
    profileUrl: string
    agreements: {
        code: string
        isAgreement: boolean
    }[]

}

export default CreateUserDTO