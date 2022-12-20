import InputElements from "@dto/input.elements";

export {
    defaultImage,
    defaultTitle,
    defaultIsNegotiation,
    defaultExchangeGoods,
    defaultPrice,
    defaultContent,
    defaultQuantity
}

const defaultImage: InputElements = {
    name: "image",
    label: "굿",
    type: "file",
    placeholder: "프로필사진을 입력해주세요",
    errormessage: "필수 입력값 입니다",
    regex: /^.+\.(jpe?g|png)$/i,
    invalid: false
}

const defaultTitle: InputElements = {
    name: "title",
    type: "text",
    placeholder: "제목 * 필수",
    errormessage: "필수 입력 값입니다",
    regex: /^.{1, 20}$/,
    invalid: false,
}

const defaultQuantity: InputElements = {
    name: "quantity",
    type: "number",
    errormessage: "필수 입력 값입니다",
    placeholder: "판매갯수",
    regex: /^[0-9]{1,6}$/,
    invalid: false,
}

const defaultPrice: InputElements = {
    name: "price",
    type: "number",
    placeholder: "가격 입력 (필수)",
    errormessage: "필수 입력 값입니다",
    regex: /^[0-9]{1,}$/,
    invalid: false
}

const defaultIsNegotiation: InputElements = {
    name: "isNegotiation",
    type: "checkbox",
    placeholder: "가격 협의",
    value: false,
    invalid: false,
    regex: /^$/
}

const defaultExchangeGoods: InputElements = {
    name: "exchanageGoods",
    type: "text",
    placeholder: "맞교화 제품 *선택",
    errormessage: "필수 입력 값입니다",
    regex: /^.{0,}$/,
    invalid: false,
}

const defaultContent: InputElements = {
    name: "content",
    type: "textarea",
    placeholder: "의약품 교품에 대한 내용을 작성해 주세요.",
    errormessage: "필수 입력 값입니다",
    regex: /^((.|\n)*)$/,
    invalid: false
}