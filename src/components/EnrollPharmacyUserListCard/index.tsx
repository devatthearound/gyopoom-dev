import BasicConfirmModal from "@components/BasicConfirmModal"
import Flex from "@components/Flex"
import Typography from "@components/Typograpy"
import { useErrorHandlerForm } from "@context/ErrorHandleContext"
import ConfireModalDTO from "@dto/confirm-modal.dto"
import EnrollPharmacyDTO from "@dto/enroll-pharmacy.dto"
import PharmacyMiddleware from "@middleware/pharmacy"
import { theme } from "@styles/theme"
import { PharmacyUserRoleCode, PharmacyUserRoleText } from "@utils/common-status-code"
import { isSuccess } from "@utils/options"
import { useState } from "react"
import styled from "styled-components"
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/blue_error.svg"

type Props = {
    isEditPermission: boolean
    users: EnrollPharmacyDTO[]
}


const EnrollPharmacyUserListCard: React.FC<Props> = ({ isEditPermission, users }) => {
    const pharmacyMiddleware = new PharmacyMiddleware()
    const { setModalMessage } = useErrorHandlerForm();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();


    const handleOnClickAccept = async (id: string) => {
        setIsConfirmModalOpen({
            isOpen: true,
            title: "승인 요청을 수락하시겠습니까?",
            icon: ErrorIcon,
            confirmButton: {
                handleOnClick: async () => {
                    setModalMessage("승인 요청이 수락되었습니다")
                    setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false });
                    const res = await pharmacyMiddleware.updateEnrollPharmacy({
                        userId: id,
                        isAccepted: true
                    });
                    await setTimeout(() => {
                        setModalMessage("")
                        if (isSuccess(res)) {
                            location.reload();
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
            },
        })
    }


    return (
        <>
            <Typography.P200
                style={{ marginTop: '3.4rem', paddingLeft: '1.6rem' }}
                color={theme.color.N100}>
                연결된 계정
            </Typography.P200>
            <Container style={{ marginTop: '0.8rem' }}>
                {
                    users.map((user, key) => (
                        <PharmacyUserCard key={key}>
                            <Flex style={{ gap: "10px" }}>
                                <Typography.H50B>{user.user.name} 약사</Typography.H50B>
                                <RoleTagCard role={user.user.role}>
                                    <Typography.P100
                                        style={{ lineHeight: 2 }}
                                        color={theme.color.N0}>
                                        {user.user.role == PharmacyUserRoleCode.ADMIN ? PharmacyUserRoleText.ADMIN : PharmacyUserRoleText.MANAGER}
                                    </Typography.P100>
                                </RoleTagCard>
                            </Flex>
                            {
                                isEditPermission && (
                                    user.user.isAccepted ? (
                                        <Typography.P200 color={theme.color.B200}>
                                            승인
                                        </Typography.P200>
                                    ) : (
                                        <Button onClick={() => handleOnClickAccept(user.user.id)}>
                                            <Typography.P200
                                                style={{ textDecoration: 'underline', textUnderlinePosition: 'under' }}
                                                color={theme.color.N60}>
                                                수락요청
                                            </Typography.P200>
                                        </Button>
                                    )
                                )
                            }
                        </PharmacyUserCard>
                    ))
                }
            </Container>
        </>
    )
}

const Container = styled.div`
    height:100%;
    overflow: scroll;
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`


const PharmacyUserCard = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 2rem 1rem;
    background-color: ${theme.color.N0};
    border-top: 1px solid ${theme.color.N40};
`

const RoleTagCard = styled.div<{ role: string }>`
    width: fit-content;
    padding: 0 0.5rem;
    background-color: ${(props) => props.role == PharmacyUserRoleCode.ADMIN ? theme.color.B200 : theme.color.N80};
    border-radius: 0.4rem;
`


const Button = styled.button`
    background: none;
    border: 0px;
    margin: 0px;
    padding: 0px;
    cursor: pointer;
`
export default EnrollPharmacyUserListCard