import InputElements from "@dto/input.elements"
import { theme } from "@styles/theme"
import styled from "styled-components"

type Props = {
    style?: React.CSSProperties
    icon?: string
    elements: InputElements
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onChange: React.Dispatch<React.SetStateAction<InputElements>>
}

const InputNoLabel = ({ style, icon, elements, onChange, onBlur, onFocus }: Props) => {
    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = e.target
        onChange({ ...elements, invalid: !elements.regex.test(e.target.value), value: value })
    }


    return (
        <Input
            style={style}
            icon={icon}
            name={elements.name}
            type={elements.type}
            placeholder={elements.placeholder}
            required={elements.require}
            autoComplete="off"
            invalid={elements.invalid}
            value={elements.value}
            disabled={elements.disabled}
            defaultValue={elements.defaultValue}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={handlerOnChange} />
    )

}


const Input = styled.input<{ invalid: boolean, icon?: string }>`
    width:100%;
    font-size: ${theme.fontSize.H50};
    color: ${theme.color.N900};
    border:0px;
    background: ${(props) => props.icon ? `url(${props.icon}) no-repeat left / 2.4rem 2.4rem` : "none"};
    padding-left: ${(props) => props.icon && "2.4rem"};

    ::placeholder{
        color: ${theme.color.N50};
    }
    /* :hover{
       // border: 1px solid ${theme.color.BB200};
    }
    :focus {
        border: ${(props) => props.invalid ? `1px solid  ${theme.color.BP500}` : `1px solid ${theme.color.BB200}`}
    }
    :focus~ span {
        display: ${(props) => props.invalid ? "block" : `none`}
    } */
`

export default InputNoLabel;