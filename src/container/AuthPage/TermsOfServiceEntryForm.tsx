import DelayShowElement from "@components/animation/DelayShowElement";
import DownToUpPageTransition from "@components/animation/DownToUpPageTransition";
import FillButton from "@components/FillButton";
import WithGuttersLeftAndRightLayoutForNotScroll from "@components/Layout/WithGuttersLeftAndRightLayoutForNotScroll";
import Typography from "@components/Typograpy";
import { theme } from "@styles/theme";
import styled from "styled-components";
import { useEffect, useState } from "react";
import contentfulClient from "@service/contentfulClient";
import CheckBoxButton from "@components/CheckBoxButton";
import BasicRadioButton from "@components/RadioButton/basic";
import InputElements from "@dto/input.elements";
import useStep from "@container/AuthPage/step.store";
import { style1 } from "@utils/theme/button/style1";
import HeaderNavigation from "./HeaderNavigation";

type Props = {
    item: {
        checkList: TremsDTO[];
        setCheckList: React.Dispatch<React.SetStateAction<TremsDTO[]>>;
    }
}

type TremsDTO = {
    id: string
    thumbnail: string
    isAgree: boolean
}

const TermsOfServiceEntryForm: React.FC<Props> = ({ item }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { nextStep } = useStep();
    const { checkList, setCheckList } = item;
    const [checkAllButtonClickState, setCheckAllButtonClickState] = useState<boolean>(false);
    const [requiredAgreementClickStatus, setRequiredAgreementClickStatus] = useState<boolean>(false);

    useEffect(() => {
        contentfulClient.getEntries({
            content_type: "termsAndConditions"
        }).then((response) => {
            response.items.map((item) => {
                const trems = item.fields as TremsDTO
                setCheckList(oldArray => [...oldArray, {
                    id: trems.id,
                    thumbnail: trems.thumbnail,
                    isAgree: false
                }])
            })
        })
    }, []);

    if (!checkList) {
        return <p>Loading...</p>
    }

    const handleAllChangeToCheck = (id: string) => {
        setCheckAllButtonClickState(!checkAllButtonClickState)
        if (!checkAllButtonClickState) {
            let newArr = checkList.map((item) => {
                if (!item.isAgree) {
                    return { ...item, isAgree: true };
                } else {
                    return item
                }
            })

            setCheckList(newArr)
        } else {
            let newArr = checkList.map((item) => {
                if (item.isAgree) {
                    return { ...item, isAgree: false };
                } else {
                    return item
                }
            })

            setCheckList(newArr)
        }
    }

    useEffect(() => {
        let state = true;

        checkList.map((item) => {
            if (!item.isAgree) {
                state = false;
            }
        })

        setRequiredAgreementClickStatus(state)
        setCheckAllButtonClickState(state)

    }, [checkList, checkAllButtonClickState])

    const handleChangeToCheck = (id: string) => {
        let newArr = checkList.map((item) => {
            if (item.id == id) {
                return { ...item, isAgree: !item.isAgree };
            } else {
                return item
            }
        })

        setCheckList(newArr)
    }

    return (
        <>
            <HeaderNavigation />
            <WithGuttersLeftAndRightLayoutForNotScroll>
                <DownToUpPageTransition>
                    <Typography.H200M
                        color={theme.color.N700}>
                        회원가입을 위해 전체약관에<br />
                        동의해주세요.
                    </Typography.H200M>
                    <Typography.P200
                        style={{ marginTop: "1.6rem" }}
                        color={theme.color.N700}>
                        의약품 교품의 정확한 데이터 조회와 보다 쉬운 서비스 제공을 위해 꼭 필요합니다.
                    </Typography.P200>
                </DownToUpPageTransition>
                <BottomWrapper>
                    <DelayShowElement>
                        <CheckBoxFormHeader>
                            <BasicRadioButton
                                elements={{
                                    name: "all",
                                    type: "checkbox",
                                    label: "전체약관에 동의합니다.",
                                    checked: checkAllButtonClickState,
                                    value: "all"
                                }}
                                checkColor={theme.color.N900A}
                                unCheckColor={theme.color.N900A}
                                onChange={handleAllChangeToCheck} />
                        </CheckBoxFormHeader>
                        <CheckBoxFormBody>
                            {
                                checkList.map((item, key) => (
                                    <CheckBoxWrapper key={key} >
                                        <CheckBoxButton
                                            elements={{
                                                name: item.id,
                                                type: "checkbox",
                                                label: item.thumbnail,
                                                checked: item.isAgree,
                                                value: item.id
                                            }}
                                            onChange={handleChangeToCheck} />
                                    </CheckBoxWrapper>
                                ))
                            }
                        </CheckBoxFormBody>
                        <div style={{ marginTop: "3.5rem" }}>
                            <FillButton
                                id="agreement"
                                label="확인"
                                loading={loading}
                                handleOnClick={nextStep}
                                disabled={!requiredAgreementClickStatus}
                                {...style1} />
                        </div>
                    </DelayShowElement>
                </BottomWrapper>
            </WithGuttersLeftAndRightLayoutForNotScroll>
        </>
    )
}

const CheckBoxFormHeader = styled.div`
    background-color: ${theme.color.N30};
    border-radius: 0.8rem;
    padding: 1rem;

`

const CheckBoxFormBody = styled.div`
    margin-top: 1.6rem;
`

const CheckBoxWrapper = styled.div`

`

const BottomWrapper = styled.div`
    width: calc(100% - 4rem);
    position: absolute;
    left: 50%;
    bottom: 1.6rem;
    transform: translate(-50%, 0);
`
export default TermsOfServiceEntryForm;