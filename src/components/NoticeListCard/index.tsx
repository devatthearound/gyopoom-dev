import Loading from "@components/Loading"
import NoticeEntity from "@dto/notice.entity"
import { useChangeScrollTop } from "@hooks/useChangeScrollTop"
import useContentful from "@hooks/useContentful"
import useNoticeStore from "@store/notice"
import { theme } from "@styles/theme"
import { isSuccess } from "@utils/options"
import { useEffect, useState } from "react"
import styled from "styled-components"
import NoticeCard from "./NoticeCard"


const NoticeListCard = (() => {
    const [notices, setNotices] = useState<NoticeEntity[]>([]);
    const { scrollPosition, setScrollPosition } = useNoticeStore();
    const { scrollRef } = useChangeScrollTop(scrollPosition, setScrollPosition);
    const {getNotices} = useContentful();

    useEffect(() => {
        const getContentfulNotices = async () => {
            const res = await getNotices();
            if(isSuccess(res)){
                setNotices(res.data);
            }
        }

        getContentfulNotices();
    }, []);

    if (!notices) {
        <Loading width="2re" height="2rem" />
    }

    return (
        <Container ref={scrollRef}>
            {
                notices.map((notice, index) => (
                    <NoticeCard key={index} data={notice} />
                ))
            }
        </Container>
    )
})

const Container = styled.div`
    height:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
    padding-top: 1.2rem;
    background-color: ${theme.color.N20};

    div:not(:last-child){
        border-bottom: 1px solid ${theme.color.N40};
    }
`

export default NoticeListCard