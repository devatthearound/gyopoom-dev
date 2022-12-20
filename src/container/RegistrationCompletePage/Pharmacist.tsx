import styled from "styled-components"
import checkCircleIcon from "@images/icons/check_circle.svg"
import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import NoLabelAndBothActionButtons from "@components/HeaderNavigation/NoLabelAndBothActionButtons"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import { useNavigate } from "react-router-dom"
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout"
import FillButton from "@components/FillButton"
import { style1 } from "@utils/theme/button/style1"
import { style2 } from "@utils/theme/button/style2"

const PharmacistRegistrationComplete = () => {
    const navigate = useNavigate();

    const LeftActions = [{
        event: () => navigate(-1),
        iconType: BackIcon
    }]

    return (
        <WithNoGuttersTopAndBottomLayout>
            <NoLabelAndBothActionButtons
                leftActions={LeftActions} />
            <Container>
                <Img src={checkCircleIcon} />
                <Typography.H200M
                    style={{
                        marginTop: "0.8rem"
                    }}>
                    약국정보 등록 완료
                </Typography.H200M>
            </Container>
            <Footer>
                <FillButton
                    id="navigate-create-goods"
                    label="바로 판매글 작성하기"
                    disabled={false}
                    handleOnClick={() => navigate("/new-goods", { replace: true })}
                    {...style1} />
                <FillButton
                    id="navigate-home"
                    label="홈으로"
                    disabled={false}
                    handleOnClick={() => navigate("/", { replace: true })}
                    {...style2} />
            </Footer>
        </WithNoGuttersTopAndBottomLayout>
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
    padding: 0 1.6rem;
`

const Img = styled.img`

`
const Footer = styled.div`
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
    margin: 1.8rem 0;
    padding: 0 1.6rem;
`

export default PharmacistRegistrationComplete