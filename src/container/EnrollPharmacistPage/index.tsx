import DownToUpPageTransition from "@components/animation/DownToUpPageTransition"
import WithGuttersLeftAndRightLayoutForNotScroll from "@components/Layout/WithGuttersLeftAndRightLayoutForNotScroll"
import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import { useState } from "react"
import styled from "styled-components"
import InputElements from "@dto/input.elements"
import PharmacyMiddleware from "@middleware/pharmacy"
import { isSuccess } from "@utils/options"
import PharmacySearchResDTO from "@dto/pharmacy-search.res.dto"
import { useNavigate } from "react-router-dom"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import NoLabelAndBothActionButtons from "@components/HeaderNavigation/NoLabelAndBothActionButtons"
import { useErrorHandlerForm } from "@context/ErrorHandleContext"
import DelayShowElement from "@components/animation/DelayShowElement"
import { defaultPharmacist } from "@utils/create-pharmacist.input"
import InputWithLableAndButton from "@components/Input/InputWithLableAndButton"
import BasicConfirmModal from "@components/BasicConfirmModal"
import ConfireModalDTO from "@dto/confirm-modal.dto"
import checkIcon from "@images/icons/check_circle.svg"
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/blue_error.svg"

const EnrollPharmacistPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();
    const [pharmacistLisenceNumber, setPharmacistLisenceNumber] = useState<InputElements>(defaultPharmacist);
    const [pharmacyList, setPharmacyList] = useState<PharmacySearchResDTO>();
    const pharmacyMiddleware = new PharmacyMiddleware();

    const handleEnrollPharmacy = async () => {
        if (pharmacyList) {
            const res = await pharmacyMiddleware.createEnrollPharmacy({
                pharmacyId: pharmacyList.id
            });
            if (isSuccess(res)) {
                navigate("/account/pharmacy")
            } else {
                return setIsConfirmModalOpen({
                    isOpen: true,
                    title: res.message,
                    icon: ErrorIcon,
                    confirmButton: {
                        handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                        label: "확인",
                        width: 10
                    }
                })
            }
        }
    }

    const handlerOnSubmitSearchForm = () => {
        // setAlertMessage 삭제함 11.26
        // setAlertMessage("유효한 번호가 아닙니다. 다시 입력해주세요.")
        setIsConfirmModalOpen({
            icon: checkIcon,
            title: "인증이 완료되었습니다",
            confirmButton: {
                width: 5,
                label: "확인",
                handleOnClick: () => handleEnrollPharmacy
            },
            cancelButton: {
                width: 5,
                label: "취소",
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
            },
            isOpen: true
        })
    }

    const LeftActions = [{
        event: () => navigate(-1),
        iconType: BackIcon
    }]

    return (
        <DownToUpPageTransition>
            <NoLabelAndBothActionButtons
                leftActions={LeftActions} />
            <WithGuttersLeftAndRightLayoutForNotScroll>
                <Typography.H200M
                    style={{ marginTop: "2rem" }}
                    color={theme.color.N700}>
                    약사면허 번호를 인증해주세요.
                </Typography.H200M>
                <Typography.P200
                    style={{ marginTop: "1.6rem" }}
                    color={theme.color.N700}>
                    거래명세서를 작성하기 위한 필수 정보입니다.<br />
                    약사면허 번호가 유효한지 인증해주세요.
                </Typography.P200>
                <InputWithLableAndButton
                    elements={pharmacistLisenceNumber}
                    onChange={setPharmacistLisenceNumber}
                    handleOnClick={handlerOnSubmitSearchForm}
                    buttonTitle="인증" />
            </WithGuttersLeftAndRightLayoutForNotScroll>
        </DownToUpPageTransition>
    )
}

const BottomWrapper = styled.div`
    width: calc(100% - 4rem);
    position: absolute;
    text-align: center;
    left: 50%;
    bottom: 1.6rem;
    transform: translate(-50%, 0);
`

export default EnrollPharmacistPage