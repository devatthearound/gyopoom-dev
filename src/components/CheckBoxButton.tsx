import Typography from "@components/Typograpy";
import InputRadioElements from "@dto/input.radio.elements";
import { theme } from "@styles/theme";
import styled from "styled-components";
import checkIcon from "@images/icons/check.svg"

interface Props extends ColorStyleProps {
    elements: InputRadioElements
    onChange: (id: string) => void
}

type ColorStyleProps = {
    defaultBgColor: string,
    defaultTtColor: string,
    activedBgColor: string,
    activedTtColor: string,
}

const CheckBoxButton = ({ elements, onChange, defaultBgColor, defaultTtColor, activedBgColor, activedTtColor }: Props) => {
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
                <Typography.P200
                    color={theme.color.N50}>
                    {elements.label}
                </Typography.P200>
            </Label>
        </Container>
    ) 
}

const RadioButton = styled.input<ColorStyleProps>`
    display: none;

    ~ label::before{
        content: "";
        background: url(${checkIcon}) no-repeat;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        filter:${(props => props.defaultBgColor)};
    }
 
    :checked ~ label::before{
        content: "";
        background: url(${checkIcon}) no-repeat;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        filter:${(props => props.activedBgColor)};
    }

    :checked ~ label h1{
        color: ${(props => props.activedTtColor)} !important;
    }
    label h1{
        color: ${(props => props.defaultTtColor)};
    }
`;

const Label = styled.label`
    position: relative;
    width: 100%;
    padding: 0.6rem 0 0.6rem 2.6rem;
    color: ${theme.color.N50};
    transition: 0.1s;
    cursor: pointer;
`
const Container = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0.2rem;
`;

export default CheckBoxButton;