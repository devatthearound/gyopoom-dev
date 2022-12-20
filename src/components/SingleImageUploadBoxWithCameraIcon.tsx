import { useState } from "react"
import styled from "styled-components";
import { theme } from "@styles/theme";
import CameraIcon from "@images/icons/camera_alt.svg"
import CloseIcon from "@images/icons/close.svg"
import InputElements from "@dto/input.elements";
import Hide from "@components/Hide";
import BounceClickAnimation from "@components/animation/BounceClickAnimation";

type Props = {
    defaultValue?: string
    elements: InputElements
    onChange: React.Dispatch<React.SetStateAction<InputElements>>
}

const SingleImageUploadBoxWithCameraIcon: React.FC<Props> = ({ defaultValue, elements, onChange }) => {
    const [previewImages, setPreviewImages] = useState<string>(defaultValue ? defaultValue : "");
    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, files } = e.target;
        if (files) {
            onChange({ ...elements, invalid: false, value: files[0] })
            setPreviewImages(URL.createObjectURL(files[0]));
        }
    };

    const deleteImage = () => {
        onChange({ ...elements, invalid: true, value: {} })
        setPreviewImages("");
    }

    return (
        <>
            <Wrapper>
                <BounceClickAnimation>
                    <Lable htmlFor={elements.name} />
                </BounceClickAnimation>
                <Input
                    id={elements.name}
                    name={elements.name}
                    type={elements.type}
                    placeholder={elements.placeholder}
                    required={elements.require}
                    autoComplete="off"
                    invalid={elements.invalid}
                    disabled={elements.disabled}
                    onChange={handlerOnChange} />
                {
                    previewImages &&
                    <>
                        <ImageWrapper>
                            <DeleteButton onClick={() => deleteImage()}><Hide>삭제 버튼</Hide></DeleteButton>
                            <UserImg src={previewImages} alt="프로필 미리보기" />
                        </ImageWrapper>
                    </>
                }
            </Wrapper>
        </>
    )
}

const DeleteButton = styled.button`
    position: absolute;
    right: 1.5rem;
    top: 0.5rem;
    width: 1.6rem;
    height: 1.6rem;
    border: 0px;
    border-radius: 0.2rem;
    background: url(${CloseIcon}) no-repeat center / 0.9rem 0.9rem #9B9B9B;
    cursor: pointer;
`

const Wrapper = styled.div`
    display: flex;
    overflow-y: scroll;
    
`
const Input = styled.input<{ invalid: boolean }>`
    display: none;
`
const ImageWrapper = styled.div`
    position: relative;
`
const UserImg = styled.img`
    width: 7.2rem;
    height: 7.2rem;
    border-radius: 0.4rem;
    object-fit: cover;
    border: 1px solid ${theme.color.N40};
    margin-right: 0.8rem;
`

const Lable = styled.label`
    display: block;
    position: relative;
    width: 7.2rem;
    height: 7.2rem;
    border-radius: 0.4rem;
    text-align: center;
    background: url(${CameraIcon}) no-repeat center;
    border: 1px solid ${theme.color.N40};
    margin-right: 0.8rem;
    cursor: pointer;
`

export default SingleImageUploadBoxWithCameraIcon