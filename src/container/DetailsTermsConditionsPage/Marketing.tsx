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

const MarketingTermsPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<TermsAndConditionsEntity>();

    const LeftActions = [{
        event: () => navigate(-1),
        iconType: BackIcon
    }]

    useEffect(() => {
        contentfulClient.getEntries().then((response) => {
            response.items.map((item) => {
                const items = item.fields as TermsAndConditionsEntity
                setData(items)
            })
        })
    }, []);

    if (!data) {
        return <p>Loading...</p>
    }

    return (
        <WithNoGuttersTopAndBottomLayout>
            <HeaderNavigationWrapper>
                <LabelOnTheCenterAndBothActionButtons
                    leftActions={LeftActions}
                    label="마케팅 정보 수신" />
            </HeaderNavigationWrapper>
            <Container>
                <Typography.P100B color={theme.color.N600}>{data.title}</Typography.P100B>
                <Typography.P50 style={{ marginTop: " 1.2rem" }}  color={theme.color.N400}>
                    {data.content}
                </Typography.P50>
            </Container>
        </WithNoGuttersTopAndBottomLayout>
    );
}


const HeaderNavigationWrapper = styled.div`
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

export default MarketingTermsPage;