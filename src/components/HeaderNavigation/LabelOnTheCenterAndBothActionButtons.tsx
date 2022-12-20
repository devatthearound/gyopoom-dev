import ResetButton from "@components/ResetButton";
import Typography from "@components/Typograpy";
import { theme } from "@styles/theme";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {
    label: string;
    leftActions?: NavigationAction[];
    rightActions?: NavigationAction[];
}

type NavigationAction = {
    event: () => void,
    iconType?: string,
    text?: string
}

const LabelOnTheCenterAndBothActionButtons: React.FC<Props> = ({ label, leftActions, rightActions }) => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Container>
                <ContainerLeft>
                    {
                        leftActions && (
                            leftActions.map((action, key) => (
                                <ResetButton handleOnClick={action.event} key={key}>
                                    {
                                        action.iconType && <Img src={action.iconType} alt="아이콘 이미지" />
                                    }
                                    {
                                        action.text && <Typography.H75
                                            style={{ paddingRight: "1.4rem" }}
                                            color={theme.color.B300}>{action.text}</Typography.H75>
                                    }
                                </ResetButton>
                            ))
                        )
                    }
                </ContainerLeft>
                <ContainerCenter>
                    <Typography.H75M style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}>{label}</Typography.H75M>
                </ContainerCenter>
                <ContainerRight>
                    {
                        rightActions ? (
                            rightActions.map((action, key) => (
                                <ResetButton handleOnClick={action.event} key={key}>
                                    {
                                        action.iconType && <Img src={action.iconType} alt="아이콘 이미지" />
                                    }
                                    {
                                        action.text && <Typography.H75
                                            style={{ paddingRight: "1.4rem" }}
                                            color={theme.color.B300}>{action.text}</Typography.H75>
                                    }
                                </ResetButton>
                            ))
                        ) : <ResetButton handleOnClick={() => { }}><></></ResetButton>
                    }
                </ContainerRight>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
    height: 4.8rem;
    background-color: ${theme.color.N0};
`
const Container = styled.div`
    display: flex;
    flex: 1;
    height: 4.8rem;
    justify-content: space-between;
    align-items: center;
`

const Img = styled.img`
    width: 2.4rem;
    height: 2.4rem;
`

const ContainerLeft = styled.div`

`

const ContainerRight = styled.div`

`
const ContainerCenter = styled.div`
    overflow: hidden;
`

export default LabelOnTheCenterAndBothActionButtons