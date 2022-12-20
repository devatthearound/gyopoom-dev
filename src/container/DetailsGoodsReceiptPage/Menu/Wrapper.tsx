import styled from "styled-components"
import { theme } from "@styles/theme";

type MenuWrapperProps = {
    children: React.ReactNode[];
}

const MenuWrapper: React.FC<MenuWrapperProps> = ({ children }) => {
    return (
        <Wrapper>
            {...children}
        </Wrapper>
    )
}

export default MenuWrapper

const Wrapper = styled.div`
    padding:  0.7rem 0;
    text-align: center;
    background-color: ${theme.color.N0};
    button{
        padding: 0;

    }
    button:not(:first-child){
        margin-left: 3rem;
    }
`