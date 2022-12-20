import styled from "styled-components"

type Props = {
    count: number
}

const UnreadMessageCard: React.FC<Props> = ({ count }) => {
    return (
        <Wrapper>
            <p>{count}</p>
        </Wrapper>
    )
}


const Wrapper = styled.div`

`

export default UnreadMessageCard