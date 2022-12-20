import { ViewPDF } from "./Viewer/PdfViewer";

type Props = {
    pdfLink: string;
}
const PDFViewerModal: React.FC<Props> = ({ pdfLink }) => {
    return (<>
        <ViewPDF fileUrl={pdfLink} />
    </>)
}

export default PDFViewerModal