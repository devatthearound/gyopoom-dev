const useGetObjectSliceValueWithNumericKey = (object: {}, sliceNumber: number) => {
    const result = Object.keys(object).map((oneElement) => parseInt(oneElement)).reverse().slice(0, sliceNumber);
    return result;
}

export default useGetObjectSliceValueWithNumericKey