import Typography from "@components/Typograpy"
import styled from "styled-components"
import { theme } from "@styles/theme"
import HandShakeSvg from "@images/illustration/handshake-illustration.svg"
import FillButton from "@components/FillButton"
import { useNavigate } from "react-router-dom"
import WithGuttersLeftAndRightLayoutForNotScroll from "@components/Layout/WithGuttersLeftAndRightLayoutForNotScroll"
import { style1 } from "@utils/theme/button/style1"
const WelComePage = () => {
    const navigate = useNavigate()
    const goToHome = () => navigate('/', { state: true })

    return (
        <WithGuttersLeftAndRightLayoutForNotScroll>
            <Container>
                <Typography.H200B
                    color={theme.color.BB800}>
                    힐러 가입을 축하드려요.
                </Typography.H200B>
                <Typography.H50
                    color={theme.color.BB800}
                    style={{ marginTop: "0.8rem" }}>
                    힐러를 통해 직거래를 보다 쉽게 경험해보세요!
                </Typography.H50>
                <ImageWrapper>
                    <img src={HandShakeSvg} alt="회원가입을 축하하는 악수 이미지" />
                </ImageWrapper>
                <Typography.H50 color={theme.color.N200}>
                    현재 힐러 교품 서비스는 <strong>강동구</strong>에서만 가능합니다.<br />
                    다른 지역 사용자는 조금만 더 기다려주세요. 😉
                </Typography.H50>
            </Container>
            <Footer>
                <FillButton
                    id="navigate"
                    label="힐러 시작하기"
                    handleOnClick={goToHome}
                    disabled={false}
                    {...style1} />
            </Footer>
        </WithGuttersLeftAndRightLayoutForNotScroll>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height:100%;
    overflow: scroll;
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`

const Footer = styled.div`
    z-index: 99;
    width: 100%;
    margin: 1.3rem 0
`
const ImageWrapper = styled.div`
    width: 100%;
    max-width: 48rem;
    img{
        width: 100%;
        height: auto;
    }
`

export default WelComePage