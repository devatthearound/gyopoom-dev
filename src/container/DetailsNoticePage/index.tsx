import LabelOnTheCenterAndBothActionButtons from "@components/HeaderNavigation/LabelOnTheCenterAndBothActionButtons"
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import { useEffect, useState } from "react"
import contentfulClient from "@service/contentfulClient"
import NoticeEntity from "@dto/notice.entity"
import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import MomentTime from "@components/MomentTime"
import Loading from "@components/Loading"
import useContentful from "@hooks/useContentful"
import { isSuccess } from "@utils/options"

const DetailsNoticePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState<NoticeEntity>();
    const { getNotice } = useContentful();
    const LeftActions = [{
        event: () => navigate(-1),
        iconType: BackIcon
    }]

    useEffect(() => {
        const getContentfulNotice = async (id: string) => {
            const res = await getNotice(id);
            if (isSuccess(res)) {
                setNotice(res.data)
            }
        }

        if (id) getContentfulNotice(id)
    }, [id]);

    return (
        <WithNoGuttersTopAndBottomLayout>
            <LabelOnTheCenterAndBothActionButtons label="공지사항" leftActions={LeftActions} />
            <Container>
                <Typography.H100M>
                    {
                        notice ? notice.title : <Loading width="2rem" height="2rem" />
                    }
                </Typography.H100M>
                {
                    notice ? (
                        <MomentTime
                            date={notice.createdAt}
                            format="YYYY.MM.DD" />
                    ) : <Loading width="2rem" height="2rem" />
                }
                <Content>
                    <ReactMarkdown>
                        {notice ? notice.content : <Loading width="2rem" height="2rem" />}
                    </ReactMarkdown>
                </Content>
            </Container>
        </WithNoGuttersTopAndBottomLayout>
    )
}


const Content = styled.div`
    margin-top: 3.6rem;
    .line-break{
        white-space: pre-Wrapper;
    }

    img{
        max-width: 100%;
        height: auto;
        margin: auto;
        display: block;
    }

    ul{
        list-style: inside;
        font-size: ${theme.fontSize.P200}
    }

    li{
        line-height: 1.3;
    }

    h1{
        font-size: ${theme.fontSize.H100};
        line-height: 1.5;
    }
    h2{
        font-size: ${theme.fontSize.H75};
        line-height: 1.5;
    }
    h3{
        font-size: ${theme.fontSize.H50};
        line-height: 1.5;
    }
    p{
        display: block;
        font-size: ${theme.fontSize.P200};
        line-height: 1.5;
    }
`

const Container = styled.div`
    height:100%;
    overflow: scroll;
    padding: 3.6rem 1.6rem;
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
    border-top: 1px solid ${theme.color.N40};
`

export default DetailsNoticePage