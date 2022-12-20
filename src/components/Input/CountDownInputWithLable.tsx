import InputElements from "@dto/input.elements";
import styled from "styled-components"
import { theme } from "@styles/theme";

type Props = {
    style?: React.CSSProperties
    elements: InputElements
    onChange: React.Dispatch<React.SetStateAction<InputElements>>
    minutes: number,
    seconds: number,

}

const CountDownInputWithLable: React.FC<Props> = ({ style, elements, onChange, minutes, seconds }) => {
    const onChangeWithVaildation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        onChange({
            ...elements,
            invalid: !elements.regex.test(value),
            value: value
        })
    }

    return (
        <Wrapper style={style}>
            <InputCard invalid={elements.invalid}>
                <Input
                    name={elements.name}
                    type={elements.type}
                    placeholder={elements.placeholder}
                    value={elements.value}
                    onChange={onChangeWithVaildation}
                    required={elements.require}
                    autoComplete="off"
                    disabled={elements.disabled}
                />
                <Time>{minutes} : {seconds == 0 ? "00" : seconds}</Time>
            </InputCard>
            {elements.errormessage && <Span>{elements.errormessage}</Span>}
        </Wrapper>
    )
}

const Time = styled.span`
    font-size: 1.1rem;
    color: ${theme.color.N200};
`

const Wrapper = styled.div`
    position: relative;
    width:100%;
    flex: 1;
`

const InputCard = styled.div<{ invalid: boolean }>`
    display: flex;
    width: 100%;
    height: 4.8rem;
    align-items: center;
    padding: 1.3rem 1rem;
    border-radius: 0.8rem;
    border: 1px solid ${theme.color.N40};
    font-size: ${theme.fontSize.H50};
    color:  ${theme.color.N900};
    transition: 0.2s;

    ::placeholder{
        color: ${theme.color.N400};
    }
    :hover{
        border: 1px solid ${theme.color.B300};
    }
    :focus {
        border: 1px solid ${theme.color.B300};
    }
    :disabled{
        border: 0px;
        color: ${theme.color.N50}
    }
    /* :focus ~ span {
        display: ${(props) => props.invalid ? "block" : `none`}
    } */
`

const Input = styled.input`
    width: 100%;
    border: 0px;
    flex: 1;
    line-height: 1;
`

const Span = styled.span`
    font-size: ${theme.fontSize.P50};
    padding: 8px;
    color: ${theme.color.BP500};
    display: none;
    line-height: 1;

    input:focus {
        transition: 0.2s;
        transform: display;
    }
`
export default CountDownInputWithLable