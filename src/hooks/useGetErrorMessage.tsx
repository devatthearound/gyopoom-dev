type ErrorWithMessage = {
    message: string;
};

export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
    return (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as Record<string, unknown>).message === "string"
    );
}

export const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
    if (isErrorWithMessage(maybeError)) return maybeError;
    
    try {
        return new Error(JSON.stringify(maybeError));
    } catch {
        // 순환 참조와 같이 maybeError를 stringify하는 과정에서 발생하는
        // 에러에 대해 fallback을 제공한다
        return new Error(String(maybeError));
    }
}

const useGetErrorMessage = (error: unknown) => {
    return toErrorWithMessage(error).message;
}

export default useGetErrorMessage