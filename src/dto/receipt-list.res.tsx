import ReciptThumnailDTO from "./receipt-thumnail.res"

type ReciptListDTO = {
    items: ReciptThumnailDTO[]
    cursor: number
}

export default ReciptListDTO