import ScrollUpAndDownBox from "@components/animation/DraggableBottomSheetWithHeader";

type Props = {
    isMoreClick: boolean
    setIsMoreClick: (value: boolean) => void
    children: React.ReactNode[];
}

const BottomSheetWrapper: React.FC<Props> = ({ isMoreClick, setIsMoreClick, children }) => {

    const stateChange = (state: boolean) => {
        setIsMoreClick(state)
    }

    return (
        <ScrollUpAndDownBox isOpen={isMoreClick} stateChange={stateChange}>
            <ul style={{ width: "100% " }}>
                {...children}
            </ul>
        </ScrollUpAndDownBox>
    )
}


export default BottomSheetWrapper