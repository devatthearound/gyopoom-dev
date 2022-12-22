import DelayShowElement from "@components/animation/DelayShowElement";
import DownToUpPageTransition from "@components/animation/DownToUpPageTransition";
import WithGuttersLeftAndRightLayoutForNotScroll from "@components/Layout/WithGuttersLeftAndRightLayoutForNotScroll";
import Typography from "@components/Typograpy";
import { theme } from "@styles/theme";
import { useState } from "react";
import styled from "styled-components";
import CameraIcon from "@images/icons/camera_alt.svg"
import UserIcon from "@images/icons/user.svg"
import AuthMiddleware from "@middleware/auth.middleware";
import { isSuccess } from "@utils/options";
import { useNavigate } from "react-router-dom";
import FillButton from "@components/FillButton";
import { useErrorHandlerForm } from "@context/ErrorHandleContext";
import { useGetUser } from "@context/AuthContext";
import S3Middleware from "@middleware/s3.middleware";
import useStep from "@container/AuthPage/step.store";
import { style1 } from "@utils/theme/button/style1";
import HeaderNavigation from "./HeaderNavigation";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/blue_error.svg"
import useRegisterStore from "@store/terms";

const ProfileEntryForm: React.FC = () => {
    const { name, phoneNumber, profile, setProfile, checkList } = useRegisterStore();
    const { setUserValue } = useGetUser();
    const [previewImage, setPreviewImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const authMiddleware = new AuthMiddleware();
    const s3Middleware = new S3Middleware();
    const navigate = useNavigate();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const createUser = async () => {
        setLoading(true);
        if (profile.value.length > 0) {
            const profileRes = await s3Middleware.createProfileImage(profile.value);
            if (isSuccess(profileRes)) {
                const apiRes = await authMiddleware.createUser({
                    name: name.value,
                    phoneNumber: phoneNumber.value,
                    profileUrl: profileRes.data.imageUrl,
                    agreements: checkList.filter((val) => { if (val.isAgree) return val }).map((item) => {
                        return {
                            id: item.id,
                            isAgreement: item.isAgree
                        }
                    })
                });

                if (isSuccess(apiRes)) {
                    setUserValue();
                    return navigate('/welcome');
                }

                setLoading(false)
                setIsConfirmModalOpen({
                    isOpen: true,
                    title: apiRes.message,
                    icon: ErrorIcon,
                    confirmButton: {
                        handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                        label: "확인",
                        bgColor: theme.color.B300,
                        textColor: theme.color.N0,
                        width: 10
                    }
                })
            } else {
                setIsConfirmModalOpen({
                    isOpen: true,
                    title: "이미지 업로드에 실패하였습니다",
                    icon: ErrorIcon,
                    confirmButton: {
                        handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                        label: "확인",
                        bgColor: theme.color.B300,
                        textColor: theme.color.N0,
                        width: 10
                    }
                })
            }
        } else {
            const apiRes = await authMiddleware.createUser({
                name: name.value,
                phoneNumber: phoneNumber.value,
                profileUrl: "https://ta-profile.s3.ap-northeast-2.amazonaws.com/basic_profile.png",
                agreements: checkList.filter((val) => { if (val.isAgree) return val }).map((item) => {
                    return {
                        id: item.id,
                        isAgreement: item.isAgree
                    }
                })
            });

            if (isSuccess(apiRes)) {
                setUserValue();
                return navigate('/welcome');
            }

            setLoading(false)
            setIsConfirmModalOpen({
                isOpen: true,
                title: apiRes.message,
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "확인",
                    bgColor: theme.color.B300,
                    textColor: theme.color.N0,
                    width: 10
                }
            })
        }
    }


    const profileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value, files } = e.target;

        if (files) {
            setProfile({
                ...profile,
                invalid: !profile.regex.test(value),
                value: files[0]
            })
            setPreviewImage(URL.createObjectURL(files[0]));
        }
    };

    return (
        <>
            <HeaderNavigation />
            <WithGuttersLeftAndRightLayoutForNotScroll>
                <DownToUpPageTransition>
                    <Typography.H200M
                        color={theme.color.N700}>
                        추가정보를 위해<br />프로필을 등록해주세요
                    </Typography.H200M>
                    <ImageWrapper>
                        <Lable htmlFor={profile.name}>
                            {
                                previewImage ?
                                    <UserImg src={previewImage} alt="프로필 미리보기" /> :
                                    <DefaultImg src={UserIcon} alt="프로필 미리보기" />
                            }
                            <Icon>
                                <img src={CameraIcon} alt="카메라 아이콘" />
                            </Icon>
                        </Lable>
                        <Input
                            id={profile.name}
                            name={profile.name}
                            type={profile.type}
                            onChange={profileChange} />
                        <TypographyP200
                            style={{ marginTop: "1.2rem" }}
                            color={theme.color.N50}
                            onClick={createUser}>다음에 할게요
                        </TypographyP200>
                    </ImageWrapper>
                </DownToUpPageTransition>
                <BottomWrapper>
                    <DelayShowElement>
                        <FillButton
                            id="profile"
                            label="확인"
                            loading={loading}
                            handleOnClick={createUser}
                            disabled={profile.invalid}
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
const Icon = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(-20%, -20%);
    background-color: ${theme.color.N0};
    border: 1px solid  ${theme.color.N30};
    width: 2rem;
    height: 2rem;
    border-radius: 100%;

    img{
        position: absolute;
        left: 50%;
        top: 50%;
        filter: ${theme.svgColor.N500};
        transform: translate(-50%, -50%);
        width: 1.2rem;
        height: 1.2rem;
    }
`

const TypographyP200 = styled(Typography.P200)`
    cursor: pointer;
    :hover, :focus{
        color: ${theme.color.N500}
    }
`
const UserImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
`

const DefaultImg = styled.img`
    position: absolute;
    left: 50%;
    top: 50%;
    filter: ${theme.svgColor.N50};
    transform: translate(-50%, -50%);
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 100%;
`
const Lable = styled.label`
    display: block;
    position: relative;
    margin: auto;
    width: 9rem;
    height: 9rem;
    border-radius: 100%;
    background-color: ${theme.color.N30};
    text-align: center;
`
const Input = styled.input`
    display: none;
`
const ImageWrapper = styled.div`
  text-align: center;
  margin-top: 3.2rem;
`;


export default ProfileEntryForm;