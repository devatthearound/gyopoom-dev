import { theme } from "@styles/theme";
import styled from "styled-components";
import Typography from "./Typograpy";

type Props = {
    color: string
    tagName: string,
    style?: React.CSSProperties
}

const BigTag: React.FC<Props> = ({ color, tagName, style }) => {
    return (
        <Wrapper color={color} style={style}>
            <Typography.P100 color={theme.color.N0}>{tagName}</Typography.P100>
        </Wrapper>
    )
}

const Wrapper = styled.div<{ color: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    padding: 0.4rem 0.8rem;
    background: ${(props) => props.color};
    border-radius: 0.4rem;
    margin-right: 0.3rem;
`

export default BigTag