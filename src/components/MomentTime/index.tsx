import { theme } from "@styles/theme"
import Moment from "react-moment"
import styled from "styled-components"

type Props = {
    style?: React.CSSProperties
    date: string,
    format: string
}

type StyleProps = {
    fontSize?: string,
    fontWeight?: string,
    color?: string,
    letterSpacing?: string,
    lineHeight?: string,
}

const MomentTime: React.FC<Props> = ({ style, date, format }) => {
    return (
        <Wrapper style={style}>
            <Moment format={format}>{date}</Moment>
        </Wrapper>
    )
}

const Wrapper = styled.div<StyleProps>`
    time{
        font-size: ${(props) => props.fontSize ? props.fontSize : theme.fontSize.P50};
        font-weight: ${(props) => props.fontWeight ? props.fontWeight : theme.fontWeight.Regular};
        letter-spacing: ${(props) => props.letterSpacing ? props.letterSpacing : "0px"};
        line-height:  ${(props) => props.lineHeight ? props.lineHeight : theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N60};
    }
`

export default MomentTime