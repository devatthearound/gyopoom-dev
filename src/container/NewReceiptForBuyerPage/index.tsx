import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import ErrorIcon from "@images/icons/modal-error.svg"
import Signature from "@components/SignatureCanvas";
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
import { ChatMessageTypeCode } from "@utils/common-status-code";
import axios from "axios";
import WithGuttersFourSidesLayoutForScroll from "@components/Layout/WithGuttersFourSidesLayoutForScroll";
import UserGoodsReceiptMiddleware from "@middleware/user-goods-receipt.middleware";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Document, Page } from 'react-pdf';
import Typography from "@components/Typograpy";
import SignModal from "./SignModal";
import DoubleEllipseIcon from "@images/icons/doubleEllipse.svg"
import PharmacyMiddleware from "@middleware/pharmacy";
import useGoodsReceipt from "@hooks/useGoodsReceipt";
import ReceiptConfirmModal from "@components/ReceiptConfirmModal";
import ConfireModalDTO from "@dto/confirm-modal.dto";


const NewReceiptForBuyerPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();
    const [signatureData, setSignatureData] = useState<any>();
    const s3Middleware = new S3Middleware();
    const { goodsPurchaseDetailsId } = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { getPreviewReceiptPDFFormGoodsPurchaseDetails, deleteSign } = useGoodsReceipt();
    const [pdfFile, setPdfFile] = useState();
    const [receiptModalOpen, setReceiptModalOpen] = useState<ConfireModalDTO>({} as ConfireModalDTO);

    const Validation = () => {
        if (!signatureData) {
            setIsConfirmModalOpen({
                isOpen: true,
                title: `서명은 필수 입력 항목입니다.`,
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "확인",
                    width: 10
                }
            })
            return false
        }
        return true
    }
    const userGoodsReceiptMiddleware = new UserGoodsReceiptMiddleware();

    const onSubmit = async () => {
        const validation = Validation()

        const createRecipet = () => {
            if (goodsPurchaseDetailsId) {
                signatureData.toBlob(async (blob: any) => {
                    setLoading(true);
                    const s3Res = await s3Middleware.createSignatureImage(blob);
                    if (isSuccess(s3Res)) {
                        const receiptRes = await userGoodsReceiptMiddleware.create({
                            buyerSignature: s3Res.data.imageUrl
                        }, goodsPurchaseDetailsId)

                        if (isSuccess(receiptRes)) {
                            const res = await axios.post("https://api.gyopoom.kr:38120/chat/rooms", {
                                secondUser: receiptRes.data.otherUserId,
                                goodsId: receiptRes.data.goodsId
                            })

                            if (res.status == 201 || res.status == 200) {
                                return navigate(`/my-chat/room/${res.data.roomId}`, {
                                    state: {
                                        text: JSON.stringify({
                                            sellerName: receiptRes.data.sellerName,
                                            sellerPharmacyName: receiptRes.data.sellerPharmacyName,
                                            buyerName: receiptRes.data.buyerName,
                                            buyerPharmacyName: receiptRes.data.buyerPharmacyName,
                                            goodsTitle: receiptRes.data.goodsTitle,
                                            idForButton: receiptRes.data.idForButton,
                                        }),
                                        type: ChatMessageTypeCode.purchaseDone
                                    }
                                })
                            }
                            return navigate(`/${res.data.id}/new-receipt`)
                        }
                        setLoading(false);
                        return setIsConfirmModalOpen({
                            isOpen: true,
                            title: receiptRes.message,
                            icon: ErrorIcon,
                            confirmButton: {
                                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                                label: "확인",
                                width: 10
                            }
                        })
                    }
                    setLoading(false);
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
        }

        if (validation) {
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
    }

    const Actions = [
        {
            event: () => navigate(-1),
            iconType: BackIcon
        }
    ]

    const getPdf = async (buyerSign?: string) => {
        if (goodsPurchaseDetailsId) {
            const res = await getPreviewReceiptPDFFormGoodsPurchaseDetails(goodsPurchaseDetailsId, buyerSign)
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


    useEffect(() => {
        getPdf()
    }, [])


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


    const handleSignatureInput = async (data: any): Promise<boolean> => {
        setSignatureData(data)
        if (data) {
            await data.toBlob(async (blob: any) => {
                const s3Res = await s3Middleware.createSignatureImage(blob);
                if (isSuccess(s3Res)) {
                    await getPdf(s3Res.data.imageUrl)
                    setIsOpen(false);
                }
            })
            return true
        }
        return false
    }

    const handleCancleButton = () => {
        // setIsConfirmModalOpen({
        //     isOpen: true,
        //     title: "거래내역서 작성을 취소하시겠습니까?",
        //     icon: ErrorIcon,
        //     confirmButton: {
        //         handleOnClick: () => {
        //             if (goodsPurchaseDetailsId) {
        //                 deleteSign(goodsPurchaseDetailsId);
        //                 setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
        //                 navigate(-1);
        //             }
        //         },
        //         label: "확인",
        //         width: 5
        //     },
        //     cancelButton: {
        //         handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
        //         label: "취소",
        //         width: 5
        //     }
        // })
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
                        label="거절하기"
                        disabled={false}
                        handleOnClick={handleCancleButton}
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


export default NewReceiptForBuyerPage 