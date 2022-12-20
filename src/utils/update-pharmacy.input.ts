import InputElements from "@dto/input.elements";

const defaultBusniessNumber: InputElements = {
    name: "busniessNumber",
    type: "number",
    label: "사업자번호",
    placeholder: "123-45-67890",
    errormessage: "-없이 사업자버호 10자를 입력해주세요",
    regex: /^[0-9]{10}$/,
    invalid: false,
    value: ""
}

const defaultPharmacyName: InputElements = {
    name: "pharmacyName",
    type: "text",
    label: "약국명",
    placeholder: "동주약국",
    errormessage: "필수 입력값 입니다",
    regex:  /^.{1,}$/,
    invalid: false,
    value: ""
}

const defaultPharmacyAddress: InputElements = {
    name: "pharmacyAddress",
    type: "text",
    label: "주소",
    placeholder: "서울시 강동구 길동 96, 1층",
    errormessage: "필수 입력값 입니다",
    regex:  /^.{1,}$/,
    invalid: false,
    value: ""
}

export { defaultBusniessNumber, defaultPharmacyName, defaultPharmacyAddress }