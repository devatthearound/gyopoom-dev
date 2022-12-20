import { theme } from "../../styles/theme"
import Typography from "@components/Typograpy";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WithGuttersFourSidesLayoutForScroll from "@components/Layout/WithGuttersFourSidesLayoutForScroll";
import Container from "./Container.styled";

const LadingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => navigate("/healer-auth"), 2000);
    });

    return (
        <WithGuttersFourSidesLayoutForScroll bg="#0B0084">
            <Container>
                <Typography.H700B
                    lineHeight="1.2"
                    color={theme.color.N0}>
                    스마트한<br />
                    의약품 거래
                </Typography.H700B>
                <Typography.H100L
                    margin="1.6rem 0 0 0"
                    color="#FFF0F1">
                    약사가 직접 만드는 스마트한 솔루션
                </Typography.H100L>
            </Container>
        </WithGuttersFourSidesLayoutForScroll>
    )
}


export default LadingPage