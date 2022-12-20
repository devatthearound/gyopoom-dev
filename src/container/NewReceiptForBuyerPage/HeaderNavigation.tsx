import LabelOnTheCenterAndBothActionButtons from "@components/HeaderNavigation/LabelOnTheCenterAndBothActionButtons"
import { useNavigate } from "react-router-dom"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"

type Props = {
    label: string
}
const HeaderNavigation: React.FC<Props> = ({ label }) => {
    const navigate = useNavigate();
    const Actions = [
        {
            event: () => navigate(-1),
            iconType: BackIcon
        }
    ]


    return (
        <LabelOnTheCenterAndBothActionButtons
            label={label}
            leftActions={Actions} />
    )
}

export default HeaderNavigation;