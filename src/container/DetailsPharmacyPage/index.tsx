import DefaultPageTransition from "@components/animation/DefaultPageTransition";
import PharmacyMiddleware from "@middleware/pharmacy";
import { isSuccess } from "@utils/options";
import { useEffect, useState } from "react";
import { useQuery } from "react-query"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import { useNavigate } from "react-router-dom";
import LabelOnTheCenterAndBothActionButtons from "@components/HeaderNavigation/LabelOnTheCenterAndBothActionButtons";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import Typography from "@components/Typograpy";
import styled from "styled-components";
import { theme } from "@styles/theme";
import { PharmacyUserRoleCode } from "@utils/common-status-code";
import Flex from "@components/Flex";
import PlusIcon from "@images/icons/plus.svg";
import EnrollPharmacyUserListCard from "@components/EnrollPharmacyUserListCard";
import EnrollPharmacyMyCard from "@components/EnrollPharmacyMyCard";
import EnrollPharmacyCurrentDTO from "@dto/enroll-pharmacy-current.dto";
import LocalPharmacyIcon from "@images/icons/local_pharmacy.svg"

const EnrollPharmacyPage = () => {
    const pharmacyMiddleware = new PharmacyMiddleware();
    const navigate = useNavigate();
    const [myPharmacyEnroll, setMyPharmacyEnroll] = useState<EnrollPharmacyCurrentDTO>()
    const Actions = [
        {
            event: () => navigate(-1),
            iconType: BackIcon
        }
    ]

    useEffect(() => {
        const getMyEnrollPharmacy = async () => {
            const res = await pharmacyMiddleware.getMyEnrollPharmacy();
            if (isSuccess(res)) {
                setMyPharmacyEnroll(res.data);
            }
        }
        getMyEnrollPharmacy();

    }, [])

    const getAllPharmacy = async () => {
        const res = await pharmacyMiddleware.getAllEnrollPharmacy();
        if (isSuccess(res)) {
            return res.data;
        }
    };

    const { isLoading, data } = useQuery('EnrollPharmacyUsers', getAllPharmacy);


    const handleOnClickEnrollPharmacy = () => {
        navigate("/account/pharmacy/enroll");
    }

    return (

        <DefaultPageTransition>
            <WithNoGuttersTopAndBottomLayout
                style={{ backgroundColor: theme.color.N20 }}>
                <LabelOnTheCenterAndBothActionButtons
                    label="약국 관리"
                    leftActions={Actions} />
                {
                    myPharmacyEnroll ?
                        <>
                            <EnrollPharmacyMyCard
                                isEditPermission={myPharmacyEnroll.user.role == PharmacyUserRoleCode.ADMIN ? true : false}
                                user={myPharmacyEnroll} />
                            {
                                !isLoading && data && myPharmacyEnroll && (
                                    <EnrollPharmacyUserListCard
                                        isEditPermission={myPharmacyEnroll.user.role == PharmacyUserRoleCode.ADMIN ? true : false}
                                        users={data} />
                                )
                            }
                            <Footer>
                                <Typography.P200
                                    style={{ lineHeight: 2 }}
                                    color={theme.color.N60}>
                                    관리자 계정 변경을 원시나요?
                                </Typography.P200>
                                <Typography.H100M
                                    style={{ textDecoration: "underline", textUnderlinePosition: "under", }}
                                    color={theme.color.N900}>
                                    힐러 고객센터에 문의하기
                                </Typography.H100M>
                            </Footer>
                        </> : (
                            <EnrollPharmacyButton onClick={handleOnClickEnrollPharmacy}>
                                 <Flex style={{ justifyContent:"space-between" }}>
                                <Flex style={{ gap: "5px" }}>
                                    <img src={LocalPharmacyIcon}/>
                                    <Typography.H50M
                                        color={theme.color.N900}>
                                        약국정보 추가하기
                                    </Typography.H50M>
                                </Flex>
                                <Img src={PlusIcon} />
                                </Flex>
                            </EnrollPharmacyButton>
                        )
                }
            </WithNoGuttersTopAndBottomLayout>
        </DefaultPageTransition >
    )
}

const Footer = styled.div`
    text-align: center;
    margin: 2.5rem 0;
`

const EnrollPharmacyButton = styled.button`
    border: 0px;
    border-radius: 0.8rem;
    width: calc(100% - 4rem);
    margin: 1.7rem 2rem;
    cursor: pointer;
    background-color: ${theme.color.N0};
    padding: 1.6rem 2rem;
    border: 1px solid ${theme.color.B200};
`
const Img = styled.img`
    filter: ${theme.svgColor.N60};
`

export default EnrollPharmacyPage