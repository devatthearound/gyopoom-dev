type InputConfireModalDTO = {
    title: string
    isOpen: boolean,
    icon?: string,
    label?: string,
    cancelButton?: {
        handleOnClick: () => void,
        bgColor: string,
        textColor: string,
        width: number,
        label: string
    }
    confirmButton: {
        handleOnClick: (value: any) => void,
        bgColor: string,
        textColor: string,
        width: number,
        label: string
    }
}

export default InputConfireModalDTO