import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import styled from "styled-components"

type StateButtonProps = {
    label: string,
    onCilckAction: () => void,
    icon: string
}

const CardBottom: React.FC<StateButtonProps> = ({ label, onCilckAction }) => {
    return (
        <Button onClick={onCilckAction}>
            <Typography.P200
                color={theme.color.N900}>
                {label}
            </Typography.P200>
        </Button>
    )
}

const Button = styled.button`
    flex: 1;
    width: 100%;
    border: 0px;
    height: 4.9rem;
    background: none;
    cursor: pointer;
    :nth-child(1){
        border-right: 0.5px solid ${theme.color.N40};
    }
`

export default CardBottom;