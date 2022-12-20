import InputElements from "@dto/input.elements";

export {
    defaultTitle
}

const defaultTitle: InputElements = {
    name: "제목",
    type: "string",
    placeholder: "제목을 입력해주세요",
    errormessage: "필수 입력값 입니다",
    regex: /^.{1,20}$/,
    invalid: true,
    value: ""
}