import Typography from "@components/Typograpy";
import InputRadioElements from "@dto/input.radio.elements";
import { theme } from "@styles/theme";
import styled from "styled-components";
import checkIcon from "@images/icons/check.svg"
import Flex from "@components/Flex";

type Props = {
    elements: InputRadioElements
    onChange: (checked: boolean) => void
}

const PharmacyCheckBoxButton = ({ elements, onChange }: Props) => {
    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target as HTMLInputElement
        onChange(checked)
    }
    return (
        <Flex style={{ width: "100%", alignItems: "center"}}>
            <RadioButton
                id={elements.value}
                type={elements.type}
                name={elements.name}
                value={elements.value}
                onChange={handlerOnChange} />
                <Label htmlFor={elements.value}>
                    <Typography.P200
                        className="noselect"
                        color={theme.color.N900}>
                        {elements.label}
                    </Typography.P200>
                </Label>
        </Flex>
    )
}

const RadioButton = styled.input`
    display: none;

    ~ label::before{
        content: "";
        background: url(${checkIcon}) no-repeat right;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: ${theme.svgColor.N80};
    }
 
    :checked ~ label::before {
        content: "";
        background: url(${checkIcon}) no-repeat right;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: ${theme.svgColor.B300};
    }

    :checked ~label{
        border-bottom: 1px solid ${theme.color.B300};
    }
`;

const Label = styled.label`
    position: relative;
    width: 100%;
    color: ${theme.color.N50};
    transition: 0.1s;
    cursor: pointer;
    padding: 2rem 0;
    border-bottom: 1px solid ${theme.color.N40};
`


export default PharmacyCheckBoxButton;