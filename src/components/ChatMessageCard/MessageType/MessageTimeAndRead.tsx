import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import styled from "styled-components"
import Moment from "react-moment"

type Props = {
    date: string
    isRead: boolean
}

const MessageTimeAndRead: React.FC<Props> = ({ date, isRead }) => {
    return (
        <Wrapper>
            <Typography.P100 color={theme.color.N80}>
                {isRead ? "" : 1}
            </Typography.P100>
            <Typography.P100 color={theme.color.N80}>
                <Moment format="LT">{date}</Moment>
            </Typography.P100>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0 0.5rem;
`

export default MessageTimeAndRead