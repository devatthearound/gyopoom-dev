import { useState } from "react";
import { pdfjs, Document, Page } from 'react-pdf';
import styled from "styled-components";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
    fileUrl: string | undefined,
}

export const ViewPDF = ({ fileUrl }: Props) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }: any) {
        setNumPages(numPages);
    }

    return (
        <Wrapper>
            <Document
                file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
                <Page pageNumber={pageNumber} />
            </Document>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .react-pdf__Page__canvas{
        width: 100% !important;
        height: auto !important;
    }
`