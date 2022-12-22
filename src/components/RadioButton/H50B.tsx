import Typography from "@components/Typograpy";
import InputRadioElements from "@dto/input.radio.elements";
import { theme } from "@styles/theme";
import styled from "styled-components";
import radioButtonUncheckedIcon from "@images/icons/radio_button_unchecked.svg"
import radioButtonCheckedIcon from "@images/icons/radio_button_checked.svg"

interface Props extends ColorStyleProps {
    elements: InputRadioElements
    onChange: (id: string) => void,
}

type ColorStyleProps = {
    defaultBgColor: string,
    defaultTtColor: string,
    activedBgColor: string,
    activedTtColor: string,
}
const RadioH50BButton: React.FC<Props> = ({ elements, defaultBgColor, defaultTtColor, activedBgColor, activedTtColor, onChange }) => {

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
                defaultBgColor={defaultBgColor}
                activedBgColor={activedBgColor}
                defaultTtColor={defaultTtColor}
                activedTtColor={activedTtColor}
                onChange={handlerOnChange} />
            <Label htmlFor={elements.value}>
                <Typography.H50B>
                    {elements.label}
                </Typography.H50B>
            </Label>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`;

const RadioButton = styled.input<ColorStyleProps>`
    display: none;

    ~ label::before{
        content: "";
        background: url(${radioButtonUncheckedIcon}) no-repeat left center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        filter:${(props => props.defaultBgColor)} !important;
    }
 
    :checked ~ label::before{
        content: "";
        background: url(${radioButtonCheckedIcon}) no-repeat left center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        filter:${(props => props.activedBgColor)} !important;
    }

    :checked ~ label h1{
        color: ${(props => props.activedTtColor)} !important;
    }
    label h1{
        color: ${(props => props.defaultTtColor)} !important;
    }
`;

const Label = styled.label`
    position: relative;
    width: 100%;
    padding: 0.6rem 0 0.6rem 3rem;
    transition: 0.1s;
    cursor: pointer;
`

export default RadioH50BButton