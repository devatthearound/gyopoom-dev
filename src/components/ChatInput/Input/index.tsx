import InputElements from "@dto/input.elements"
import { theme } from "@styles/theme"
import { forwardRef } from "react"
import styled from "styled-components"

type Props = {
    elements: InputElements
    onChange: React.Dispatch<React.SetStateAction<InputElements>>
    onKeyUpEvent: (e: React.KeyboardEvent<HTMLInputElement>) => void
}


const Input = forwardRef<any, Props>(({ elements, onChange, onKeyUpEvent }: Props, ref) => {
    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = e.target
        onChange({ ...elements, invalid: !elements.regex.test(e.target.value), value: value })
    }

    return (
        <StyledInput
            ref={ref}
            name={elements.name}
            type={elements.type}
            placeholder={elements.placeholder}
            required={elements.require}
            autoComplete="off"
            value={elements.value}
            disabled={elements.disabled}
            defaultValue={elements.defaultValue}
            onChange={handlerOnChange}
            onKeyUp={onKeyUpEvent} />
    )
})

const StyledInput = styled.input`
    width: 100%;
    height:100%;
    padding: 0.6rem 1.2rem;
    border-radius: 19rem;
    background-color: ${theme.color.N0};
    border: none;
    //font Setting
    font-size: ${theme.fontSize.H50};
    font-weight: ${theme.fontWeight.Regular};
    letter-spacing: ${theme.letterSpacing.normal}px;
    line-height:  ${theme.lineHeight.normal};
    color: ${theme.color.N900};

    ::placeholder{
        color:  ${theme.color.N50};
    }
`

export default Input;