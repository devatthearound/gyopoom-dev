import FillButton from "@components/FillButton";
import Flex from "@components/Flex";
import Typography from "@components/Typograpy";
import BottomNavigationBar from "@components/BottomNavigation";
import AccountHeaderNavigation from "./HeaderNavigation";
import { isSuccess } from "@utils/options";
import { theme } from "@styles/theme";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserMiddleware from "@middleware/user.middleware";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import { style2 } from "@utils/theme/button/style2";
import MainMenu from "./MainMenu";


const Account = () => {
    const userMiddleware = new UserMiddleware();

    const logoOut = async () => {
        const res = await userMiddleware.loginOut();
        location.reload();
        return res;
    }
    const getUsers = async () => {
        const apiRes = await userMiddleware.getUser();
        if (isSuccess(apiRes)) return apiRes.data;
    };

    const { isLoading, data } = useQuery('user', getUsers);

    return (
        <WithNoGuttersTopAndBottomLayout bg={theme.color.N20}>
            <AccountHeaderNavigation />
            <Container>
                {
                    !isLoading && data &&
                    <>
                        <Flex
                            style={{
                                backgroundColor: `${theme.color.N0}`,
                                borderBottom: `1px solid ${theme.color.N40}`,
                                padding: '1.6rem 2rem',
                                alignItems: 'center',
                                justifyContent: "space-between"
                            }}>
                            <Flex
                                style={{
                                    alignItems: 'center',
                                }}>
                                <ImageWrapper>
                                    <Img src={data.profileUrl} alt="프로필 사진" />
                                </ImageWrapper>
                                <Typography.H50B>
                                    {data.name} 약사
                                </Typography.H50B>
                            </Flex>
                            <div>
                                <Link to="/change-account">
                                    <Typography.P200
                                        color={theme.color.N60}>
                                        계정 관리
                                    </Typography.P200>
                                </Link>
                            </div>
                        </Flex>
                        <MainMenu/>
                        <ItemList>
                            <Item>
                                <Link to="pharmacy">
                                    <Typography.H75>
                                        약국 정보
                                    </Typography.H75>
                                </Link>
                            </Item>
                            {/* <Item>
                                    <Typography.H75>
                                        알림 설정
                                    </Typography.H75>
                                </Item> */}
                            {/* <Item>
                                    <Typography.H75>
                                        고객센터
                                    </Typography.H75>
                                </Item> */}
                            <Item>
                                <Link to="terms-conditions">
                                    <Typography.H75>
                                        이용약관
                                    </Typography.H75>
                                </Link>
                            </Item>
                        </ItemList>
                    </>
                }

            </Container>
            <Footer>
                <ButtonWrapper>
                    <FillButton
                        id="navigate"
                        label="로그아웃"
                        handleOnClick={logoOut}
                        disabled={false}
                        {...style2} />
                </ButtonWrapper>

                <BottomNavigationBar />
            </Footer>
        </WithNoGuttersTopAndBottomLayout>
    )
}

const Container = styled.div`
    position: relative;
    overflow: scroll;
    height: 100%;
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`

const ItemList = styled.ul`
    background-color: ${theme.color.N0};
    margin-top: 1.2rem;
`
const Item = styled.li`
    padding: 1rem 2rem;
    text-align: left;
    border-bottom: 1px solid ${theme.color.N40};
    :last-child{
        border-bottom: 0px;
    }
`
const ImageWrapper = styled.div`
    width: 4.8rem;
    height: 4.8rem;
    margin-right: 1.6rem;
    float: left;
    img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
        object-fit: cover;
    }
`
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`


const Footer = styled.div`
    z-index: 99;
    width: 100%;
`
const ButtonWrapper = styled.div`
    width: calc(100% - 4rem);
    margin: auto auto 3rem;
`

export default Account