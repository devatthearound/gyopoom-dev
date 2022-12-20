import Typography from "@components/Typograpy";
import ScrollUpAndDownBox from "@components/animation/DraggableBottomSheet";
import { theme } from "@styles/theme";
import { useState } from "react";
import styled from "styled-components";
import Flex from "@components/Flex";
import { style1 } from "@utils/theme/button/style1";
import FillButton from "@components/FillButton";
import { style2 } from "@utils/theme/button/style2";
import modeEditIcon from "@images/icons/mode_edit.svg"
type Props = {
    defaultValue: boolean
    action: () => void
}

const ScrollUpAndDownBoxNewReceipt: React.FC<Props> = ({ defaultValue, action }) => {
    const [isOpen, setIsOpen] = useState(defaultValue);
    const stateChange = (state: boolean) => {
        setIsOpen(state)
    }

    return (
        <ScrollUpAndDownBox isOpen={isOpen} stateChange={stateChange}>
            <Flex style={{ flexDirection: "column", justifyContent: "center" }}>
                <Img src={modeEditIcon} />
                <Typography.P200
                    style={{ marginTop: "1.2rem", textAlign: "center" }}
                    color={theme.color.N100}>
                    본 의약품 교품에 대한 거래내역서를 작성합니다.<br />
                    중복으로 거래내역서를 작성할 수 없습니다.
                </Typography.P200>
                <div style={{ marginTop: "3.2rem" }}>
                    <FillButton
                        id="navigate-pharmacy-enroll"
                        label="거래내역서 작성하기"
                        disabled={false}
                        handleOnClick={action}
                        {...style1} />
                </div>
            </Flex>
        </ScrollUpAndDownBox>
    )
}

const Img = styled.img`
    filter: ${theme.svgColor.B300};
    width: 3.3rem;
    margin: auto;
`
export default ScrollUpAndDownBoxNewReceipt