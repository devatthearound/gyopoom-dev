import Typography from "@components/Typograpy";
import InputRadioElements from "@dto/input.radio.elements";
import { theme } from "@styles/theme";
import styled from "styled-components";


type Props = {
    elements: InputRadioElements
    onChange: React.Dispatch<React.SetStateAction<string>>
}

const RadioSquareButton = ({ elements, onChange }: Props) => {
    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement
        onChange(value)
    }

    return (
        <Container>
            <RadioButton
                id={elements.value}
                type={elements.type}
                name={elements.name}
                value={elements.value}
                checked={elements.checked}
                onChange={handlerOnChange}/>
            <Label htmlFor={elements.value}>
                <Typography.P200
                    color={theme.color.N50}>
                    {elements.label}
                </Typography.P200>
            </Label>
        </Container>
    )
}

const RadioButton = styled.input`
    display: none;

    :checked ~ label{
        border: 1px solid ${theme.color.B300};
    }

    :checked ~ label h1{
        color: ${theme.color.B300} !important;
    }
`;

const Label = styled.label`
    width: 100%;
    padding: 0.6rem 0;
    border: 1px solid ${theme.color.N50};
    color: ${theme.color.N50};
    border-radius: 0.8rem;
    text-align: center;
    transition: 0.1s;
    cursor: pointer;
`
const Container = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0.2rem;
`;

export default RadioSquareButton;