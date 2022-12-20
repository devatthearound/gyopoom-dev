import Flex from "@components/Flex"
import WithGuttersLeftAndRightLayoutForNotScroll from "@components/Layout/WithGuttersLeftAndRightLayoutForNotScroll"
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout"
import BasicSelectButton from "@components/SelectButton/basic"
import FillButton from "@components/FillButton"
import Typography from "@components/Typograpy"
import HeaderNavigation from "./HeaderNavigation"
import AuthMiddleware from "@middleware/auth.middleware"
import UserMiddleware from "@middleware/user.middleware"
import contentfulClient from "@service/contentfulClient"
import { theme } from "@styles/theme"
import { style1 } from "@utils/theme/button/style1"
import { style2 } from "@utils/theme/button/style2"
import { useEffect, useState } from "react"
import styled from "styled-components"

type Option = {
    id: string
    title: string
    content: string
}

const DetailsTermsConditionsPage = () => {
    const [options, setOptions] = useState<Option[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [userSelectOptionId, setUserSelectOptionId] = useState<string>("")
    const userMiddleware = new UserMiddleware()
    useEffect(() => {
        contentfulClient.getEntries({ content_type: "withdrawalOptions" }).then((response) => {
            response.items.map((item) => {
                setOptions(oldArray => [...oldArray, item.fields as Option])
            })
        })
    }, []);

    const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserSelectOptionId(e.target.value)
    }

    const handleOnSubmit = async () => {
        // API 미 연결
        setLoading(true)
        const res = await userMiddleware.deleteUser();
        await userMiddleware.loginOut();
        location.reload();
        setLoading(false)
    }


    return (
        <WithNoGuttersTopAndBottomLayout>
            <HeaderNavigation />
            <WithGuttersLeftAndRightLayoutForNotScroll style={{ height: "100%" }}>
                <Typography.H100M
                    style={{ marginTop: "1.6rem" }}
                    color={theme.color.N900}>
                    정말 떠나시는건가요?<br />
                    한 번 더 생각해보지 않으시겠어요?
                </Typography.H100M>
                <Typography.P200
                    style={{ marginTop: "1.6rem" }}
                    color={theme.color.N70}>
                    계정을 삭제하면 모든 활동 정보가 삭제됩니다. 계정 삭제 후 7일간 다시 가입 할 수 없어요.
                </Typography.P200>
                <Typography.H100M
                    style={{ marginTop: "3.5rem" }}
                    color={theme.color.N900}>
                    계정을 삭제하려는 이유가 궁금해요.
                </Typography.H100M>
                <SelectButtonWrapper>
                    {options && <BasicSelectButton onChange={handleOnChangeSelect} options={options} />}
                </SelectButtonWrapper>
                {
                    options.map((option, key) => {
                        if (option.id == userSelectOptionId) {
                            return (
                                <div key={key}>
                                    <Typography.P200
                                        key={key}
                                        style={{ marginTop: "1.6rem" }}
                                        color={theme.color.N900}>
                                        {option.content}
                                    </Typography.P200>
                                    <Flex
                                        style={{ gap: "10px", marginTop: "1.6rem" }}>
                                        <FillButton
                                            id="cancle-button"
                                            label="취소"
                                            disabled={false}
                                            handleOnClick={handleOnSubmit}
                                            {...style2} />
                                        <FillButton
                                            id="submit-button"
                                            label="제출"
                                            loading={loading}
                                            disabled={false}
                                            handleOnClick={handleOnSubmit}
                                            {...style1} />
                                    </Flex>
                                </div>
                            )
                        }
                    })
                }
            </WithGuttersLeftAndRightLayoutForNotScroll>
        </WithNoGuttersTopAndBottomLayout>
    )
}

const SelectButtonWrapper = styled.div`
    margin-top: 1.6rem;
`

export default DetailsTermsConditionsPage