import LabelOnTheCenterAndBothActionButtons from "@components/HeaderNavigation/LabelOnTheCenterAndBothActionButtons"
import { useNavigate } from "react-router-dom"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import MoreHoriz from "@images/icons/more_horiz.svg"
import useMoreStore from "./more.store"

type Props = {
    label: string
}

const HeaderNavigation: React.FC<Props> = ({ label }) => {
    const navigate = useNavigate();
    const { setChangeState } = useMoreStore();
    const LeftActions = [
        {
            event: () => navigate(-1),
            iconType: BackIcon
        }
    ]

    const RightActions = [
        {
            event: () => setChangeState(true),
            iconType: MoreHoriz
        }
    ]

    return (
        <LabelOnTheCenterAndBothActionButtons
            label={label}
            leftActions={LeftActions}
            rightActions={RightActions} />
    )
}

export default HeaderNavigation;