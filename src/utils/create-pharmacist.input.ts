import InputElements from "@dto/input.elements";

export {
    defaultPharmacist
}

const defaultPharmacist: InputElements = {
    name: "pharmacistLisenceNumber",
    type: "number",
    label: "의사면호 번호",
    placeholder: "1234567890",
    regex: /^.{1,}$/,
    invalid: true
}
