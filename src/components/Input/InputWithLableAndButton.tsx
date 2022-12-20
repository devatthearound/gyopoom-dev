
import InputElements from "@dto/input.elements";
import styled from "styled-components"
import { theme } from "@styles/theme";
import Typography from "@components/Typograpy";
import ErrorIcon from "@images/icons/input-error.svg"
import Flex from "@components/Flex";
import FillButton from "@components/FillButton";
import { style4 } from "@utils/theme/button/style4";

type Props = {
    style?: React.CSSProperties
    elements: InputElements
    onChange: React.Dispatch<React.SetStateAction<InputElements>>
    handleOnClick: () => void
    buttonTitle: string
}

const InputWithLableAndButton: React.FC<Props> = ({ style, elements, onChange, handleOnClick, buttonTitle }) => {
    const onChangeWithVaildation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        onChange({
            ...elements,
            invalid: !elements.regex.test(value),
            value: value
        })
    }

    return (
        <>
            <Typography.P100M
                style={{ marginTop: "4.6rem" }}
                color={theme.color.N300}>
                {elements.label}
            </Typography.P100M>
            <Flex style={{ gap: "0.7rem", marginTop: "0.4rem" }}>
                <InputWrapper >
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
                </InputWrapper>
                <FillButton
                    id="resend-button"
                    label={buttonTitle}
                    handleOnClick={handleOnClick}
                    disabled={elements.invalid}
                    height="4.8rem"
                    {...style4} />
            </Flex>
            {elements.errormessage && <Span>{elements.errormessage}</Span>}
        </>
    )
}

const InputWrapper = styled.div`
    position: relative;
    width:100%;
    flex:1 ;
`

const Input = styled.input<{ invalid: boolean }>`
    display: block;
    width: 100%;
    height: 100%;
    padding: 1.3rem 1rem;
    border-radius: 0.8rem;
    border: 1px solid ${theme.color.N40};
    font-size: ${theme.fontSize.H50};
    color:  ${theme.color.N900};
    transition: 0.2s;
    ::placeholder{
        color: ${theme.color.N50};
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
export default InputWithLableAndButton