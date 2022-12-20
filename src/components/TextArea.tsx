import styled from "styled-components"
import { theme } from "@styles/theme"

const TextArea = styled.textarea<{ invalid: boolean }>`
    width: 100%;
    font-size: ${theme.fontSize.H50};
    color: ${theme.color.N900};
    height: 23rem;
    resize: none;
    border: 0px;

    ::placeholder{
        color: ${theme.color.N50};
    }
`

export default TextArea