
export enum DeliveryMethod {
    PARCEL = "PARCEL", // 배송 비대면
    MEET = "MEET" // 직거래 만나서
}

export enum UserStateCode {
    PUBLIC = "PUBLIC",  // 계정 활성화
    PRIVATE = "PRIVATE", // 계정 비활성화, 아직 기능은 없지만 우선 둘께요
    DELETE = "DELETE" // 계정 삭제
}

export enum PostStateCode {
    PUBLIC = "PUBLIC",  // 글 공개
    DELETE = "DELETE"   // 글 삭제
}

export enum GoodsSateCode {
    RESERVATION = "RESERVATION", //예약중
    SALE = "SALE",      // 판매중
    SOLDOUT = "SOLDOUT",    //거래완료
    SUSPEND = "SUSPEND" // 일시중단 
}

export enum PharmacyStateCode {
    ACTIVE = "ACTIVE", // 디폴트
    DELETED = "DELETED"    // 삭제
}

export enum PharmacyEnrollStateCode {
    ACTIVE = "ACTIVE", // 디폴트
    DELETED = "DELETED"    // 삭제
}

export enum PharmacyUserRoleCode {
    ADMIN = "ADMIN", // 관리자
    MANAGER = "MANAGER"    // 매니저
}

export enum GoodsPurchaseState {
    inProgress = "inProgress",
    reject = "reject",
    done = "done",
    delete = "delete"
}

export enum ChatMessageTypeCode {
    message = "message",
    purchaseInProgress = "purchaseInProgress",
    purchaseDone = "purchaseDone",
    goods = "goods"
}


// 프론트에서 한글 표출 시 사용할 Enum

export enum DeliveryMethodKR {
    PARCEL = "택배배송", // 배송 비대면
    MEET = "직거래" // 직거래 만나서
}

export enum PharmacyUserRoleText {
    ADMIN = "관리자", // 관리자
    MANAGER = "일반"    // 매니저
}

export enum GoodsSateText {
    RESERVATION = "예약중", //예약중
    SALE = "판매중",      // 판매중
    SOLDOUT = "거래완료",    //거래완료
    SUSPEND = "숨김" // 일시중단 
}
