import Typography from "@components/Typograpy";
import InputWithLable from "@components/Input/InputWithLable";
import ChangeDataWithApiHeaderNagigation from "@components/ChangeDataWithApiHeaderNagigation";
import InputElements from "@dto/input.elements";
import { isSuccess } from "@utils/options";
import { theme } from "@styles/theme";
import { defaultEmail, defaultName, defaultPassword, defaultPhoneNumber, defaultProfile } from "@utils/update-user.input";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CameraIcon from "@images/icons/camera_alt.svg"
import { useErrorHandlerForm } from "@context/ErrorHandleContext";
import UserMiddleware from "@middleware/user.middleware";
import S3Middleware from "@middleware/s3.middleware";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import useModalStore from "@components/BasicConfirmModal/modal.store";
import ErrorIcon from "@images/icons/blue_error.svg"

const ChangeAccountPage = () => {
    const navigate = useNavigate();
    const userMiddleware = new UserMiddleware();
    const [phoneNumber, setPhoneNumber] = useState<InputElements>(defaultPhoneNumber)
    const [profile, setProfile] = useState<InputElements>(defaultProfile)
    const [name, setName] = useState<InputElements>(defaultName)
    const [email, setEmail] = useState<InputElements>(defaultEmail)
    const [password, setPassword] = useState<InputElements>(defaultPassword)
    const [loading, setLoading] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>("");
    const s3Middleware = new S3Middleware();
    const { isConfirmModalOpen, setIsConfirmModalOpen } = useModalStore();

    const getUsers = async () => {
        const apiRes = await userMiddleware.getUser();
        if (isSuccess(apiRes)) return apiRes.data;
    };

    const { isLoading, data } = useQuery('user', getUsers);

    useEffect(() => {
        if (data) {
            setPhoneNumber({ ...phoneNumber, value: data.phoneNumber })
            setPreviewImage(data.profileUrl)
            // setEmail({ ...email, value: data.email })
            // setPassword({ ...password, value: data.password })
            setName({ ...name, value: data.name })
        }
    }, [data])

    const handlerOnSubmit = async () => {
        if (!phoneNumber.invalid && !name.invalid) {
            setLoading(true)

            if (profile.value) {
                const profileRes = await s3Middleware.createProfileImage(profile.value);
                if (isSuccess(profileRes)) {
                    if (data) {
                        const apiRes = await userMiddleware.updateUser({
                            name: name.value,
                            phoneNumber: phoneNumber.value,
                            profile: profileRes.data.imageUrl,
                            email: email.value,
                            password: password.value
                        });

                        if (isSuccess(apiRes)) return navigate(`/account`)
                        setLoading(false)
                        setIsConfirmModalOpen({
                            isOpen: true,
                            title: apiRes.message,
                            icon: ErrorIcon,
                            confirmButton: {
                                handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                                label: "확인",
                                width: 10
                            }
                        })
                    }
                } else {
                    return setIsConfirmModalOpen({
                        isOpen: true,
                        title: "이미지 업로드에 실패하였습니다",
                        icon: ErrorIcon,
                        confirmButton: {
                            handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                            label: "확인",
                            width: 10
                        }
                    })
                }
            } else {
                if (data) {
                    const apiRes = await userMiddleware.updateUser({
                        name: name.value,
                        phoneNumber: phoneNumber.value,
                        email: email.value,
                        password: password.value
                    });

                    if (isSuccess(apiRes)) return navigate(`/account`)
                    setLoading(false)
                    setIsConfirmModalOpen({
                        isOpen: true,
                        title: apiRes.message,
                        icon: ErrorIcon,
                        confirmButton: {
                            handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                            label: "확인",
                            width: 10
                        }
                    })
                }
            }
        } else {
            setLoading(false)
            return setIsConfirmModalOpen({
                isOpen: true,
                title: "이름, 전화번호는 필수 입력 항목입니다.",
                icon: ErrorIcon,
                confirmButton: {
                    handleOnClick: () => setIsConfirmModalOpen({ ...isConfirmModalOpen, isOpen: false }),
                    label: "확인",
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
        <WithNoGuttersTopAndBottomLayout>
            <ChangeDataWithApiHeaderNagigation label="내정보 수정" onSubmit={handlerOnSubmit} state={loading} />
            {
                !isLoading && data && (
                    <Wrapper>
                        <ImageWrapper>
                            <Lable htmlFor={profile.name}>
                                {
                                    !previewImage ?
                                        <UserImg src={data.profileUrl} alt="프로필 미리보기" /> :
                                        <UserImg src={previewImage} alt="프로필 미리보기" />
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
                        </ImageWrapper>
                        <InputWithLable style={{ width: "100%", marginTop: "2rem" }}
                            elements={phoneNumber}
                            onChange={setPhoneNumber} />
                        <InputWithLable style={{ width: "100%", marginTop: "2rem" }}
                            elements={name}
                            onChange={setName} />
                        {/* <InputWithLable style={{ width: "100%", marginTop: "2rem" }}
                            elements={email}
                            onChange={setEmail} />
                        <InputWithLable style={{ width: "100%", marginTop: "2rem" }}
                            elements={password}
                            onChange={setPassword} /> */}
                    </Wrapper>
                )
            }
            <Footer>
                <Link to="delete">
                    <Typography.P200 color={theme.color.N50}
                        style={{ textDecoration: "underline", textUnderlinePosition: "under" }}>서비스 탈퇴하기</Typography.P200>
                </Link>
            </Footer>
        </WithNoGuttersTopAndBottomLayout>
    )
}

const Footer = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`

const Wrapper = styled.div`
    padding: 0 2rem;
    height: 100%;
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
    cursor: pointer;
`
const Input = styled.input`
    display: none;
`
const ImageWrapper = styled.div`
  text-align: center;
  margin-top: 3.2rem;
`;


export default ChangeAccountPage;