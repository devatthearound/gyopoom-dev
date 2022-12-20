import Typography from "@components/Typograpy"
import ReciptThumnailDTO from "@dto/receipt-thumnail.res"
import MenuList from "./MenuList"
import ReceiptPdfImg from "@images/illustration/receipt-pdf.png"
import styled from "styled-components"
import { theme } from "@styles/theme"
import { GoodsPurchaseState } from "@utils/common-status-code"
import { Link } from "react-router-dom"

type Props = {
    item: ReciptThumnailDTO
}

const ReceiptCard: React.FC<Props> = ({ item }) => {
    return (
        <Wrapper state={item.purchasingState}>
            <ImgWrap to={`/receipt/${item.id}`}>
                <img src={ReceiptPdfImg} width="110px" height="auto" />
            </ImgWrap>
            <Container>
                <Link to={`/receipt/${item.id}`}>
                    <Typography.H75M>
                        {item.title}
                    </Typography.H75M>
                    <Typography.P50
                        margin="0.8rem 0 0 0"
                        color={theme.color.N300}>
                        {item.createAt}
                    </Typography.P50>
                </Link>
                <MenuListWrap>
                    <MenuList href={item.pdfUrl} title={item.title} />
                </MenuListWrap>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div<{ state: string }> `
    display: flex;
    border: 1px solid ${theme.color.N30};
    border-radius: 0.4rem;
    background-color: ${theme.color.N0};
    opacity: ${({ state }) => state === GoodsPurchaseState.done ? "100%" : "30%"};
    padding: 2rem 2rem 0 2rem;
    @media ${theme.device.smMoblie}{
        flex-direction: column;
    }
`

const ImgWrap = styled(Link)`
    text-align: center;
`

const MenuListWrap = styled.div`
    margin-top: 2.5rem;
    max-width: 250px;
`

const Container = styled.div`
    margin-left: 1.7rem;
    margin-bottom: 0.7rem;
    width: 100%;
    overflow: hidden;
    h1{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    @media ${theme.device.smMoblie}{
        margin-left: 0;
    }
`

export default ReceiptCard