import styled from "styled-components"
import checkCircleIcon from "@images/icons/check_circle.svg"
import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import NoLabelAndBothActionButtons from "@components/HeaderNavigation/NoLabelAndBothActionButtons"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import { useNavigate } from "react-router-dom"
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout"
import PharmacyMiddleware from "@middleware/pharmacy"
import { useQuery } from "react-query"
import { isSuccess } from "@utils/options"
import FillButton from "@components/FillButton"
import { style1 } from "@utils/theme/button/style1"
import { style2 } from "@utils/theme/button/style2"
import useLocalStorage from "@hooks/useLocalStorage"

const PharmacyRegistrationComplete = () => {
    const navigate = useNavigate();
    const pharmacyMiddleware = new PharmacyMiddleware();
    const LeftActions = [{
        event: () => navigate(-1),
        iconType: BackIcon
    }]


    const getPharmacy = async () => {
        const res = await pharmacyMiddleware.getPharmacy();
        if (isSuccess(res)) {
            return res.data;
        }
    }

    const { getLocalStorage } = useLocalStorage();
    const { data } = useQuery("getPharmacy", getPharmacy);

    const goodsId = getLocalStorage("goodsId");

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
                <ul
                    style={{
                        marginTop: "5.2rem",
                        padding: "2rem 0",
                        width: "100%",
                        borderTop: `1px solid ${theme.color.N40}`,
                        borderBottom: `1px solid ${theme.color.N40}`,
                    }}>
                    <li style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>

                        <>
                            <Typography.H50 color={theme.color.N70}>
                                내 약국
                            </Typography.H50>
                            <Typography.H50 color={theme.color.N900}>
                                {data && data.name}
                            </Typography.H50>
                        </>

                    </li>
                    <li style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "2rem"
                    }}>
                        <Typography.H50 color={theme.color.N70}>
                            사업자등록번호
                        </Typography.H50>
                        <Typography.H50 color={theme.color.N900}>
                            {data && data.businessNumber}
                        </Typography.H50>
                    </li>
                </ul>
            </Container>
            <Footer>
                {
                    goodsId ?
                        <FillButton
                            id="navigate-create-goods"
                            label="거래명세서 이어서 작성하기"
                            disabled={false}
                            handleOnClick={() => navigate("/new-purchase-details", { replace: true })}
                            {...style1} /> :
                        <FillButton
                            id="navigate-create-goods"
                            label="바로 판매글 작성하기"
                            disabled={false}
                            handleOnClick={() => navigate("/new-goods", { replace: true })}
                            {...style1} />
                }
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
    align-items: center;
    text-align: center;
    height:100%;
    overflow: scroll;
    margin-top: 4rem;
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
    padding: 0 1.6rem;
`

const Img = styled.img`

`

const Footer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
    margin: 1.8rem 0;
    padding: 0 1.6rem;
`

export default PharmacyRegistrationComplete