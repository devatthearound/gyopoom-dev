import DownToUpPageTransition from "@components/animation/DownToUpPageTransition"
import InputWithRightIcon from "@components/Input/InputWithRightIcon"
import WithGuttersLeftAndRightLayoutForNotScroll from "@components/Layout/WithGuttersLeftAndRightLayoutForNotScroll"
import FillButton from "@components/FillButton"
import Typography from "@components/Typograpy"
import { theme } from "@styles/theme"
import { useState } from "react"
import styled from "styled-components"
import SearchIcon from "@images/icons/search.svg"
import arrowRightIcon from "@images/icons/keyboard_arrow_right.svg"
import InputElements from "@dto/input.elements"
import { defaultPharmacySearch } from "@utils/enroll-pharmacy-search"
import PharmacyMiddleware from "@middleware/pharmacy"
import { isSuccess } from "@utils/options"
import PharmacySearchResDTO from "@dto/pharmacy-search.res.dto"
import { useNavigate } from "react-router-dom"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import PharmacyCheckBoxButton from "@components/PharmacyCheckBoxButton"
import NoLabelAndBothActionButtons from "@components/HeaderNavigation/NoLabelAndBothActionButtons"
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/blue_error.svg"

import { style1 } from "@utils/theme/button/style1"

const EnrollPharmacyPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<InputElements>(defaultPharmacySearch);
    const [userSelectPharmacy, setUserSelectPharmacy] = useState<boolean>(false);
    const [pharmacyList, setPharmacyList] = useState<PharmacySearchResDTO>();
    const pharmacyMiddleware = new PharmacyMiddleware();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const handleEnrollPharmacy = async () => {
        if (pharmacyList) {
            const res = await pharmacyMiddleware.createEnrollPharmacy({
                pharmacyId: pharmacyList.id
            });
            if (isSuccess(res)) {
                navigate("/pharmacy/enroll/end", { replace: true })
            } else {
                return setIsConfirmModalOpen({
                    isOpen: true,
                    title: res.message,
                    icon: ErrorIcon,
                    confirmButton: {
                        handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                        label: "확인",
                        width: 10
                    }
                })
            }
        }
    }

    const handlerOnSubmitSearchForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await pharmacyMiddleware.getPharmacyId(searchInput.value);
        if (isSuccess(res)) {
            setPharmacyList(res.data);
        } else {
            setPharmacyList(undefined);
            // setAlertMessage 삭제함 11.26
            // setAlertMessage(res.message);
        }
    }

    const handleChangeToCheck = (checked: boolean) => {
        setUserSelectPharmacy(checked)
    }

    const LeftActions = [{
        event: () => navigate(-1),
        iconType: BackIcon
    }]

    const handleOnClickEnrollPharmacy = () => {
        navigate("/account/new-pharmacy/");
    }

    return (
        <DownToUpPageTransition>
            <NoLabelAndBothActionButtons
                leftActions={LeftActions} />
            <WithGuttersLeftAndRightLayoutForNotScroll>
                <Typography.H200M
                    style={{ marginTop: "2rem" }}
                    color={theme.color.N700}>
                    사업자번호를 입력해주세요.
                </Typography.H200M>
                <Typography.P200
                    style={{ marginTop: "1.6rem" }}
                    color={theme.color.N700}>
                    거래한 의약품의 거래명세서를 보다 쉽게 작성하기 위해
                    약국정보를 미리 등록해주세요.
                </Typography.P200>
                <SearchFormCard>
                    <Form onSubmit={handlerOnSubmitSearchForm}>
                        <InputWithRightIcon
                            icon={SearchIcon}
                            elements={searchInput}
                            onChange={setSearchInput}
                            mainColor={theme.color.N400}
                            subColor={theme.color.N40} />
                    </Form>
                    <FormResultCard>
                        {
                            pharmacyList ? (
                                <PharmacyCheckBoxButton
                                    elements={{
                                        name: pharmacyList.id,
                                        type: "checkbox",
                                        label: pharmacyList.title,
                                        value: pharmacyList.title
                                    }}
                                    onChange={handleChangeToCheck} />
                            ) : (
                                <EnrollPharmacyButton onClick={handleOnClickEnrollPharmacy}>
                                    <Typography.H50M
                                        color={theme.color.B300}>
                                        내 약국정보 등록하기
                                    </Typography.H50M>
                                </EnrollPharmacyButton>
                            )
                        }
                    </FormResultCard>
                </SearchFormCard>
                {
                    pharmacyList &&
                    <BottomWrapper>
                        <FillButton
                            id="navigate"
                            label="약국정보 등록하기"
                            handleOnClick={handleEnrollPharmacy}
                            disabled={!userSelectPharmacy}
                            {...style1} />
                    </BottomWrapper>
                }
            </WithGuttersLeftAndRightLayoutForNotScroll>
        </DownToUpPageTransition>
    )
}

const EnrollPharmacyButton = styled.button`
    display: flex;
    justify-content: center;
    border: 0px;
    border-radius: 0.8rem;
    width: 100%;
    margin-top: 1.2rem;
    cursor: pointer;
    background-color: ${theme.color.B50};
    padding: 1.6rem 2rem;
    border: 0px;

    h1{
        position: relative;
        width: fit-content;
        ::before{
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            right: -2rem;
            background: url(${arrowRightIcon}) no-repeat right / 2.4rem 2.4rem;
            filter: ${theme.svgColor.B300};
    }
    }
`

const SearchFormCard = styled.div`
    width: 100%;
    margin-top: 4.6rem;
`

const FormResultCard = styled.div`
    
`

const Form = styled.form`
    flex: 1px;
`

const BottomWrapper = styled.div`
    width: calc(100% - 4rem);
    position: absolute;
    text-align: center;
    left: 50%;
    bottom: 1.6rem;
    transform: translate(-50%, 0);
`

export default EnrollPharmacyPage