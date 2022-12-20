type ConfireModalDTO = {
    title: string
    isOpen: boolean,
    icon?: string,
    label?: string,
    children?: JSX.Element,
    cancelButton?: {
        handleOnClick: () => void,
        bgColor?: string,
        textColor?: string,
        width: number,
        label: string
    }
    confirmButton: {
        handleOnClick: () => void,
        bgColor?: string,
        textColor?: string,
        width: number,
        label: string
    }
}

export default ConfireModalDTO