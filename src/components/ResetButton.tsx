import styled from "styled-components"
import { theme } from "@styles/theme"
import Loading from "./Loading"

type Props = {
    // id?: string,
    handleOnClick: (e: any) => void,
    disabled?: boolean,
    isLoading?: boolean
    children: React.ReactNode
}

const ResetButton: React.FC<Props> = ({ handleOnClick, children, disabled, isLoading, ...others }) => {
    return (
        <StyledButton onClick={handleOnClick} disabled={disabled}>
            {
                isLoading ?
                    <Loading width="2rem" height="2rem" />
                    : children
            }
        </StyledButton>
    )
}

const StyledButton = styled.button`
    border: 0px;
    cursor: pointer;
    background: none;
`

export default ResetButton