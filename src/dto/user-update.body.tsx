
type UpdateUserDto = Partial<{
    name: string
    phoneNumber: string
    profile: string
    email: string
    password: string
}>;

export default UpdateUserDto