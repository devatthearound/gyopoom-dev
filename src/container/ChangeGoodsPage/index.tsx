import { isSuccess } from "@utils/options";
import GoodsMiddleware from "@middleware/goods.middleware";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import InputElements from "@dto/input.elements";
import SingleImageUploadBoxWithCameraIcon from "@components/SingleImageUploadBoxWithCameraIcon";
import ChangeDataWithApiHeaderNagigation from "@components/ChangeDataWithApiHeaderNagigation";
import InputNoLabel from "@components/Input/InputNoLabel";
import TextAreaNoLabel from "@components/TextArea/NoLabel";
import DollarIcon from "@images/icons/dollar.svg"
import RadioBox from "@components/RadioBox";
import Flex from "@components/Flex";
import { theme } from "@styles/theme";
import { defaultContent, defaultExchangeGoods, defaultImage, defaultIsNegotiation, defaultPrice, defaultQuantity, defaultTitle } from "@utils/update-goods.input";
import DownToUpPageTransition from "@components/animation/DownToUpPageTransition";
import Typography from "@components/Typograpy";
import RadioSquareButton from "@components/RadioButton";
import { DeliveryMethod } from "@utils/common-status-code";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/blue_error.svg"
import MedicationEntity from "@dto/medication.entity";
import MedicationSearchCard from "./MedicationSearchCard";
import { debounce } from "lodash";

const ChangeGoods = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const goodsMiddleware = new GoodsMiddleware();
    const [loading, setLoading] = useState<boolean>(false);
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const [image, setImage] = useState<InputElements>(defaultImage)
    const [prodCode, setProdCode] = useState<MedicationEntity>()
    const [title, setTitle] = useState<InputElements>(defaultTitle)
    const [quantity, setQuantity] = useState<InputElements>(defaultQuantity)
    const [price, setPrice] = useState<InputElements>(defaultPrice)
    const [isNegotiation, setIsNegotiation] = useState<InputElements>(defaultIsNegotiation)
    const [exchangeGoods, setExchangeGoods] = useState<InputElements>(defaultExchangeGoods)
    const [deliveryMethod, setDeliveryMethod] = useState<string>({} as string)
    const [content, setContent] = useState<InputElements>(defaultContent)
    const [defaultGoodsImage, setDefaultGoodsImage] = useState<string>("")


    const getGoods = async () => {
        if (id) {
            const res = await goodsMiddleware.getGoodsById(id);
            if (isSuccess(res)) {
                setDefaultGoodsImage(res.data.imageUrls[0].file)

                setImage({ ...image, value: res.data.imageUrls[0].file })
                setTitle({ ...title, value: res.data.title })
                setDeliveryMethod(res.data.deliveryMethod)
                setPrice({ ...price, value: res.data.price })
                setQuantity({ ...price, value: res.data.quantity })
                setIsNegotiation({ ...isNegotiation, value: res.data.isNegotiation })
                setExchangeGoods({ ...exchangeGoods, value: res.data.exchangeGoods })
                setContent({ ...content, value: res.data.content })
                setProdCode({
                    method: res.data.method,
                    KFDAClassify: res.data.KFDAClassify,
                    mainElementCode: res.data.mainElementCode,
                    prodCode: res.data.prodCode,
                    prodName: res.data.prodName,
                    company: res.data.company,
                    standard: res.data.standard,
                    unit: res.data.unit,
                    unitPrice: res.data.unitPrice,
                    etc: res.data.etc,
                })
            }
        }
    };

    useEffect(() => {
        getGoods();
    }, [])

    const handlerOnSubmit = async () => {
        if (image.invalid || image.value.length <= 0) return setIsConfirmModalOpen({
            isOpen: true,
            title: "사진은 필수 입력 항목입니다.",
            icon: ErrorIcon,
            confirmButton: {
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                label: "확인",
                width: 10
            }
        })

        if (title.value.length <= 0) return setIsConfirmModalOpen({
            isOpen: true,
            title: "제목 필수 입력 항목입니다.",
            icon: ErrorIcon,
            confirmButton: {
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                label: "확인",
                width: 10
            }
        })


        if (quantity.invalid || !quantity.value) return setIsConfirmModalOpen({
            isOpen: true,
            title: "수량은 필수 입력 항목입니다.",
            icon: ErrorIcon,
            confirmButton: {
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                label: "확인",
                width: 10
            }
        })


        if (deliveryMethod === "") return setIsConfirmModalOpen({
            isOpen: true,
            title: "거래형태를 선택 해주세요.",
            icon: ErrorIcon,
            confirmButton: {
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                label: "확인",
                width: 10
            }
        })

        if (price.invalid || !price.value) return setIsConfirmModalOpen({
            isOpen: true,
            title: "가격은 필수 입력 항목입니다.",
            icon: ErrorIcon,
            confirmButton: {
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                label: "확인",
                width: 10
            }
        })

        if (content.invalid || content.value.length < 0) return setIsConfirmModalOpen({
            isOpen: true,
            title: "내용은 필수 입력 항목입니다.",
            icon: ErrorIcon,
            confirmButton: {
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                label: "확인",
                width: 10
            }
        })

        setLoading(true)

        if (id) {
            const apiRes = await goodsMiddleware.updateGoods(id, {
                imageUrls:
                    [{
                        order: 0,
                        file: image.value
                    }],
                title: title.value,
                quantity: quantity.value,
                price: price.value,
                isNegotiation: isNegotiation.value,
                exchangeGoods: exchangeGoods.value,
                content: content.value,
                deliveryMethod: deliveryMethod,
                method: prodCode?.method,
                KFDAClassify: prodCode?.KFDAClassify,
                mainElementCode: prodCode?.mainElementCode,
                prodCode: prodCode?.prodCode,
                prodName: prodCode?.prodName,
                company: prodCode?.company,
                standard: prodCode?.standard,
                unit: prodCode?.unit,
                unitPrice: prodCode?.unitPrice,
                etc: prodCode?.etc
            });

            if (isSuccess(apiRes)) {
                return navigate(`/${id}`)
            }
            return setIsConfirmModalOpen({
                isOpen: true,
                title: apiRes.message,
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "확인",
                    width: 10
                }
            })
        }

        return setIsConfirmModalOpen({
            isOpen: true,
            title: "카테고리, 제목, 내용은 필수 입력 항목입니다.",
            icon: ErrorIcon,
            confirmButton: {
                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                label: "확인",
                width: 10
            }
        })
    }

    const [searchValue, setSearchValue] = useState<string>("")



    const debouncedSearch = useCallback(
        debounce(val => {
            if (val == "") setProdCode(undefined)
            setSearchValue(val)
        }, 0),
        [searchValue]
    )

    const handleChange = useCallback(
        (e: any) => {
            setTitle(e)
            debouncedSearch(e.value)
        },
        [debouncedSearch]
    )

    const handleOnClickMedication = (medication: MedicationEntity) => {
        setTitle({ ...title, value: medication.prodName })
        setSearchValue("")
        setProdCode(medication)
    }

    const [isFocus, setIsFocus] = useState<boolean>(false);

    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocus(true)
    }

    const searchRef = useRef<HTMLDivElement>(null);

    const handleOurSideClickEvent = useCallback((e: any) => {

        if (!searchRef.current?.contains(e.target)) {
            console.log(isFocus)
            setIsFocus(false)
        }
    }, [isFocus]);

    useEffect(() => {
        window.addEventListener('mousedown', handleOurSideClickEvent);
        return () => {
            window.addEventListener('mousedown', handleOurSideClickEvent);
        }
    }, [handleOurSideClickEvent]);


    return (
        <WithNoGuttersTopAndBottomLayout>
            <DownToUpPageTransition>
                <ChangeDataWithApiHeaderNagigation label="글수정" onSubmit={handlerOnSubmit} state={loading} />
                {
                    defaultGoodsImage &&
                    <InputWrapper>
                        <SingleImageUploadBoxWithCameraIcon
                            defaultValue={defaultGoodsImage}
                            elements={image}
                            onChange={setImage} />
                    </InputWrapper>
                }
                <div ref={searchRef}>
                    <InputWrapper>
                        <InputNoLabel
                            elements={title}
                            onChange={handleChange}
                            onFocus={onFocus} />
                    </InputWrapper>
                    {
                        isFocus && <MedicationSearchCard keyword={searchValue} onSeleted={handleOnClickMedication} />
                    }
                </div>
                <InputWrapper>
                    <Typography.P100 color={theme.color.N800}>거래방식</Typography.P100>
                    <Flex style={{ marginTop: "1rem" }}>
                        <RadioSquareButton
                            elements={{
                                name: "MEET",
                                type: "radio",
                                label: "직거래",
                                checked: deliveryMethod === DeliveryMethod.MEET,
                                value: DeliveryMethod.MEET
                            }}
                            onChange={setDeliveryMethod} />
                        <RadioSquareButton
                            elements={{
                                name: "PARCEL",
                                type: "radio",
                                label: "택배배송",
                                checked: deliveryMethod === DeliveryMethod.PARCEL,
                                value: DeliveryMethod.PARCEL
                            }}
                            onChange={setDeliveryMethod} />
                    </Flex>
                </InputWrapper>
                <InputWrapper>
                    <Flex>
                        <InputNoLabel
                            style={{ flex: "1" }}
                            icon={DollarIcon}
                            elements={price}
                            onChange={setPrice} />
                        <RadioBox
                            elements={isNegotiation}
                            onChange={setIsNegotiation} />
                    </Flex>
                </InputWrapper>
                <InputWrapper>
                    <InputNoLabel
                        style={{ flex: "1" }}
                        elements={{ ...exchangeGoods }}
                        onChange={setExchangeGoods} />
                </InputWrapper>

                <InputWrapper>
                    <TextAreaNoLabel
                        elements={content}
                        onChange={setContent} />
                </InputWrapper>

            </DownToUpPageTransition>
        </WithNoGuttersTopAndBottomLayout>
    )
}

const InputWrapper = styled.div`
    width: 100%;
    border-top: 1px solid ${theme.color.N30};
    padding: 2.4rem 1.6rem;
`

const Ul = styled.div`

`

export default ChangeGoods;