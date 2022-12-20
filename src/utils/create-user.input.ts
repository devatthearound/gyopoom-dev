import InputElements from "@dto/input.elements";

const defaultName: InputElements = {
    name: "name",
    type: "text",
    placeholder: "이름을 입력해주세요",
    regex: /^[가-힣]{2,4}$/,
    invalid: true,
    value: ""
}

const defaultCode: InputElements = {
    name: "code",
    type: "number",
    placeholder: "인증번호를 입력해주세요.",
    regex: /^[0-9]{4}$/,
    invalid: true
}

const defaultPhoneNumber: InputElements = {
    name: "phoneNumber",
    type: "number",
    placeholder: "로그인을 위해 전화번호를 입력해주세요.",
    regex: /^[0-9]{11}$/,
    invalid: true
}

const defaultProfile: InputElements = {
    name: "profile",
    type: "file",
    placeholder: "프로필사진을 입력해주세요",
    regex: /^.+\.(jpe?g|png)$/i,
    invalid: true,
    value: {} as File
}

export { defaultName, defaultPhoneNumber, defaultProfile, defaultCode }