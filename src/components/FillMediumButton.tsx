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
    height?: string
}

const FillMediumButton: React.FC<Props> = ({ id, label, handleOnClick, disabled, loading, ...style }) => {
    return (
        <Button
            id={id}
            onClick={handleOnClick}
            disabled={disabled}
            {...style}>
            {
                loading ?
                    <Loading width="2rem" height="2rem" />
                    : <Typography.P100B color={theme.color.N0}>{label}</Typography.P100B>
            }
        </Button>
    )
}

const Button = styled.button<ButtonStyle>`
    width:${({ width }) => width};
    height:${(props) => props.height ? props.height: ""};
    padding:${({ padding }) => padding};
    border: 0;
    border-radius: 0.8rem;
    text-align: center;
    transition: 0.2s;
    background-color: ${({ defaultBgColor }) => defaultBgColor};
    cursor: pointer;

    h1{color: ${({ defaultTtColor }) => defaultTtColor}}

    :hover, :focus{
        background-color:${({ activedBgColor }) => activedBgColor};
        h1{ color: ${({ activedTtColor }) => activedTtColor}}
    }

    :disabled{
        cursor: not-allowed;
        background-color:${({ disabledBgColor }) => disabledBgColor};
        h1{color: ${({ disabledTtColor }) => disabledTtColor}}
    }
`

export default FillMediumButton