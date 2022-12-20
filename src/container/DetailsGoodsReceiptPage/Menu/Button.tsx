import ResetButton from "@components/ResetButton"
import Typography from "@components/Typograpy";
import styled from "styled-components"

type MenuItemProps = {
    handleOnClick: () => void;
    label: string
    img: string
}

const MenuButton: React.FC<MenuItemProps> = ({ img, label, handleOnClick }) => {
    return (
        <ButtonWrap>
            <ResetButton handleOnClick={handleOnClick}>
                <img src={img} width="28px" height="28px" />
            </ResetButton>
            <Typography.P100 margin="0.2rem 0 0 0">{label}</Typography.P100>
        </ButtonWrap>
    )
}

const ButtonWrap = styled.div`
    display: inline-block;
    padding: 1rem 2rem;
`

export default MenuButton