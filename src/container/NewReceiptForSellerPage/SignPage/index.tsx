import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import ErrorIcon from "@images/icons/modal-error.svg"
import Signature from "@components/SignatureCanvas";
import GoodsPurchaseDetailsMiddleware from "@middleware/goods-purchase-details.middleware";
import S3Middleware from "@middleware/s3.middleware";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import { theme } from "@styles/theme";
import Flex from "@components/Flex";
import FillButton from "@components/FillButton";
import { style5 } from "@utils/theme/button/style5";
import { style3 } from "@utils/theme/button/style3";
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import LabelOnTheCenterAndBothActionButtons from "@components/HeaderNavigation/LabelOnTheCenterAndBothActionButtons";
import { isSuccess } from "@utils/options";
import useLocalStorage from "@hooks/useLocalStorage";
import { ChatMessageTypeCode } from "@utils/common-status-code";
import axios from "axios";
import useGoodsReceipt from "@hooks/useGoodsReceipt";
import WithGuttersFourSidesLayoutForScroll from "@components/Layout/WithGuttersFourSidesLayoutForScroll";
import { Document, Page } from 'react-pdf';
import styled from "styled-components";
import Typography from "@components/Typograpy";
import DoubleEllipseIcon from "@images/icons/doubleEllipse.svg"
import { motion } from "framer-motion";
import SignModal from "./SignModal";
import PharmacyMiddleware from "@middleware/pharmacy";
import ReceiptConfirmModal from "@components/ReceiptConfirmModal";
import ConfireModalDTO from "@dto/confirm-modal.dto";
const SignPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const goodsPurchaseDetailsMiddleware = new GoodsPurchaseDetailsMiddleware();
    const navigate = useNavigate();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();
    const [receiptModalOpen, setReceiptModalOpen] = useState<ConfireModalDTO>({} as ConfireModalDTO);

    const [signatureData, setSignatureData] = useState<any>();

    const s3Middleware = new S3Middleware();

    const Validation = () => {
        if (!signatureData) {
            return setIsConfirmModalOpen({
                isOpen: true,
                title: `서명은 필수 입력 항목입니다.`,
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "확인",
                    width: 10
                }
            })
        }

    }
    const { getLocalStorage, rmLocalStorage } = useLocalStorage();

    const Popup = (
        <div>
            <ul>
                <li>
                    전자서명 및 전자문서의 법적 효력에 대해 동의합니다.
                </li>
                <li>
                    서명완료 후  전송되는 전자문서를 원본으로 인정합니다
                </li>
                <li>
                    모든 서명자가 전자서명에 정당한 권한을 가지는 것을 확인했습니다.
                </li>
                <li>
                    기타 자세한 내용은 전자서명 이용약관에 따라 동의합니다.
                </li>
            </ul>
        </div>
    )


    const onSubmit = async () => {
        const goodsId = getLocalStorage('goodsId')
        const buyerId = getLocalStorage('buyerId')
        const receipt = getLocalStorage('receipt')

        Validation();

        const createRecipet = () => {
            signatureData.toBlob(async (blob: any) => {
                setLoading(true);
                const s3Res = await s3Middleware.createSignatureImage(blob);
                if (isSuccess(s3Res)) {
                    const updateRes = await goodsPurchaseDetailsMiddleware.create({
                        ...receipt,
                        goodsId: goodsId,
                        buyerId: buyerId,
                        buyerSignature: "",
                        sellerSignature: s3Res.data.imageUrl
                    })
                    if (isSuccess(updateRes)) {
                        const res = await axios.post("https://api.gyopoom.kr:38120/chat/rooms", {
                            secondUser: updateRes.data.otherUserId,
                            goodsId: updateRes.data.goodsId
                        })
                        if (res.status == 201 || res.status == 200) {
                            rmLocalStorage('goodsId');
                            rmLocalStorage('buyerId');
                            rmLocalStorage('receipt');
                            return navigate(`/my-chat/room/${res.data.roomId}`, {
                                state: {
                                    text: JSON.stringify({
                                        sellerName: updateRes.data.sellerName,
                                        sellerPharmacyName: updateRes.data.sellerPharmacyName,
                                        buyerName: updateRes.data.buyerName,
                                        buyerPharmacyName: updateRes.data.buyerPharmacyName,
                                        goodsTitle: updateRes.data.goodsTitle,
                                        idForButton: updateRes.data.idForButton,
                                    }),
                                    type: ChatMessageTypeCode.purchaseInProgress
                                }
                            })
                        }
                        return navigate(`../${res.data.id}/new-receipt`, { replace: true })
                    }
                    setLoading(false);
                    return setIsConfirmModalOpen({
                        isOpen: true,
                        title: updateRes.message,
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
                    title: s3Res.message,
                    icon: ErrorIcon,
                    confirmButton: {
                        handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                        label: "확인",
                        width: 10
                    }
                })
            })
        }

        setReceiptModalOpen({
            isOpen: true,
            title: `전자서명에 대한 동의`,
            confirmButton: {
                handleOnClick: async () => {
                    setReceiptModalOpen({ ...isConfirmModalOpen, isOpen: false })
                    createRecipet()
                },
                label: "동의하고 서명완료",
                width: 6
            },
            cancelButton: {
                handleOnClick: async () => setReceiptModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                label: "취소",
                width: 4
            }
        })
    }


    const { getPreviewReceiptPDF } = useGoodsReceipt();

    const goodsId = getLocalStorage('goodsId')
    const buyerId = getLocalStorage('buyerId')
    const [pdfFile, setPdfFile] = useState();


    const getFirstPdf = async () => {
        if (goodsId && buyerId) {
            const res = await getPreviewReceiptPDF(goodsId, buyerId)
            setPdfFile(res.data);

        } else {
            return setIsConfirmModalOpen({
                isOpen: true,
                title: "잘못된 접근 입니다",
                confirmButton: {
                    handleOnClick: () => {
                        navigate(-1);
                        setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false });
                    },
                    label: "확인",
                    width: 10
                },
            })
        }
    }

    const getPdf = async (signImage: string) => {
        if (goodsId && buyerId) {
            const res = await getPreviewReceiptPDF(goodsId, buyerId, signImage)
            setPdfFile(res.data);

        } else {
            return setIsConfirmModalOpen({
                isOpen: true,
                title: "잘못된 접근 입니다",
                confirmButton: {
                    handleOnClick: () => {
                        navigate(-1);
                        setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false });
                    },
                    label: "확인",
                    width: 10
                },
            })
        }
    }
    const pharmacyMiddleware = new PharmacyMiddleware();

    useEffect(() => {
        const getMyEnrollPharmacy = async () => {
            const res = await pharmacyMiddleware.getMyEnrollPharmacy();
            if (!isSuccess(res)) {
                setIsConfirmModalOpen({
                    icon: ErrorIcon,
                    title: "약국정보를 먼저 입력해주세요.",
                    label: `원활한 교품거래와 거래내역서 작성을 위해 약국정보 입력은 필수입니다.`,
                    confirmButton: {
                        bgColor: theme.color.B300,
                        textColor: theme.color.N0,
                        width: 6,
                        label: "약국정보 입력",
                        handleOnClick: () => {
                            setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
                            navigate("/account/pharmacy/enroll")
                        }
                    },
                    isOpen: true
                })
            }
        }
        getMyEnrollPharmacy();
    }, [])

    useEffect(() => {
        getFirstPdf()
    }, [])

    const Actions = [
        {
            event: () => navigate(-1),
            iconType: BackIcon
        }
    ]


    const handleSignatureInput = async (data: any): Promise<boolean> => {
        setSignatureData(data)
        if (data) {
            await data.toBlob(async (blob: any) => {
                const s3Res = await s3Middleware.createSignatureImage(blob);
                if (isSuccess(s3Res)) {
                    await getPdf(s3Res.data.imageUrl)
                    setIsOpen(false);
                    return true
                }
            })

        }
        return false
    }

    return (
        <WithNoGuttersTopAndBottomLayout bg={theme.color.N0}>
            <LabelOnTheCenterAndBothActionButtons
                label="거래내역서 날인하기" leftActions={Actions} />
            <WithGuttersFourSidesLayoutForScroll bg={theme.color.N20}>
                <Wrapper>
                    <Document
                        className="pdf-wrapper"
                        file={pdfFile}
                        onLoadError={console.error}>
                        <Page pageNumber={1} />
                        <Button
                            onClick={() => setIsOpen(true)}
                            animate={{
                                scale: [1, 1.2, 1, 1.2, 1],
                            }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.5, 0.8, 1],
                                repeat: Infinity,
                                repeatDelay: 1
                            }}>
                            <img src={DoubleEllipseIcon} />
                            <Typography.H75B color={theme.color.B300}>싸인입력</Typography.H75B>
                        </Button>
                    </Document>
                </Wrapper>
                <SignModal
                    isOpen={isOpen}
                    isClose={setIsOpen}
                    getSignature={handleSignatureInput} />
            </WithGuttersFourSidesLayoutForScroll>
            <Flex style={{
                width: "100%",
                padding: "1.2rem 1.6rem",
                borderTop: `1px solid ${theme.color.N40}`,
                background: theme.color.N0,
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div>
                    <FillButton
                        id="prev-button"
                        label="수정하기"
                        disabled={false}
                        handleOnClick={() => navigate('/new-purchase-details/prod', { replace: true })}
                        {...style5} />
                </div>
                {
                    signatureData ?
                        <div>
                            <FillButton
                                id="next-button"
                                label="다음"
                                loading={loading}
                                disabled={false}
                                handleOnClick={onSubmit}
                                {...style3} />
                        </div> : <Typography.P200>싸인 입력을 클릭해주세요.</Typography.P200>
                }

            </Flex>
            <ReceiptConfirmModal
                isOpen={receiptModalOpen.isOpen}
                confirmButton={receiptModalOpen.confirmButton}
                cancelButton={receiptModalOpen.cancelButton}
                title={receiptModalOpen.title}
                label={receiptModalOpen.label}
                icon={receiptModalOpen.icon} />
        </WithNoGuttersTopAndBottomLayout>
    )
}

const Wrapper = styled.div`
    height: 100%;
    .react-pdf__Page__canvas{

        width: 100% !important;
        height: auto !important;
    }

    .pdf-wrapper{
        position: relative;
    }
`

const Button = styled(motion.button)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    position: absolute;
    right: 10px;
    bottom: 20px;
    padding: 0;

    @media ${theme.device.smMoblie}{
        img{
            width: 40px;
        }
        width: 120px;
        height: 40px;
    }
    border-radius: 50px;
    width: 150px;
    height: 50px;
    background: ${theme.color.N0};
    border: 1px solid ${theme.color.B300};

    h1{
        @media ${theme.device.smMoblie}{
            margin-left: 1rem;
    }
        margin-left: 1.2rem;
    }
`



export default SignPage 