import styled, { keyframes } from "styled-components"
import { theme } from "@styles/theme";

type Props = {
    width: string;
    height: string;
    bg?: string;
}

const Loading: React.FC<Props> = ({ width, height, bg }) => {
    return (
        <Loader width={width} height={height} bg={bg} />
    )
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(359deg); }
`

const Loader = styled.div<Props>`  
    margin: auto;
    height: ${(props) => props.height};
    width:  ${(props) => props.width};
    border: 3px solid #fff;
    border-right-color: ${({ bg }) => bg ? bg : theme.color.B300};
    border-top-color:  ${({ bg }) => bg ? bg : theme.color.B300};
    border-radius: 100%;
    animation: ${spin} 800ms infinite linear;
`

export default Loading