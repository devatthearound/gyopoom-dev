import React from "react"
import styled from "styled-components"
import { theme } from "@styles/theme"
import Typography from "@components/Typograpy"
import Loading from "@components/Loading"

interface Props extends ButtonStyle {
    id: string,
    label: string,
    disabled: boolean,
    loading?: boolean
    handleOnClick: ((e: any) => Promise<void>) | ((e: any) => void),
}

type ButtonStyle = {
    defaultBgColor: string
    defaultTtColor: string
    disabledBgColor: string
    disabledTtColor: string
    activedBgColor: string
    activedTtColor: string
    padding: string
    width: string
}

const BoarderButton: React.FC<Props> = ({ id, label, handleOnClick, disabled, loading, ...style }) => {
    return (
        <Button
            id={id}
            onClick={handleOnClick}
            disabled={disabled}
            {...style}>
            {
                loading ?
                    <Loading width="2rem" height="2rem" />
                    : <Typography.H50M color={theme.color.N0}>{label}</Typography.H50M>
            }
        </Button>
    )
}

const Button = styled.button<ButtonStyle>`
    width:${({ width }) => width};
    padding:${({ padding }) => padding};
    border: 1px solid ${({ defaultBgColor }) => defaultBgColor};
    border-radius: 0.8rem;
    text-align: center;
    transition: 0.2s;
    background-color: ${theme.color.N0};   
    cursor: pointer;

    h1{color: ${({ defaultTtColor }) => defaultTtColor}}

    :hover, :focus{
        background-color:${({ activedBgColor }) => activedBgColor};
        border: 1px solid ${({ activedBgColor }) => activedBgColor};
        h1{ color: ${({ activedTtColor }) => activedTtColor}}
    }

    :disabled{
        cursor: not-allowed;
        border: 1px solid ${({ disabledBgColor }) => disabledBgColor};
        h1{color: ${({ disabledTtColor }) => disabledTtColor}}
    }
`

export default BoarderButton