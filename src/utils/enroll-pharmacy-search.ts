import InputElements from "@dto/input.elements";

export {
    defaultPharmacySearch
}

const defaultPharmacySearch: InputElements = {
    name: "keyword",
    label: "사업자번호",
    type: "number",
    placeholder: "사업자번호를 입력해주세요.",
    errormessage: "필수 입력값 입니다",
    regex: /^((.|\n)*)$/,
    invalid: true,
    value: ""
}