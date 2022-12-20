import Typography from "@components/Typograpy";
import ScrollUpAndDownBox from "@components/animation/DraggableBottomSheet";
import { theme } from "@styles/theme";
import PharmacyIcon from "@images/icons/local_pharmacy.svg"
import { useState } from "react";
import styled from "styled-components";
import Flex from "@components/Flex";
import { useNavigate } from "react-router-dom";
import { style1 } from "@utils/theme/button/style1";
import FillButton from "@components/FillButton";
import { style2 } from "@utils/theme/button/style2";

type Props = {
    defaultValue: boolean
}

const RegisterPharmacyInformationOnFirstUserRegister: React.FC<Props> = ({ defaultValue }) => {
    const [isOpen, setIsOpen] = useState(defaultValue);
    const navigate = useNavigate();
    const stateChange = (state: boolean) => {
        setIsOpen(state)
    }

    return (
        <ScrollUpAndDownBox isOpen={isOpen} stateChange={stateChange}>
            <Flex style={{ flexDirection: "column", justifyContent: "center" }}>
                <Img src={PharmacyIcon} />
                <Typography.H75M
                    style={{ textAlign: "center" }}>
                    약사님의 약국정보를 등록해주세요.
                </Typography.H75M>
                <Typography.P200
                    style={{ marginTop: "1.2rem", textAlign: "center" }}
                    color={theme.color.N100}>
                    약국정보는 안전한 교품 거래와  간편한 거래 명세서
                    작성을 위해 필수로 사용되는 정보입니다.
                </Typography.P200>
                <div style={{ marginTop: "3.2rem" }}>
                    <FillButton
                        id="navigate-pharmacy-enroll"
                        label="지금 시작하기"
                        disabled={false}
                        handleOnClick={() => navigate("/account/pharmacy/enroll")}
                        {...style1} />
                </div>
                <div style={{ marginTop: "0.8rem" }}>
                    <FillButton
                        id="navigate-home"
                        label="나중에 등록하기"
                        disabled={false}
                        handleOnClick={() => stateChange(false)}
                        {...style2} />
                </div>
            </Flex>
        </ScrollUpAndDownBox>
    )
}

const Img = styled.img`
    filter: ${theme.svgColor.B300};
    width: 3.3rem;
    margin: auto;
`
export default RegisterPharmacyInformationOnFirstUserRegister