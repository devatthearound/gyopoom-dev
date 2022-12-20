import Flex from "@components/Flex"
import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import styled from "styled-components"
import BounceClickAnimation from "@components/animation/BounceClickAnimation"
import { useGetUser } from "@context/AuthContext"
import MessageDTO, { TextMessageType } from "@dto/message.dto"
import Moment from "react-moment"

type Props = {
    item: MessageDTO
}

const DefaultMessageCard: React.FC<Props> = ({ item }) => {
    const { user } = useGetUser()

    return (
        <BounceClickAnimation>
            <MessageCard isOwn={item.senderId === user?.id}>
                <InFoCard>
                    <Typography.P100 color={theme.color.N80}>
                        {item.isRead ? "" : 1}
                    </Typography.P100>
                    <TimeCard>
                        <Typography.P100 color={theme.color.N80}>
                            <Moment format="LT">{item.createAt}</Moment>
                        </Typography.P100>
                    </TimeCard>
                </InFoCard>
                <TextCard isOwn={item.senderId === user?.id}>
                    <Typography.H50>
                        {item.text}
                    </Typography.H50>
                </TextCard>
            </MessageCard>
        </BounceClickAnimation>
    )
}

const InFoCard = styled(Flex)`
    flex-direction: column;
    align-items: flex-end;
    padding: 0 0.5rem;
    flex: none;
`

const TimeCard = styled.div`
`

const MessageCard = styled(Flex) <{ isOwn: boolean }>`
    gap: 0.5rem;
    padding: 0.4rem 0;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: ${(props) => props.isOwn ? "row" : "row-reverse"};
`

const TextCard = styled(Flex) <{ isOwn: boolean }>`
    background-color: ${theme.color.N0};
    padding: 0.8rem 1.2rem;
    border-radius: 1.2rem;
    align-items: center;
    justify-content: center;

    position: relative;
    ::after {
        border-top:15px solid ${theme.color.N0};
        border-left: ${(props) => props.isOwn ? "0px solid transparent" : "15px solid transparent"}; ;
        border-right: ${(props) => props.isOwn ? "15px solid transparent" : "0px solid transparent"}; ;
        border-bottom: 0px solid transparent;
        content:"";
        position:absolute;
        top: 7px;
        left:  ${(props) => props.isOwn ? "auto" : "-14px"};
        right:  ${(props) => props.isOwn ? "-14px" : "auto"};
    }
`

export default DefaultMessageCard