import Typography from "@components/Typograpy";
import ScrollUpAndDownBox from "@components/animation/DraggableBottomSheet";
import { theme } from "@styles/theme";
import PharmacyIcon from "@images/icons/local_pharmacy.svg"
import { useEffect, useState } from "react";
import styled from "styled-components";
import Flex from "@components/Flex";
import { Link, useNavigate } from "react-router-dom";
import { style1 } from "@utils/theme/button/style1";
import FillButton from "@components/FillButton";
import CheckBoxButton from "@components/CheckBoxButton";
import TermsAndConditionsEntity from "@dto/termsAndConditions.entity";
import contentfulClient from "@service/contentfulClient";

type Props = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    onClickHandle: () => void
}

const RegisterPharmacyRegister: React.FC<Props> = ({ isOpen, setIsOpen, onClickHandle }) => {
    const stateChange = (state: boolean) => {
        setIsOpen(state)
    }

    const [data, setData] = useState<TermsAndConditionsEntity>();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        contentfulClient.getEntry("5zbeSfWcpWglr11kMulafM").then((response) => {
            const items = response.fields as TermsAndConditionsEntity
            setData(items)
        })
    }, []);

    const handleAllChangeToCheck = (id: string) => {
        setIsChecked(!isChecked)
    }

    if (!data) {
        return <p>Loading...</p>
    }

    return (
        <ScrollUpAndDownBox isOpen={isOpen} stateChange={stateChange}>
            <Flex style={{ flexDirection: "column", justifyContent: "center" }}>
                <Img src={PharmacyIcon} />
                <Typography.H75M
                    style={{ textAlign: "center" }}>
                    이용약관을 동의하시겠습니까?
                </Typography.H75M>
                <Typography.P200
                    style={{ marginTop: "1.2rem", textAlign: "center" }}
                    color={theme.color.N100}>
                    약국정보는 안전한 교품 거래와  간편한 거래 명세서
                    작성을 위해 필수로 사용되는 정보입니다.
                </Typography.P200>
                <CheckBoxWrapper>
                    <CheckBoxButton
                        elements={{
                            name: data.id,
                            type: "checkbox",
                            label: data.required ? "(필수) " + data.thumbnail : "(선택) " + data.thumbnail,
                            checked: isChecked,
                            value: data.id
                        }}
                        defaultBgColor={theme.svgColor.N80}
                        activedBgColor={theme.svgColor.B300}
                        defaultTtColor={theme.color.N80}
                        activedTtColor={theme.color.N900}
                        onChange={handleAllChangeToCheck} />
                    {data.link &&
                        <Link to={`${data.link}`}>
                            <Typography.P200 color={theme.color.N80}>
                                보기
                            </Typography.P200>
                        </Link>}
                </CheckBoxWrapper>
                <div style={{ marginTop: "2.7rem" }}>
                    <FillButton
                        id="navigate-home"
                        label="동의하고 저장하기"
                        disabled={!isChecked}
                        handleOnClick={() => {
                            stateChange(false);
                            onClickHandle();
                        }}
                        {...style1} />
                </div>
            </Flex>
        </ScrollUpAndDownBox>
    )
}

const CheckBoxWrapper = styled.div`
    display: flex;
    margin-top: 2.7rem;
    justify-content: space-between;
    align-items: center;
`

const Img = styled.img`
    filter: ${theme.svgColor.B300};
    width: 3.3rem;
    margin: auto;
`
export default RegisterPharmacyRegister