import InputElements from "@dto/input.elements";

const defaultName: InputElements = {
    name: "name",
    type: "text",
    label: "이름",
    placeholder: "이름을 입력해주세요",
    errormessage: "2~8자 이내 입력",
    regex: /^[가-힣]{2,8}$/,
    invalid: false,
}
const defaultCode: InputElements = {
    name: "code",
    type: "number",
    placeholder: "인증번호를 입력해주세요.",
    errormessage: "인증번호 6자리를 입력해주세요.",
    regex: /^[0-9]{4}$/,
    invalid: false,
}

const defaultPhoneNumber: InputElements = {
    name: "phoneNumber",
    type: "number",
    label: "휴대폰 번호",
    placeholder: "로그인을 위해 전화번호를 입력해주세요.",
    errormessage: "-없이 입력해주세요",
    regex: /^[0-9]{11}$/,
    invalid: false,
    disabled: true
}

const defaultProfile: InputElements = {
    name: "profile",
    type: "file",
    placeholder: "프로필사진을 입력해주세요",
    regex: /^.+\.(jpe?g|png)$/i,
    invalid: false,
}

const defaultEmail: InputElements = {
    name: "email",
    type: "email",
    label: "이메일(선택)",
    placeholder: "이메일 입력",
    regex: /^[0-9]{11}$/,
    invalid: false,
}
const defaultPassword: InputElements = {
    name: "password",
    type: "password",
    label: "비밀번호(선택)",
    placeholder: "비밀번호 입력",
    regex: /^.+\.(jpe?g|png)$/i,
    invalid: false,
}

export { defaultName, defaultPhoneNumber, defaultProfile, defaultCode, defaultEmail, defaultPassword }