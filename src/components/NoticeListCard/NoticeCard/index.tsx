import Typography from "@components/Typograpy"
import NoticeEntity from "@dto/notice.entity"
import MomentTime from "@components/MomentTime"
import { theme } from "@styles/theme"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import styled from "styled-components"
import NewIcon from "@images/icons/notice-new.svg"

type Props = {
    key: number,
    data: NoticeEntity
}
const NoticeCard: React.FC<Props> = ({ key, data }) => {

    const returnTitle = (date: string) => {
        const threeDayAgo = new Date()
        const contentDay = new Date(data.updatedAt)
        threeDayAgo.setDate(threeDayAgo.getDate() - 3);

        if (threeDayAgo < contentDay) {
            return <NewTitle>{data.title}</NewTitle>
        } else {
            return <DefaultTitle>{data.title}</DefaultTitle>
        }

    }


    return (
        <CardWrapper key={key}>
            <Link to={"/notice/" + data.id}>
                {
                    data && (
                        <>
                            {returnTitle(data.createdAt)}
                            <MomentTime
                                date={data.createdAt}
                                format="YYYY.MM.DD"
                                style={{
                                    fontSize: theme.fontSize.P50,
                                    fontWeight: theme.fontWeight.Regular,
                                    letterSpacing: "0px",
                                    lineHeight: theme.lineHeight.normal,
                                    color: theme.color.N60
                                }} />
                        </>
                    )

                }
            </Link>
        </CardWrapper>
    )
}
const NewTitle = styled(Typography.P200B)`
    position: relative;
    width: fit-content;
    ::before{
        content: '';
        background: url(${NewIcon}) no-repeat;
        position: absolute;
        top: 50%;
        right: -1.5rem;
        transform: translate(0,-65%);
        width: 1.2rem;
        height: 1.2rem;
    }
`

const DefaultTitle = styled(Typography.P200)`

`

const CardWrapper = styled.div`
    padding: 1.3rem 2rem;
    background-color: ${theme.color.N0};
`

export default NoticeCard