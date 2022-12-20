import { useNavigate, useParams } from "react-router-dom";
import { isSuccess } from "@utils/options";
import { useQuery } from "react-query";
import 'moment/locale/ko';
import HeaderNavigation from "./HeaderNavigation";
import { ViewPDF } from "@components/PDFViewerModal/Viewer/PdfViewer";
import DefaultPageTransition from "@components/animation/DefaultPageTransition";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import styled from "styled-components";
import UserGoodsReceiptMiddleware from "@middleware/user-goods-receipt.middleware";
import { useCallback, useState } from "react";
import { theme } from "@styles/theme";
import PictureAsPdf from "@images/icons/picture_as_pdf.svg";
import PhotoLibrary from "@images/icons/photo_library.svg"
import MenuWrapper from "./Menu/Wrapper";
import MenuButton from "./Menu/Button";
import { useRef } from "react";
import useMoreStore from "./more.store";
import { toPng } from "html-to-image";
import BottomSheetWrapper from "@components/BasicModal/BottomSheetWrapper";
import BottomSheetBody from "@components/BasicModal/BottomSheetBody";
import InputWithLable from "@components/Input/InputWithLable";
import FillButton from "@components/FillButton";
import Flex from "@components/Flex";
import PrivateModal from "@components/PrivateModal";
import DownToUpPageTransition from "@components/animation/DownToUpPageTransition";
import InputElements from "@dto/input.elements";
import { defaultTitle } from "@utils/update-receipt-title.input";
import { modalCancleStyle } from "@utils/theme/button/modal-cancle";
import { modalComfirmStyle } from "@utils/theme/button/modal-confirm";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/blue_error.svg"

const DetailsGoodsReceiptPage = () => {
    const { userGoodsReceiptId } = useParams();
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [receiptTitle, setReceiptTitle] = useState<InputElements>(defaultTitle);

    const userGoodsReceiptMiddleware = new UserGoodsReceiptMiddleware();

    const getReceipt = async () => {
        if (userGoodsReceiptId) {
            const res = await userGoodsReceiptMiddleware.getOne(userGoodsReceiptId);
            if (isSuccess(res)) {
                setReceiptTitle({ ...receiptTitle, value: res.data.title });
                return res.data;
            } else {
                setIsConfirmModalOpen({
                    isOpen: true,
                    title: "삭제된 거래명세서입니다.",
                    icon: ErrorIcon,
                    confirmButton: {
                        handleOnClick: () => {
                            setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false });
                            navigate(-1)
                        },
                        label: "확인",
                        width: 10
                    }
                })
            }
        }
    };

    const { isLoading, data, refetch } = useQuery('receipt', getReceipt);
    const { state, setChangeState } = useMoreStore();

    const getFileName = (title: string, fileType: string) => `${title}.${fileType}`

    const downloadPng = useCallback(() => {
        if (ref.current === null || !data) {
            return
        }

        toPng(ref.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `${getFileName(data.title, 'png')}`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref, data]);

    const downloadPdf = () => {
        if (data) {
            const link = document.createElement('a')
            link.download = `${getFileName(data.title, 'png')}`
            link.href = data.pdfUrl
            link.click()
        }
    }

    const showDeleteModal = async () => {
        setChangeState(false)
        setIsConfirmModalOpen(
            {
                title: "정말로 삭제 하시겠습까?",
                icon: ErrorIcon,
                confirmButton: {
                    width: 5,
                    label: "아니오",
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
                },
                cancelButton: {
                    width: 5,
                    label: "네",
                    handleOnClick: () => {
                        setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false })
                        deleteReceipt()
                    }
                },
                isOpen: true
            }
        )
    }

    const deleteReceipt = async () => {
        if (data) {
            setChangeState(false)
            const res = await userGoodsReceiptMiddleware.delete(data.userGoodsReceiptsId);
            if (isSuccess(res)) {
                navigate(-1)
            }
        }
    }

    const showModal = () => {
        setChangeState(false)
        setIsShowModal(true)
    }

    const updateReceiptTitle = async () => {
        if (data) {
            setIsSubmit(true)
            const res = await userGoodsReceiptMiddleware.updateReceiptTitle(data.userGoodsReceiptsId, receiptTitle.value)
            if (isSuccess(res)) {
                setIsSubmit(false)
                setIsShowModal(false)
                refetch();
            }
        }
    }

    if (isLoading || !data) return <></>;

    return (
        <DefaultPageTransition>
            <WithNoGuttersTopAndBottomLayout bg={theme.color.N20}>
                <HeaderNavigation label={data.title} />
                <Container>
                    <ViewWrap ref={ref}>
                        <ViewPDF fileUrl={data.pdfUrl} />
                    </ViewWrap>
                </Container>
                <MenuWrapper>
                    <MenuButton label="이미지 저장" img={PictureAsPdf} handleOnClick={downloadPng} />
                    <MenuButton label="PDF 저장" img={PhotoLibrary} handleOnClick={downloadPdf} />
                </MenuWrapper>
            </WithNoGuttersTopAndBottomLayout>
            <PrivateModal isOpen={isShowModal}>
                <DownToUpPageTransition key="errorModal">
                    <ModalBox>
                        <InputWithLable
                            style={{ width: "100%", marginTop: "2rem" }}
                            elements={receiptTitle}
                            onChange={setReceiptTitle} />
                        <Flex style={{ justifyContent: "center", gap: "10px", marginTop: "2.4rem" }}>
                            <FillButton
                                id=""
                                disabled={false}
                                label="취소"
                                handleOnClick={() => setIsShowModal(false)}
                                {...modalCancleStyle} />
                            <FillButton
                                id=""
                                loading={isSubmit}
                                disabled={false}
                                label="수정 완료"
                                handleOnClick={updateReceiptTitle}
                                {...modalComfirmStyle} />
                        </Flex>
                    </ModalBox>
                </DownToUpPageTransition>
            </PrivateModal>
            <BottomSheetWrapper
                isMoreClick={state}
                setIsMoreClick={(value: boolean) => setChangeState(value)}>
                <BottomSheetBody
                    label="제목 수정"
                    id={data.userGoodsReceiptsId}
                    changeFC={showModal} />
                <BottomSheetBody
                    label="삭제"
                    id={data.userGoodsReceiptsId}
                    changeFC={showDeleteModal} />
            </BottomSheetWrapper>
        </DefaultPageTransition>
    )
}

const Container = styled.div`
    padding: 1.4rem 1.2rem;
    height:100%;
    overflow: scroll;
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`
const ViewWrap = styled.div`
    
`

const ModalBox = styled.div`
    width: 32.8rem;
    border-radius: 0.8rem;
    background-color: ${theme.color.N0};
    margin: auto;
    padding: 1.6rem 2.2rem;
    text-align: center;
`


export default DetailsGoodsReceiptPage 