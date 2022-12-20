import ResetButton from "@components/ResetButton"
import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

type Props = {
    actions?: NavigationAction[],
    label: string,
}

type NavigationAction = {
    event: () => void,
    iconType: string
}

const LabelOnTheLeftAndActionButtonsOnTheRightEnd: React.FC<Props> = ({ label, actions }) => {
    return (
        <Wrapper>
            <Container>
                <ContainerLeft>
                    <Typography.H75B>{label}</Typography.H75B>
                </ContainerLeft>
                <ContainerRight>
                    {
                        actions && (
                            actions.map((action, key) => (
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

const Wrapper = styled.div`
    position: relative;
    height: 4.8rem;
    background-color: ${theme.color.N0};
`
const Container = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
`

const Img = styled.img`
    width: 2.8rem;
    height: 2.8rem;
    filter: ${theme.svgColor.N80};
`

const ContainerLeft = styled.div`
    flex: 1;
`
const ContainerRight = styled.div`

`

export default LabelOnTheLeftAndActionButtonsOnTheRightEnd