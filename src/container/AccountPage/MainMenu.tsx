import Typography from "@components/Typograpy"
import DriveFileRenameIcon from "@images/icons/drive_file_rename_outline.svg";
import ShoppingBagIcon from "@images/icons/shopping_bag.svg";
import ReceiptIcon from "@images/icons/receipt.svg";
import styled from "styled-components";
import { theme } from "@styles/theme";
import { Link } from "react-router-dom";

const MainMenu = () => {
    return (
        <Wrapper>
            <Container>
                <Item to="/history/buy-goods">
                    <ImageWrap>
                        <img src={ShoppingBagIcon} />
                    </ImageWrap>
                    <Typography.P200>
                        구매내역
                    </Typography.P200>
                </Item>
                <Item to="/history/my-goods">
                    <ImageWrap>
                        <img src={ReceiptIcon} />
                    </ImageWrap>
                    <Typography.P200>
                        판매내역
                    </Typography.P200>
                </Item>
                <Item to="/history/receipt">
                    <ImageWrap>
                        <img src={DriveFileRenameIcon} />
                    </ImageWrap>
                    <Typography.P200>
                        거래내역서
                    </Typography.P200>
                </Item>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    padding: 1.6rem 2rem 1.3rem 2rem;
    background-color: ${theme.color.N0};
`
const Container = styled.div`
    display: flex;
    justify-content: space-around;
`

const Item = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
        margin-top: 1rem;
    }
`

const ImageWrap = styled.div`
    border-radius: 100%;
    background-color: ${theme.color.BB50};
    width: 4.8rem;
    height: 4.8rem;

    img{
        width: 24px;
        height: 100%;
        margin: auto;
        display: block;
    }
`

export default MainMenu;