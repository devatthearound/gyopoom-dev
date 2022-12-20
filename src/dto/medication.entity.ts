interface MedicationEntity {
    method: string
    KFDAClassify: string
    mainElementCode: string,
    prodCode: string,
    prodName: string,
    company: string,
    standard: string,
    unit: string,
    unitPrice: number,
    etc: boolean
}

export default MedicationEntity