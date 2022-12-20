import styled from "styled-components"
import PictureAsPdf from "@images/icons/picture_as_pdf.svg";
import PhotoLibrary from "@images/icons/photo_library.svg"
import { useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import { ViewPDF } from "@components/PDFViewerModal/Viewer/PdfViewer";
import ResetButton from "@components/ResetButton";

type Props = {
    title: string
    href: string
}

const MenuList: React.FC<Props> = ({ title, href }) => {
    const imageRef = useRef<HTMLDivElement>(null);

    const getFileName = (fileType: string) => `${title}.${fileType}`

    const downloadPng = useCallback(() => {
        if (imageRef.current === null) {
            return
        }
        toPng(imageRef.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `${getFileName('png')}`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [imageRef]);

    const downloadPdf = () => {
        const link = document.createElement('a')
        link.download = `${getFileName('png')}`
        link.href = href
        link.click()
    }

    return (
        <Wrapper>
            <ResetButton handleOnClick={downloadPng}>
                <img src={PhotoLibrary} width="20px" height="20px" />
            </ResetButton>
            <ResetButton handleOnClick={downloadPdf}>
                <img src={PictureAsPdf} width="20px" height="20px" />
            </ResetButton>
            <ViewWrap>
                <div ref={imageRef}>
                    <ViewPDF fileUrl={href} />
                </div>
            </ViewWrap>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    button{
        padding: 0;

    }
    button:not(:first-child){
        margin-left: 3rem;
    }
`

const ViewWrap = styled.div`
    position: absolute;
    left: -100000px
`
export default MenuList