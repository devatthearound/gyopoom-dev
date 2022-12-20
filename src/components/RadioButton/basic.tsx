import Typography from "@components/Typograpy";
import InputRadioElements from "@dto/input.radio.elements";
import { theme } from "@styles/theme";
import styled from "styled-components";
import radioButtonUncheckedIcon from "@images/icons/radio_button_unchecked.svg"
import radioButtonCheckedIcon from "@images/icons/radio_button_checked.svg"

type Props = {
    elements: InputRadioElements
    checkColor: string,
    unCheckColor: string,
    onChange: (id: string) => void
}

const BasicRadioButton: React.FC<Props> = ({ elements, checkColor, unCheckColor, onChange }) => {

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
                checkColor={checkColor}
                onChange={handlerOnChange} />
            <Label htmlFor={elements.value}>
                <Typography.P200
                    color={unCheckColor}>
                    {elements.label}
                </Typography.P200>
            </Label>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`;

const RadioButton = styled.input<{checkColor: string, }>`
    display: none;

    ~ label::before{
        content: "";
        background: url(${radioButtonUncheckedIcon}) no-repeat left center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
 
    :checked ~ label::before{
        content: "";
        background: url(${radioButtonCheckedIcon}) no-repeat left center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    :checked ~ label h1{
        color: ${(props => props.checkColor)} !important;
    }
`;

const Label = styled.label`
    position: relative;
    width: 100%;
    padding: 0.6rem 0 0.6rem 3rem;
    transition: 0.1s;
    cursor: pointer;
`

export default BasicRadioButton