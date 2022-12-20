import WithGuttersLeftAndRightLayoutForNotScroll from "@components/Layout/WithGuttersLeftAndRightLayoutForNotScroll";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import InputElements from "@dto/input.elements";
import InputWithLable from "@components/Input/InputWithLable";
import { defaultBusniessNumber, defaultPharmacyAddress, defaultPharmacyName } from "@utils/update-pharmacy.input";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import { useNavigate } from "react-router-dom";
import PharmacyMiddleware from "@middleware/pharmacy";
import { isSuccess } from "@utils/options";
import { PharmacyUserRoleCode } from "@utils/common-status-code";
import BorderButton from "@components/BorderButton";
import { useErrorHandlerForm } from "@context/ErrorHandleContext";
import ChangeDataWithApiHeaderNagigation from "@components/ChangeDataWithApiHeaderNagigation";
import { style6 } from "@utils/theme/button/style6";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/blue_error.svg"

const ChangePharmacyPage = () => {
    const navigate = useNavigate();
    const { setModalMessage } = useErrorHandlerForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [isEdite, setIsEdite] = useState<boolean>(false);
    const [busnessNumber, setBusnessNumber] = useState<InputElements>(defaultBusniessNumber)
    const [pharmacyName, setPharmacyName] = useState<InputElements>(defaultPharmacyName)
    const [pharmacyAddress, setPharmacyAddress] = useState<InputElements>(defaultPharmacyAddress)
    const pharmacyMiddleware = new PharmacyMiddleware();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    useEffect(() => {
        const getPharmacyInfo = async () => {
            const res = await pharmacyMiddleware.getPharmacy();
            if (isSuccess(res)) {
                setIsEdite(res.data.userRole == PharmacyUserRoleCode.ADMIN ? false : true);
                setBusnessNumber({ ...busnessNumber, value: res.data.businessNumber });
                setPharmacyName({ ...pharmacyName, value: res.data.name });
                setPharmacyAddress({ ...pharmacyAddress, value: res.data.address });
            }
        }

        getPharmacyInfo();

    }, [])

    const handlerOnClickUnConnect = async () => {
        setIsConfirmModalOpen({
            title: "약국 연결을 해제하시겠습니까?",
            confirmButton: {
                width: 5,
                label: "확인",
                handleOnClick: async () => {
                    setDeleteLoading(true)
                    const res = await pharmacyMiddleware.unConnectPharmacy();
                    await setTimeout(() => {
                        setModalMessage("")
                        if (isSuccess(res)) {
                            navigate("/account/pharmacy");
                        } else {
                            setIsConfirmModalOpen({
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
                    }, 1000);
                    setDeleteLoading(false)
                }
            },
            cancelButton: {
                width: 5,
                label: "취소",
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
            },
            isOpen: true
        })
    }

    const handlerOnClickDelete = async () => {
        setIsConfirmModalOpen({
            title: "약국을 삭제하시겠습니까?",
            confirmButton: {
                width: 5,
                label: "확인",
                handleOnClick: async () => {
                    setDeleteLoading(true)
                    const res = await pharmacyMiddleware.deletePharmacy();
                    if (isSuccess(res)) navigate("/account/pharmacy")
                    else {
                        setIsConfirmModalOpen({
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
                    setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
                    setDeleteLoading(false)
                }
            },
            cancelButton: {
                width: 5,
                label: "취소",
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
            },

            isOpen: true
        })
    }

    const handlerOnSubmit = async () => {
        setLoading(true)
        const res = await pharmacyMiddleware.updatePharmacy({
            businessNumber: busnessNumber.value,
            name: pharmacyName.value,
            address: pharmacyAddress.value
        });


        setLoading(false)
    }

    const LeftActions = [{
        event: () => navigate(-1),
        iconType: BackIcon
    }]


    const rightActions = [{
        event: () => handlerOnSubmit,
        text: "수정"
    }]

    return (
        <WithNoGuttersTopAndBottomLayout>
            <ChangeDataWithApiHeaderNagigation
                label="내 약국 정보"
                onSubmit={handlerOnSubmit}
                state={loading} />
            <WithGuttersLeftAndRightLayoutForNotScroll>
                <InputWithLable style={{ width: "100%", marginTop: "2rem" }}
                    elements={{ ...busnessNumber, disabled: isEdite }}
                    onChange={setBusnessNumber} />
                <InputWithLable style={{ width: "100%", marginTop: "2rem" }}
                    elements={{ ...pharmacyName, disabled: isEdite }}
                    onChange={setPharmacyName} />
                <InputWithLable style={{ width: "100%", marginTop: "2rem" }}
                    elements={{ ...pharmacyAddress, disabled: isEdite }}
                    onChange={setPharmacyAddress} />
            </WithGuttersLeftAndRightLayoutForNotScroll>
            {
                !isEdite ?
                    <BottomWrapper>
                        <BorderButton
                            id="delete"
                            label="약국 데이터 삭제"
                            handleOnClick={handlerOnClickDelete}
                            disabled={false}
                            {...style6} />
                    </BottomWrapper>
                    :
                    <BottomWrapper>
                        <BorderButton
                            id="un-connect"
                            label="약국 연결 해제"
                            handleOnClick={handlerOnClickUnConnect}
                            disabled={false}
                            {...style6} />
                    </BottomWrapper>
            }
        </WithNoGuttersTopAndBottomLayout >
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
export default ChangePharmacyPage;