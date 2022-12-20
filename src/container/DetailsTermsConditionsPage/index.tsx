import DefaultPageTransition from "@components/animation/DefaultPageTransition"
import LabelOnTheCenterAndBothActionButtons from "@components/HeaderNavigation/LabelOnTheCenterAndBothActionButtons"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import { Link, useNavigate } from "react-router-dom"
import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import styled from "styled-components"
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout"
import WithGuttersLeftAndRightLayoutForNotScroll from "@components/Layout/WithGuttersLeftAndRightLayoutForNotScroll"
import GOIcon from "@images/icons/keyboard_arrow_right.svg"

const TermsConditionsPage = () => {
    const navigate = useNavigate();

    const LeftActions = [{
        event: () => navigate(-1),
        iconType: BackIcon
    }]

    return (
        <WithNoGuttersTopAndBottomLayout>
            <HeaderNavigationWrapper>
                <LabelOnTheCenterAndBothActionButtons
                    leftActions={LeftActions}
                    label="고객센터" />
            </HeaderNavigationWrapper>
            <WithGuttersLeftAndRightLayoutForNotScroll>
                <DefaultPageTransition>
                    <ContentBox>
                        <Typography.P100B style={{ padding: " 1.2rem 0" }} color={theme.color.N200}>필수약관</Typography.P100B>
                        <Ul>
                            <Li>
                                <Link to="service">
                                    <Typography.H50>
                                        사용자 이용약관
                                    </Typography.H50>
                                    <Img src={GOIcon} alt="아이콘 이미지" />
                                </Link>
                            </Li>
                            <Li>
                                <Link to="users">
                                    <Typography.H50>
                                        개인정보 처리방침
                                    </Typography.H50>
                                    <Img src={GOIcon} alt="아이콘 이미지" />
                                </Link>
                            </Li>
                        </Ul>
                    </ContentBox>
                    {/* <ContentBox>
                        <Typography.P100B style={{ padding: " 1.2rem 0" }} color={theme.color.N200}>마케팅 활용 약관</Typography.P100B>
                        <Ul>
                            <Li>
                                <Link to="marketing">
                                    <Typography.H50>
                                        마케팅 정보 수신
                                    </Typography.H50>
                                    <Button>
                                        <Img src={GOIcon} alt="아이콘 이미지" />
                                    </Button>
                                </Link>
                            </Li>
                        </Ul>
                    </ContentBox> */}
                </DefaultPageTransition>
            </WithGuttersLeftAndRightLayoutForNotScroll>
        </WithNoGuttersTopAndBottomLayout>
    )
}

const Img = styled.img`
    width: 2.4rem;
    height: 2.4rem;
    filter: ${theme.svgColor.N50};
`

const HeaderNavigationWrapper = styled.div`
    z-index: 99;
    width:100%;
    background-color: ${theme.color.N0};
`
const ContentBox = styled.div`

`

const Ul = styled.ul`

`

const Li = styled.li`
    padding: 1.2rem 0;
    cursor: pointer;
    a{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    
`

export default TermsConditionsPage