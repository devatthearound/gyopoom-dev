import InputElements from "@dto/input.elements";

export {
    defaultBusinessNumber,
    defaultYKIHO,
    defaultPharmacyName,
    defaultPharmacyAddress,
    defaultCreateDate,
    defaultMedicineCode,
    defaultMedicineName,
    defaultManufacturer,
    defaultSpecification,
    defaultQuantity,
    defaultUnitPrice,
    defaultPrice
}

const defaultBusinessNumber: InputElements = {
    name: "businessNumber",
    label: "사업자번호",
    type: "number",
    placeholder: "123-45-67890",
    errormessage: "필수 입력값 입니다",
    regex: /^.{1,}$/,
    invalid: true
}

const defaultYKIHO: InputElements = {
    name: "YKIHO",
    type: "number",
    label: "요양기관번호",
    placeholder: "123-45-67890",
    errormessage: "필수 입력 값입니다",
    regex: /^.{1,}$/,
    invalid: true
}

const defaultPharmacyName: InputElements = {
    name: "pharmacyName",
    type: "text",
    label: "약국명",
    placeholder: "약국명을 입력해주세요",
    errormessage: "필수 입력 값입니다",
    regex: /^.{1,}$/,
    invalid: true,
    value: ""
}
const defaultPharmacyAddress: InputElements = {
    name: "address",
    type: "text",
    label: "주소",
    placeholder: "주소를 입력해주세요",
    errormessage: "필수 입력 값입니다",
    regex: /^.{1,}$/,
    invalid: true,
    value: ""
}

const defaultCreateDate: InputElements = {
    name: "createDate",
    type: "text",
    label: "거래일자",
    placeholder: "거래일자 입력해주세요",
    errormessage: "필수 입력 값입니다",
    regex: /^.{1,}$/,
    invalid: true,
    value: ""
}
const defaultMedicineCode: InputElements = {
    name: "medicineCode",
    type: "text",
    label: "약품코드",
    placeholder: "약품코드 입력해주세요",
    errormessage: "필수 입력 값입니다",
    regex: /^.{1,}$/,
    invalid: true,
    value: ""
}

const defaultMedicineName: InputElements = {
    name: "medicineName",
    type: "text",
    label: "약품명",
    placeholder: "약품명을 입력해주세요",
    errormessage: "필수 입력 값입니다",
    regex: /^.{1,}$/,
    invalid: true,
    value: ""
}

const defaultManufacturer: InputElements = {
    name: "manufacturer",
    type: "text",
    label: "제조사",
    placeholder: "제조사를 입력해주세요",
    errormessage: "필수 입력 값입니다",
    regex: /^.{1,}$/,
    invalid: true,
    value: ""
}

const defaultSpecification: InputElements = {
    name: "specification",
    type: "number",
    label: "규격",
    placeholder: "규격 입력",
    errormessage: "필수 입력 값입니다",
    regex: /^.{1,}$/,
    invalid: true,
    value: ""
}

const defaultQuantity: InputElements = {
    name: "specification",
    type: "number",
    label: "수량",
    placeholder: "수량 입력",
    errormessage: "필수 입력 값입니다",
    regex: /^.{1,}$/,
    invalid: true,
    value: null
}

const defaultUnitPrice: InputElements = {
    name: "specification",
    type: "number",
    label: "단가",
    placeholder: "단가 입력",
    errormessage: "필수 입력 값입니다",
    regex: /^.{1,}$/,
    invalid: true,
    value: null
}

const defaultPrice: InputElements = {
    name: "specification",
    type: "number",
    label: "금액",
    placeholder: "금액 입력",
    errormessage: "필수 입력 값입니다",
    regex: /^.{1,}$/,
    invalid: true,
    value: null
}