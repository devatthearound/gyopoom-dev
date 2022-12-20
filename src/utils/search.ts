import InputElements from "@dto/input.elements";

const defaultSearch: InputElements = {
    name: "search",
    type: "search",
    placeholder: "의약품 검색",
    regex: /^.{1,}$/,
    invalid: true,
    value: ""
}

export { defaultSearch } 