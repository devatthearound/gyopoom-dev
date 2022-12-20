import Typography from "@components/Typograpy";
import { theme } from "@styles/theme";
import styled from "styled-components";

type Props = {
    count: number
}
const UnReadMessageNotifiCard: React.FC<Props> = ({ count }) => {


    return (
        count > 999 ?
            // 1000 일때
            <Wrapper w={4} h={3}>
                999+
            </Wrapper>
            : count > 99 ?
                // 100 일때
                <Wrapper w={3} h={2}>
                    {count}
                </Wrapper>
                : count > 9 ?
                    // 10 일때
                    <Wrapper w={2.5} h={2.5}>
                        {count}
                    </Wrapper>
                    : count > 0 ?
                        <Wrapper w={2} h={2}>
                            {count}
                        </Wrapper> : null

    )
}

const Wrapper = styled.div<{ w: number, h: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.w}rem;
    height: ${props => props.w}rem;
    border-radius: 50%;
    background-color: ${theme.color.BB600};
    color: ${theme.color.N0};
    font-size: ${theme.fontSize.P50};
`



export default UnReadMessageNotifiCard