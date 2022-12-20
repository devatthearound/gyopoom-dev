import ResetButton from "@components/ResetButton";
import { theme } from "@styles/theme";
import styled from "styled-components";

type Props = {
    bg?: string;
    leftActions?: NavigationAction[];
    rightActions?: NavigationAction[];
}

type NavigationAction = {
    event: () => void,
    iconType: string
}

const NoLabelAndBothActionButtons: React.FC<Props> = ({ bg, leftActions, rightActions }) => {
    return (
        <Wrapper bg={bg}>
            <Container>
                <ContainerLeft>
                    {
                        leftActions && (
                            leftActions.map((action, key) => (
                                <ResetButton handleOnClick={action.event} key={key}>
                                    <Img src={action.iconType} alt="아이콘 이미지" />
                                </ResetButton>
                            ))
                        )
                    }
                </ContainerLeft>
                <ContainerRight>
                    {
                        rightActions && (
                            rightActions.map((action, key) => (
                                <ResetButton handleOnClick={action.event} key={key}>
                                    <Img src={action.iconType} alt="아이콘 이미지" />
                                </ResetButton>
                            ))
                        )
                    }
                </ContainerRight>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div<{ bg?: string }>`
    position: relative;
    height: 4.8rem;
    background-color: ${({ bg }) => bg ? bg : theme.color.N0};
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

export default NoLabelAndBothActionButtons