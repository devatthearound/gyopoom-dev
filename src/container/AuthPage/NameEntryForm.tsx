import DelayShowElement from "@components/animation/DelayShowElement";
import DownToUpPageTransition from "@components/animation/DownToUpPageTransition";
import WithGuttersLeftAndRightLayoutForNotScroll from "@components/Layout/WithGuttersLeftAndRightLayoutForNotScroll";
import Typography from "@components/Typograpy";
import InputWithLable from "@components/Input/InputWithLable";
import { theme } from "@styles/theme";
import styled from "styled-components";
import FillButton from "@components/FillButton";
import useStep from "@container/AuthPage/step.store";
import { style1 } from "@utils/theme/button/style1";
import HeaderNavigation from "./HeaderNavigation";

type Props = {
    item: any
}

const NameEntryForm: React.FC<Props> = ({ item }) => {
    const { name, setName } = item;
    const { nextStep } = useStep();

    return (
        <>
            <HeaderNavigation />
            <WithGuttersLeftAndRightLayoutForNotScroll>
                <DownToUpPageTransition>
                    <Typography.H200M
                        color={theme.color.N700}>
                        약사님<br />이름을 입력해주세요.
                    </Typography.H200M>
                    <InputWithLable style={{ width: "100%", marginTop: "2rem" }}
                        elements={name}
                        onChange={setName} />
                </DownToUpPageTransition>
                <BottomWrapper>
                    <DelayShowElement>
                        <FillButton
                            id="name"
                            label="다음"
                            handleOnClick={nextStep}
                            disabled={name.invalid}
                            {...style1} />
                    </DelayShowElement>
                </BottomWrapper>
            </WithGuttersLeftAndRightLayoutForNotScroll>
        </>
    )
}

const BottomWrapper = styled.div`
    width: calc(100% - 4rem);
    position: absolute;
    text-align: center;
    left: 50%;
    bottom: 1.6rem;
    transform: translate(-50%, 0);
`

export default NameEntryForm;