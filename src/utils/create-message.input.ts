import InputElements from "@dto/input.elements";

export {
    defaultMessage
}

const defaultMessage: InputElements = {
    name: "message",
    type: "text",
    placeholder: "내용을 입력해주세요.",
    regex: /^.{1,}$/,
    invalid: true,
    value: ''
}
