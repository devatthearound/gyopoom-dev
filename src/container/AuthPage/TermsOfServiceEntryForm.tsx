import DelayShowElement from "@components/animation/DelayShowElement";
import DownToUpPageTransition from "@components/animation/DownToUpPageTransition";
import FillButton from "@components/FillButton";
import WithGuttersLeftAndRightLayoutForNotScroll from "@components/Layout/WithGuttersLeftAndRightLayoutForNotScroll";
import Typography from "@components/Typograpy";
import { theme } from "@styles/theme";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import contentfulClient from "@service/contentfulClient";
import CheckBoxButton from "@components/CheckBoxButton";
import useStep from "@container/AuthPage/step.store";
import { style1 } from "@utils/theme/button/style1";
import HeaderNavigation from "./HeaderNavigation";
import RadioH50BButton from "@components/RadioButton/H50B";
import { Link } from "react-router-dom";
import useRegisterStore from "@store/terms";

type TremsDTO = {
    id: string
    thumbnail: string
    required: boolean
    link: string
    isAgree: boolean
    registrationItem: boolean
}

const TermsOfServiceEntryForm: React.FC = () => {
    const [loading] = useState<boolean>(false);
    const { nextStep } = useStep();
    const { checkList, setCheckList } = useRegisterStore();
    const [checkAllButtonClickState, setCheckAllButtonClickState] = useState<boolean>(false);
    const [requiredAgreementClickStatus, setRequiredAgreementClickStatus] = useState<boolean>(false);

    useEffect(() => {
        if (!checkList.length) {
            contentfulClient.getEntries({
                content_type: "termsAndConditions"
            }).then((response) => {
                setCheckList(response.items.filter((val) => { if ((val.fields as TremsDTO).registrationItem) return val }).map((item) => {
                    const trems = item.fields as TremsDTO
                    return ({
                        id: trems.id,
                        thumbnail: trems.thumbnail,
                        required: trems.required,
                        link: trems.link,
                        isAgree: false,
                        registrationItem: trems.registrationItem
                    })
                }).sort(function (a, b) {
                    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
                }))
            })
        }
    }, [checkList]);

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
        let submitState = true;
        let allButtonState = true;

        checkList.map((item) => {
            if (item.required && !item.isAgree) {
                submitState = false;
            }
        })

        checkList.map((item) => {
            if (!item.isAgree) {
                allButtonState = false;
            }
        })

        setRequiredAgreementClickStatus(submitState)
        setCheckAllButtonClickState(allButtonState)

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
                        ??????????????? ?????? ???????????????<br />
                        ??????????????????.
                    </Typography.H200M>
                    <Typography.P200
                        style={{ marginTop: "1.6rem" }}
                        color={theme.color.N700}>
                        ????????? ????????? ????????? ????????? ????????? ?????? ?????? ????????? ????????? ?????? ??? ???????????????.
                    </Typography.P200>
                </DownToUpPageTransition>
                <BottomWrapper>
                    <DelayShowElement>
                        <CheckBoxFormHeader isActive={checkAllButtonClickState}>
                            <RadioH50BButton
                                elements={{
                                    name: "all",
                                    type: "checkbox",
                                    label: "??????????????? ???????????????.",
                                    checked: checkAllButtonClickState,
                                    value: "all"
                                }}
                                defaultBgColor={theme.svgColor.N50}
                                activedBgColor={theme.svgColor.B300}
                                defaultTtColor={theme.color.N900A}
                                activedTtColor={theme.color.N900A}
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
                                                label: item.required ? "(??????) " + item.thumbnail : "(??????) " + item.thumbnail,
                                                checked: item.isAgree,
                                                value: item.id
                                            }}
                                            defaultBgColor={theme.svgColor.N80}
                                            activedBgColor={theme.svgColor.B300}
                                            defaultTtColor={theme.color.N80}
                                            activedTtColor={theme.color.N900}
                                            onChange={handleChangeToCheck} />
                                        {item.link &&
                                            <Link to={`${item.link}`}>
                                                <Typography.P200 color={theme.color.N80}>
                                                    ??????
                                                </Typography.P200>
                                            </Link>}
                                    </CheckBoxWrapper>
                                ))
                            }
                        </CheckBoxFormBody>
                        <div style={{ marginTop: "3.5rem" }}>
                            <FillButton
                                id="agreement"
                                label="??????"
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

const CheckBoxFormHeader = styled.div<{ isActive: boolean }>`
    border: ${({ isActive }) => isActive ? `1px solid ${theme.color.B200}` : `1px solid ${theme.color.N30}`};
    border-radius: 0.8rem;
    padding: 1rem;
`

const CheckBoxFormBody = styled.div`
    margin-top: 1.6rem;
`

const CheckBoxWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const BottomWrapper = styled.div`
    width: calc(100% - 4rem);
    position: absolute;
    left: 50%;
    bottom: 1.6rem;
    transform: translate(-50%, 0);
`
export default TermsOfServiceEntryForm;