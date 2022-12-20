import NoLabelAndBothActionButtons from "@components/HeaderNavigation/NoLabelAndBothActionButtons";
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import useStep from "./step.store";

const HeaderNavigation = () => {
    const { prevStep } = useStep();

    const ActionsButton = {
        event: () => prevStep(),
        iconType: BackIcon
    }


    return <NoLabelAndBothActionButtons leftActions={[ActionsButton]} />
}

export default HeaderNavigation