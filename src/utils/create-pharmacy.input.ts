import InputElements from "@dto/input.elements";

const defaultBusniessNumber: InputElements = {
    name: "busniessNumber",
    type: "number",
    label: "사업자번호",
    placeholder: "사업자번호 10자리 입력",
    errormessage: "-없이 사업자버호 10자를 입력해주세요",
    regex: /^[0-9]{10}$/,
    invalid: true,
    value: ""
}

const defaultPharmacyName: InputElements = {
    name: "pharmacyName",
    type: "text",
    label: "약국명",
    placeholder: "약국명 입력",
    errormessage: "필수 입력값 입니다",
    regex: /^.{1,}$/,
    invalid: true,
    value: ""
}

const defaultPharmacyAddress: InputElements = {
    name: "pharmacyAddress",
    type: "text",
    label: "주소",
    placeholder: "약국주소 입력",
    errormessage: "필수 입력값 입니다",
    regex: /^.{1,}$/,
    invalid: true,
    value: ""
}

export { defaultBusniessNumber, defaultPharmacyName, defaultPharmacyAddress }