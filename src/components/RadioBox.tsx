import Typography from "@components/Typograpy";
import InputElements from "@dto/input.elements";
import { theme } from "@styles/theme";
import styled from "styled-components";


type Props = {
    elements: InputElements
    onChange: React.Dispatch<React.SetStateAction<InputElements>>
}

const RadioBox = ({ elements, onChange }: Props) => {
    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target
        onChange({ ...elements, invalid: !elements.regex.test(e.target.value), value: checked })
    }

    return (
        <>
            <Container>
                <RadioButton
                    name={elements.name}
                    type={elements.type}
                    value={elements.value}
                    checked={elements.value}
                    onChange={handlerOnChange} />
                <label htmlFor={elements.name}>
                    <Typography.P200
                        color={theme.color.N50}>
                        {elements.placeholder}
                    </Typography.P200>
                </label>
            </Container>
        </>
    )
}

const RadioButton = styled.input`
    display: grid;
    place-content: center;
    appearance: none;
    background-color: #fff;
    color: currentColor;
    width: 1.6rem;
    height: 1.6rem;
    margin: 0.4rem;
    border: 0.15em solid ${theme.color.N50};
    border-radius: 50%;
    transform: translateY(-0.075em);
    cursor: pointer;

    ::before{
        content: "";
        width: 0.65em;
        height: 0.65em;
        border-radius: 50%;
        transform: scale(0);
        background-color: ${theme.color.N500};
        transition: 120ms transform ease-in-out;
    }
    :checked::before {
        transform: scale(1);
    }
    :hover, :checked{
        border: 0.15em solid ${theme.color.N500};
    }

     :checked ~ label h1{
        color: ${theme.color.N500} !important;
    }
`;


const Container = styled.div`
    display: flex;
    align-items: center;
`;

export default RadioBox;