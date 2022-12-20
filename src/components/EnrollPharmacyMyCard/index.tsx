import Typography from "@components/Typograpy"
import EnrollPharmacyDTO from "@dto/enroll-pharmacy.dto"
import { theme } from "@styles/theme"
import { PharmacyUserRoleCode, PharmacyUserRoleText } from "@utils/common-status-code"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import PharmacistManFaceIcon from "@images/icons/pharmacist-man-face.svg"
import LocalPharmacyIcon from "@images/icons/local_pharmacy.svg"
import ArrowRightIcon from "@images/icons/keyboard_arrow_right.svg";
import Flex from "@components/Flex"
import { useErrorHandlerForm } from "@context/ErrorHandleContext"
import EnrollPharmacyCurrentDTO from "@dto/enroll-pharmacy-current.dto"
import PharmacyMiddleware from "@middleware/pharmacy"
import { isSuccess } from "@utils/options"
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/blue_error.svg"

type Props = {
    user: EnrollPharmacyCurrentDTO
    isEditPermission: boolean
}



const EnrollPharmacyMyCard: React.FC<Props> = ({ user, isEditPermission }) => {
    const navigate = useNavigate();
    const { setModalMessage } = useErrorHandlerForm();
    const pharmacyMiddleware = new PharmacyMiddleware();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const handleOnClickButton = () => {
        navigate(`/account/change-pharmacy/${user.pharmacy.id}`);
    }

    const handleOnClickDisableButton = () => {
        // setAlertMessage 삭제함 11.26
        // setAlertMessage("관리자 승인 요청 중입니다.")
    }

    const handlerOnClickUnConnect = async () => {
        setIsConfirmModalOpen({
            isOpen: true,
            title: "약국 연결을 해제하시겠습니까?",
            icon: ErrorIcon,
            confirmButton: {
                handleOnClick: async () => {
                    setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    setModalMessage("약국 연결이 해제되었습니다")
                    const res = await pharmacyMiddleware.unConnectPharmacy();
                    await setTimeout(() => {
                        setModalMessage("")
                        if (isSuccess(res)) {
                            navigate("/account");
                        }
                    }, 1000);
                },
                label: "확인",
                width: 5
            },
            cancelButton: {
                width: 5,
                label: "취소",
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
            }
        })
    }

    return (
        isEditPermission ? (
            <div>
                <MyAccountCard>
                    <Flex style={{ gap: "5px" }}>
                        <Img src={PharmacistManFaceIcon} />
                        <Typography.H50B>{user.user.name} 약사</Typography.H50B>
                    </Flex>
                    <RoleTagCard bgColor={theme.color.B200}>
                        <Typography.P100
                            style={{ lineHeight: 2 }}
                            color={theme.color.N0}>
                            {PharmacyUserRoleText.ADMIN}
                        </Typography.P100>
                    </RoleTagCard>
                </MyAccountCard>
                <MyPharmacyCard onClick={handleOnClickButton}>
                    <Flex style={{ gap: "5px" }}>
                        <Img src={LocalPharmacyIcon} />
                        <Typography.H75 color={theme.color.N900}>내 약국 정보</Typography.H75>
                    </Flex>
                    <Typography.P100
                        style={{ lineHeight: 2 }}
                        color={theme.color.N100}>{user.pharmacy.address} <strong>{user.pharmacy.name}</strong></Typography.P100>
                </MyPharmacyCard>
            </div>
        ) : user.user.isAccepted ? (
            <div>
                <MyAccountCard>
                    <Flex style={{ gap: "5px" }}>
                        <Img src={PharmacistManFaceIcon} />
                        <Typography.H50B>{user.user.name} 약사</Typography.H50B>
                    </Flex>
                    <RoleTagCard bgColor={theme.color.N80}>
                        <Typography.P100
                            style={{ lineHeight: 2 }}
                            color={theme.color.N0}>
                            {PharmacyUserRoleText.MANAGER}
                        </Typography.P100>
                    </RoleTagCard>
                </MyAccountCard>
                <MyPharmacyCard onClick={handleOnClickButton}>
                    <Flex style={{ gap: "5px" }}>
                        <Img src={LocalPharmacyIcon} />
                        <Typography.H75 color={theme.color.N900}>내 약국 정보</Typography.H75>
                    </Flex>
                    <Typography.P100
                        style={{ lineHeight: 2 }}
                        color={theme.color.N100}>{user.pharmacy.address} <strong>{user.pharmacy.name}</strong></Typography.P100>
                </MyPharmacyCard>
            </div>
        ) : (
            <div>
                <MyAccountCard>
                    <Flex style={{ gap: "10px" }}>
                        <Typography.H50B>{user.user.name} 약사</Typography.H50B>
                        <RoleTagCard bgColor={theme.color.N30}>
                            <Typography.P100
                                style={{ lineHeight: 2 }}
                                color={theme.color.N80}>
                                승인 요청 중
                            </Typography.P100>
                        </RoleTagCard>
                    </Flex>
                    <Typography.H75
                        onClick={handlerOnClickUnConnect}
                        className="noselect"
                        style={{ cursor: "pointer" }}
                        color={theme.color.N60}>연결 해제</Typography.H75>
                </MyAccountCard>
                <MyPharmacyCard onClick={handleOnClickDisableButton}>
                    <Typography.H75 color={theme.color.N100}>내 약국 정보</Typography.H75>
                </MyPharmacyCard>
            </div>
        )
    )
}

const MyAccountCard = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2.4rem 1.6rem;
    background-color: ${theme.color.N0};
`


const RoleTagCard = styled.div<{ bgColor: string }>`
    width: fit-content;
    padding: 0 0.5rem;
    background-color: ${(props) => props.bgColor};
    border-radius: 0.4rem;
`

const Img = styled.img`
`


const MyPharmacyCard = styled.button`
    text-align: left;
    width: 100%;
    border: 0px;
    padding: 2rem 1rem;
    border-top: 1px solid ${theme.color.N40};
    background: url(${ArrowRightIcon}) no-repeat top 2rem right 0.6rem ${theme.color.N0};
    cursor: pointer;
`

export default EnrollPharmacyMyCard