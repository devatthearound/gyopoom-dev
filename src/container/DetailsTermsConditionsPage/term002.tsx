import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import Typography from "@components/Typograpy";
import contentfulClient from "@service/contentfulClient";
import { theme } from "@styles/theme";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TermsAndConditionsEntity from "@dto/termsAndConditions.entity";
import styled from "styled-components";
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import LabelOnTheCenterAndBothActionButtons from "@components/HeaderNavigation/LabelOnTheCenterAndBothActionButtons";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Terms002Page = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<TermsAndConditionsEntity>();

    const LeftActions = [{
        event: () => navigate(-1),
        iconType: BackIcon
    }]

    useEffect(() => {
        contentfulClient.getEntry("5U3BEOeAzUSwnPFtgZdbnI").then((response) => {
            const items = response.fields as TermsAndConditionsEntity
            setData(items)
        })
    }, []);

    if (!data) {
        return <p>Loading...</p>
    }

    return (
        <WithNoGuttersTopAndBottomLayout>
            <HeaderNavigationWrap>
                <LabelOnTheCenterAndBothActionButtons
                    leftActions={LeftActions}
                    label={data.title} />
            </HeaderNavigationWrap>
            <Container>
                <Typography.P100B color={theme.color.N600}>{data.title}</Typography.P100B>
                <Content>
                    <ReactMarkdown className="line-break">
                        {data.content}
                    </ReactMarkdown>
                </Content>
            </Container>
        </WithNoGuttersTopAndBottomLayout>
    );
}

const HeaderNavigationWrap = styled.div`
    z-index: 99;
    width:100%;
    background-color: ${theme.color.N0};
`
const Container = styled.div`
    height: 100%;
    padding: 2rem;
    overflow: scroll;
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`

const Content = styled.div`
    margin-top: 1.2rem;
    .line-break{
        white-space: pre-wrap;
    }

    img{
        max-width: 100%;
        height: auto;
        margin: auto;
        display: block;
    }

    ul{
        list-style: disc;
        padding-left: 3em;
    }
    ol {
        list-style: decimal;
        padding-left: 3em;
    }

    li{
        font-size: ${theme.fontSize.P200};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        color: ${theme.color.N400};
        line-height: 1.3;
    }

    h1{
        font-size: ${theme.fontSize.H100};
        line-height: 2;
    }
    h2{
        font-size: ${theme.fontSize.H200};
        line-height: 2;
    }
    h3{
        font-size: ${theme.fontSize.H50};
        font-weight: ${theme.fontWeight.Bold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  2;
        margin-top: 1.6rem;
    }
    p{
        display: block;
        font-size: ${theme.fontSize.P200};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        color: ${theme.color.N400};
        line-height: 1.5;
    }
`

export default Terms002Page;