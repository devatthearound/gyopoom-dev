import Flex from "@components/Flex";
import { theme } from "@styles/theme";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components";
import Typography from "@components/Typograpy";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import ErrorIcon from "@images/icons/modal-error.svg"
import "react-datepicker/dist/react-datepicker.css";
import GoodsPurchaseDetailsMiddleware from "@middleware/goods-purchase-details.middleware";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import { style5 } from "@utils/theme/button/style5";
import FillButton from "@components/FillButton";
import WithNoGuttersForScroll from "@components/Layout/WithNoGuttersForScroll";
import { style3 } from "@utils/theme/button/style3";
import GoodsMiddleware from "@middleware/goods.middleware";
import InputWithLableDefault from "@components/Input/InputWithLableDefault";
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import {
    prodCode,
    prodName,
    company,
    unit,
    unitPrice,
    quantity,
    price
} from "@utils/create-receipt.input";
import useLocalStorage from "@hooks/useLocalStorage";
import ReceiptEntity from "@dto/receipt.entity";
import { isSuccess } from "@utils/options"
import LabelOnTheCenterAndBothActionButtons from "@components/HeaderNavigation/LabelOnTheCenterAndBothActionButtons";

const MedicinePage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();
    const { getLocalStorage } = useLocalStorage();
    const [receipt, setReceipt] = useState<ReceiptEntity>({} as ReceiptEntity);
    const goodsMiddleware = new GoodsMiddleware();

    useEffect(() => {
        const getMedicine = async () => {
            const medicine = await goodsMiddleware.getGoodsMedicine(goodsId);
            if (isSuccess(medicine)) {
                setReceipt({
                    prodCode: medicine.data.prodCode,
                    prodName: medicine.data.prodName,
                    company: medicine.data.company,
                    unit: medicine.data.unit,
                    standard: medicine.data.standard,
                    unitPrice: medicine.data.unitPrice,
                    quantity: medicine.data.quantity,
                    price: medicine.data.price,
                })
            }
        }
        getMedicine();
    }, [])
    const inputStyle = {
        marginTop: "1.5rem"
    }

    const Validation = () => {
        if (receipt.prodCode.length <= 0) {
            setIsConfirmModalOpen({
                isOpen: true,
                title: `${prodCode.label}은 필수 입력 항목입니다.`,
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "확인",
                    width: 10
                }
            })
            return false;
        }
        if (receipt.prodName.length <= 0) {
            setIsConfirmModalOpen({
                isOpen: true,
                title: `${prodName.label}은 필수 입력 항목입니다.`,
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "확인",
                    width: 10
                }
            })
            return false;
        }
        if (receipt.company.length <= 0) {
            setIsConfirmModalOpen({
                isOpen: true,
                title: `${company.label}은 필수 입력 항목입니다.`,
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "확인",
                    width: 10
                }
            })
            return false;
        }
        if (!receipt.unit) {
            setIsConfirmModalOpen({
                isOpen: true,
                title: `${unit.label}은 필수 입력 항목입니다.`,
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "확인",
                    width: 10
                }
            })
            return false;
        }
        if (!receipt.quantity) {
            setIsConfirmModalOpen({
                isOpen: true,
                title: `${quantity.label}은 필수 입력 항목입니다.`,
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "확인",
                    width: 10
                }
            })
            return false;
        }
        if (!receipt.price) {
            setIsConfirmModalOpen({
                isOpen: true,
                title: `${price.label}은 필수 입력 항목입니다.`,
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "확인",
                    width: 10
                }
            })
            return false;
        }
        if (!receipt.unitPrice) {
            setIsConfirmModalOpen({
                isOpen: true,
                title: `${unitPrice.label}은 필수 입력 항목입니다.`,
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "확인",
                    width: 10
                }
            })
            return false;
        }
        return true;
    }

    const navigate = useNavigate();


    const goodsId = getLocalStorage("goodsId")

    const onSubmit = async () => {
        const validation = Validation();
        if (validation) {
            setLoading(true);
            const res = await goodsMiddleware.updateGoods(goodsId, {
                prodCode: receipt.prodCode,
                prodName: receipt.prodName,
                company: receipt.company,
                unit: receipt.unit,
                unitPrice: receipt.unitPrice,
                quantity: receipt.quantity,
                price: receipt.price
            })
            setLoading(false);
            if (isSuccess(res)) return navigate('../new-purchase-details', {replace: true})
        }
    }

    const onChange = (name: string, value: string) => {
        setReceipt(old => ({ ...old, [name]: value }));
    }

    const Actions = [
        {
            event: () => navigate('../new-purchase-details', {replace: true}),
            iconType: BackIcon
        }
    ]

    return (
        <WithNoGuttersTopAndBottomLayout bg={theme.color.N0}>
            <LabelOnTheCenterAndBothActionButtons
                label="거래내역서 날인하기" leftActions={Actions} />
            <WithNoGuttersForScroll bg={theme.color.N20}>
                <Wrapper>
                    <InputWithLableDefault
                        style={{ flex: "1", ...inputStyle }}
                        elements={{ ...prodCode, value: receipt.prodCode }}
                        onChange={onChange} />
                    <InputWithLableDefault
                        style={inputStyle}
                        elements={{ ...prodName, value: receipt.prodName }}
                        onChange={onChange} />
                    <InputWithLableDefault
                        style={inputStyle}
                        elements={{ ...company, value: receipt.company }}
                        onChange={onChange} />
                    <Flex>
                        <InputWithLableDefault
                            style={{
                                flex: "1",
                                marginRight: "1.5rem",
                                ...inputStyle
                            }}
                            elements={{ ...unit, value: receipt.unit }}
                            onChange={onChange} />
                        <InputWithLableDefault
                            style={{
                                flex: "1",
                                ...inputStyle
                            }}
                            elements={{
                                ...quantity,
                                value: receipt.quantity
                            }}
                            onChange={onChange} />
                    </Flex>
                    <Flex>
                        <InputWithLableDefault
                            style={{
                                flex: "1",
                                marginRight: "1.5rem",
                                ...inputStyle
                            }}
                            elements={{ ...unitPrice, value: receipt.unitPrice }}
                            onChange={onChange} />
                        <InputWithLableDefault
                            style={{ flex: "1", ...inputStyle }}
                            elements={{ ...price, value: receipt.price }}
                            onChange={onChange} />
                    </Flex>
                </Wrapper >
            </WithNoGuttersForScroll>
            <Flex style={{
                width: "100%",
                padding: "1.2rem 1.6rem",
                borderTop: `1px solid ${theme.color.N40}`,
                background: theme.color.N0,
                justifyContent: "space-between"
            }}>
                <div>
                    <FillButton
                        id="prev-button"
                        label="이전"
                        disabled={false}
                        handleOnClick={() => navigate("../new-purchase-details", {replace: true})}
                        {...style5} />
                </div>
                <div>
                    <FillButton
                        id="next-button"
                        label="수정완료"
                        loading={loading}
                        disabled={loading}
                        handleOnClick={onSubmit}
                        {...style3} />
                </div>
            </Flex>
        </WithNoGuttersTopAndBottomLayout >
    )
}

const Wrapper = styled.div`
    padding: 2rem;
    background-color: ${theme.color.N0};
`;


const DatePickerWrapper = styled.div`
    position: relative;
    margin-top: 0.6rem;
    width:100%;
    cursor: pointer;
    input{
    display: block;
    width: 100%;
    margin-top: 0.4rem;
    padding: 1.3rem 1rem;
    border-radius: 0.8rem;
    border: 1px solid ${theme.color.N40};
    font-size: ${theme.fontSize.H50};
    color:  ${theme.color.N900};
    transition: 0.2s;
    cursor: pointer;
    ::placeholder{
        color: ${theme.color.N400};
    }
    :hover{
        border: 1px solid ${theme.color.B300};
    }
    :focus {
        border: 1px solid ${theme.color.B300};
    }
    :disabled{
        border: 0px;
        color: ${theme.color.N50}
    }   
}

    .react-datepicker__navigation-icon::before{
        border-width: 2px 2px 0 0;
        height: 6px;
        width: 6px;
    }
    .react-datepicker__navigation{
        height: 25px;
        width: 25px;
    }
    .react-datepicker__header:not(.react-datepicker__header--has-time-select){
        border-top-right-radius: 0.8rem !important;
    }
    .react-datepicker__header {
        border-radius: 0.8rem 0.8rem 0 0;
        background-color: #ffffff !important;
        border-bottom: #ffffff !important;
    }
    .react-datepicker__month{
        border-top-right-radius: 0.8rem !important;
    }
    .react-datepicker{
        border-radius: 0.8rem !important;
    }

`

const Label = styled(Typography.P100M)`
    display: block;
`

export default MedicinePage 