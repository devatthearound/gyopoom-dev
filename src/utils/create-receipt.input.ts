import InputElements from "@dto/input.elements";

export {
    defaultPharmacyBusinessNumber,
    defaultPharmacyName,
    defaultProviderName,
    defaultPharmacyAddress,
    defaultCreateDate,
    prodCode,
    prodName,
    company,
    unit,
    unitPrice,
    quantity,
    price
}


const defaultPharmacyBusinessNumber: InputElements = {
    name: "pharmacyBuinessNumber",
    type: "text",
    label: "사업자번호",
    placeholder: "123-45-67890",
    regex: /^.{1,}$/,
    invalid: false,
    value: ""
}

const defaultPharmacyName: InputElements = {
    name: "pharmacyName",
    type: "text",
    label: "약국명",
    placeholder: "약국명을 입력해주세요",
    regex: /^.{1,}$/,
    invalid: false,
    value: ""
}

const defaultPharmacyAddress: InputElements = {
    name: "pharmacyAddress",
    type: "text",
    label: "주소",
    placeholder: "서울시 강동구 길동 96, 1층",
    regex: /^.{1,}$/,
    invalid: false,
    value: ""
}

const defaultProviderName: InputElements = {
    name: "name",
    label: "성함",
    type: "string",
    placeholder: "이름을 입력해주세요",
    regex: /^.{1,}$/,
    invalid: false,
    value: ""
}


const defaultCreateDate: InputElements = {
    name: "createDate",
    type: "text",
    label: "거래일자",
    placeholder: "거래일자 입력해주세요",
    regex: /^.{1,}$/,
    invalid: false,
    value: ""
}
const prodCode: InputElements = {
    name: "prodCode",
    type: "text",
    label: "약품코드",
    placeholder: "약품코드 입력해주세요",
    regex: /^.{1,}$/,
    invalid: false,
    value: ""
}

const prodName: InputElements = {
    name: "prodName",
    type: "text",
    label: "약품명",
    placeholder: "약품명을 입력해주세요",
    regex: /^.{1,}$/,
    invalid: false,
    value: ""
}

const company: InputElements = {
    name: "company",
    type: "text",
    label: "제조사",
    placeholder: "제조사를 입력해주세요",
    regex: /^.{1,}$/,
    invalid: false,
    value: ""
}

const unit: InputElements = {
    name: "unit",
    type: "number",
    label: "규격",
    placeholder: "규격 입력",
    regex: /^.{1,}$/,
    invalid: false,
    value: null
}

const quantity: InputElements = {
    name: "quantity",
    type: "number",
    label: "수량",
    placeholder: "수량 입력",
    regex: /^.{1,}$/,
    invalid: false,
    value: null
}

const unitPrice: InputElements = {
    name: "unitPrice",
    type: "number",
    label: "단가",
    placeholder: "단가 입력",
    regex: /^.{1,}$/,
    invalid: false,
    value: null
}

const price: InputElements = {
    name: "price",
    type: "number",
    label: "금액",
    placeholder: "거래 금액 입력",
    regex: /^.{1,}$/,
    invalid: false,
    value: null
}