import styled from "styled-components"
import MoreVert from "@images/icons/more_vert.svg"
import { theme } from "@styles/theme"

type Props = {
    onClick: () => void
    color?: string
}

const MoreButton: React.FC<Props> = ({ onClick, color }) => {
    return <Button onClick={onClick} color={color} />
}

const Button = styled.button<{ color?: string }>`
    position: absolute;
    right: 2rem;
    top: 1.6rem;
    width: 1.6rem;
    height: 1.6rem;
    border: 0px;
    background: url(${MoreVert}) no-repeat center / 1.6rem 1.6rem;
    filter: ${({ color }) => color ? `${color}` : `${theme.svgColor.N50}`};

    cursor: pointer;
`

export default MoreButton