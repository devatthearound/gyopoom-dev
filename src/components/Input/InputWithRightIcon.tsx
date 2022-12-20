import { theme } from "@styles/theme"
import styled from "styled-components"
import InputElements from "@dto/input.elements"
import Typography from "@components/Typograpy"
import Flex from "@components/Flex"


type Props = {
    style?: React.CSSProperties
    icon?: string
    mainColor: string
    subColor: string
    elements: InputElements
    onChange: React.Dispatch<React.SetStateAction<InputElements>>
}

const InputWithRightIcon = ({ icon, elements, mainColor, subColor, onChange }: Props) => {
    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = e.target
        onChange({ ...elements, invalid: !elements.regex.test(e.target.value), value: value })
    }


    return (
        <Flex style={{ width: "100%", flexDirection: "column", gap: "5px" }}>
            {elements.label && <Label color={theme.color.N300}>{elements.label}</Label>}
            <Input
                icon={icon}
                mainColor={mainColor}
                subColor={subColor}
                name={elements.name}
                type={elements.type}
                placeholder={elements.placeholder}
                required={elements.require}
                autoComplete="off"
                invalid={elements.invalid}
                value={elements.value}
                disabled={elements.disabled}
                defaultValue={elements.defaultValue}
                onChange={handlerOnChange} />
        </Flex>
    )

}

const Label = styled(Typography.P100M)`
    display: block;
`


const Input = styled.input<{ invalid: boolean, icon?: string, mainColor: string, subColor: string }>`
    display: block;
    width:100%;
    margin-top: 0.4rem;
    padding: 1.3rem 1rem;
    border-radius: 0.8rem;
    font-size: ${theme.fontSize.H50};
    color:${(props => props.mainColor)};
    border:1px solid ${(props => props.subColor)};

    background: ${(props) => props.icon ? `url(${props.icon}) no-repeat right / 2.4rem 2.4rem` : "none"};
    background-position: 96%;
    ::placeholder{
        color:${(props => props.mainColor)};
    }
    :hover{
       border: 1px solid ${(props => props.mainColor)};
    }
    :focus {
        border: ${(props) => props.invalid ? `1px solid  ${props.mainColor}` : `1px solid ${props.subColor}`}
    }
    :focus~ span {
        display: ${(props) => props.invalid ? "block" : `none`}
    }
`


export default InputWithRightIcon