
import InputElements from "@dto/input.elements";
import styled from "styled-components"
import { theme } from "@styles/theme";
import Typography from "@components/Typograpy";
import ErrorIcon from "@images/icons/input-error.svg"
type Props = {
    style?: React.CSSProperties
    elements: InputElements
    onChange: (name: string, value:string) => void
}

const InputWithLableDefault: React.FC<Props> = ({ style, elements, onChange }) => {
    const onChangeWithVaildation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        onChange(name, value)
    }


    return (
        <div style={style}>
            {elements.label && <Label color={theme.color.N300}>{elements.label}</Label>}
            <InputWrapper>
                <Input
                    name={elements.name}
                    type={elements.type}
                    placeholder={elements.placeholder}
                    value={elements.value}
                    onChange={onChangeWithVaildation}
                    required={elements.require}
                    autoComplete="off"
                    disabled={elements.disabled}
                    invalid={elements.invalid} />
                {elements.errormessage && <Span>{elements.errormessage}</Span>}
            </InputWrapper>
        </div>
    )
}



const Label = styled(Typography.P100M)`
    display: block;
`


const InputWrapper = styled.div`
    position: relative;
    margin-top: 0.6rem;
    width:100%;
`

const Input = styled.input<{ invalid: boolean }>`
    display: block;
    width: 100%;
    margin-top: 0.4rem;
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
    :focus ~ span {
        display: ${(props) => props.invalid ? "block" : `none`}
    }
`

const Span = styled.span`
    font-size: ${theme.fontSize.P50};
    padding: 8px 1.8rem;
    color: ${theme.color.BP500};
    display: none;
    background: url(${ErrorIcon}) no-repeat left;
    input:focus {
        transition: 0.2s;
    transform: display;
    }
`
export default InputWithLableDefault