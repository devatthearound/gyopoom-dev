import WithGuttersLeftAndRightLayoutForNotScroll from "@components/Layout/WithGuttersLeftAndRightLayoutForNotScroll";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import FillButton from "@components/FillButton";
import Typography from "@components/Typograpy";
import InputElements from "@dto/input.elements";
import InputWithLable from "@components/Input/InputWithLable";
import { theme } from "@styles/theme";
import { defaultBusniessNumber, defaultPharmacyAddress, defaultPharmacyName } from "@utils/create-pharmacy.input";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import { useNavigate } from "react-router-dom";
import NoLabelAndBothActionButtons from "@components/HeaderNavigation/NoLabelAndBothActionButtons";
import PharmacyMiddleware from "@middleware/pharmacy";
import { isSuccess } from "@utils/options";
import { style1 } from "@utils/theme/button/style1";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/blue_error.svg"
import RegisterPharmacyRegister from "@components/BottomSheet/RegisterPharmacyRegister";
import usePharmacyStore from "@store/pharmcay";

const NewPharmacyPage = () => {
    const navigate = useNavigate();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [busnessNumber, setBusnessNumber] = useState<InputElements>(defaultBusniessNumber)
    const [pharmacyName, setPharmacyName] = useState<InputElements>(defaultPharmacyName)
    const [pharmacyAddress, setPharmacyAddress] = useState<InputElements>(defaultPharmacyAddress)
    const pharmacyMiddleware = new PharmacyMiddleware()
    const { storeBusnessNumber, storePharmacyName, storePharmacyAddress, setStoreBusnessNumber, setStorePharmacyName, setStorePharmacyAddress } = usePharmacyStore();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        if(storeBusnessNumber){
            setBusnessNumber({
                ...busnessNumber,
                invalid: !busnessNumber.regex.test(storeBusnessNumber.toString()),
                value: storeBusnessNumber
            })
            setPharmacyName({
                ...pharmacyName,
                invalid: !pharmacyName.regex.test(storePharmacyName),
                value: storePharmacyName
            })
            setPharmacyAddress({
                ...pharmacyAddress,
                invalid: !pharmacyAddress.regex.test(storePharmacyAddress),
                value: storePharmacyAddress
            })

            setIsOpen(!(busnessNumber.invalid == false && pharmacyName.invalid == false && pharmacyAddress.invalid == false))
        }
    },[])

    const handlerOnSubmit = async () => {
        setLoading(true)
        const res = await pharmacyMiddleware.createPharmacy({
            businessNumber: busnessNumber.value as number,
            name: pharmacyName.value,
            address: pharmacyAddress.value
        })

        if (isSuccess(res)) {
            if (res.status == 202) {
                setIsConfirmModalOpen({
                    isOpen: true,
                    title: "?????? ????????? ???????????????.",
                    icon: ErrorIcon,
                    confirmButton: {
                        handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                        label: "??????",
                        width: 10
                    }
                })
            } else {
                navigate("/pharmacy/enroll/end", { replace: true })
            }

        } else {
            setIsConfirmModalOpen({
                isOpen: true,
                title: res.message,
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "??????",
                    width: 10
                }
            })
        }

        setStoreBusnessNumber(null)
        setStorePharmacyName("")
        setStorePharmacyAddress("")

        setLoading(false)
    }

    const LeftActions = [{
        event: () => navigate(-1),
        iconType: BackIcon
    }]

    const handleSubmitChilck = () => {
        setStoreBusnessNumber(busnessNumber.value)
        setStorePharmacyName(pharmacyName.value)
        setStorePharmacyAddress(pharmacyAddress.value)
        setIsOpen(true)
    }

    return (
        <WithNoGuttersTopAndBottomLayout>
            <NoLabelAndBothActionButtons
                leftActions={LeftActions} />
            <WithGuttersLeftAndRightLayoutForNotScroll>
                <Typography.H200M
                    color={theme.color.N700}>
                    ??????????????? ??????????????????.
                </Typography.H200M>
                <Typography.P200
                    style={{ marginTop: "1.6rem" }}
                    color={theme.color.N700}>
                    ??????????????? ????????? ???????????? ?????? ???????????? ???????????????.
                    ????????? ????????? ????????????????????? ???????????????.
                </Typography.P200>
                <InputWithLable style={{ width: "100%", marginTop: "2rem" }}
                    elements={busnessNumber}
                    onChange={setBusnessNumber} />
                <InputWithLable style={{ width: "100%", marginTop: "2rem" }}
                    elements={pharmacyName}
                    onChange={setPharmacyName} />
                <InputWithLable style={{ width: "100%", marginTop: "2rem" }}
                    elements={pharmacyAddress}
                    onChange={setPharmacyAddress} />
            </WithGuttersLeftAndRightLayoutForNotScroll>
            <BottomWrapper>
                <FillButton
                    id="navigate"
                    label="???????????? ????????????"
                    handleOnClick={handleSubmitChilck}
                    disabled={!(busnessNumber.invalid == false && pharmacyName.invalid == false && pharmacyAddress.invalid == false)}
                    {...style1} />
            </BottomWrapper>
            <RegisterPharmacyRegister 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClickHandle={handlerOnSubmit} />
        </WithNoGuttersTopAndBottomLayout>
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
export default NewPharmacyPage;