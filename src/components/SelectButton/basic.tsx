import { theme } from "@styles/theme"
import styled from "styled-components"
import ArrowDropDownIcon from "@images/icons/arrow_drop_down.svg"

type Props = {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: OptionDTO[]
}

type OptionDTO = {
    id: string
    title: string
    content: string
}

const BasicSelectButton: React.FC<Props> = ({ onChange, options }) => {
    return (
        <Select onChange={onChange} id="Dd">
            <Option value="option000">선택해주세요</Option>
            {
                options.map((option, key) => (
                    <Option key={key} value={option.id}>{option.title}</Option>
                ))
            }
        </Select>
    )
}

const Select = styled.select`
    position: relative;
    width: 100%;
    padding: 12px 16px;
    background: #FFFFFF;
    border: 1px solid ${theme.color.N50};
    border-radius: 0.8rem;
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;

    font-size: ${theme.fontSize.H50};
    font-weight: ${theme.fontWeight.Medium};
    letter-spacing:  ${theme.letterSpacing.normal}px;
    line-height:  ${theme.lineHeight.normal};
    color:${theme.color.N900A};

    background: url(${ArrowDropDownIcon}) calc(100% - 10px) center no-repeat;
    background-size: 2.4rem;

    :hover{
        border: 1px solid ${theme.color.N50};
    }
`

const Option = styled.option`

`
export default BasicSelectButton