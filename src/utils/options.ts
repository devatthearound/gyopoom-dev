export type CustomSuccess<A> = {
    readonly status: number;
    readonly data: A;
}

export type CustomError = {
    readonly status: number;
    readonly message: string;
}

export type Option<A> = CustomSuccess<A> | CustomError;

export const successRes = <A extends { status: number, data: B }, B>(httpResponse: A): Option<B> => ({
    status: httpResponse.status,
    data: httpResponse.data
});

export const errorRes = (error: string): Option<never> => ({
    status: 777,
    message: error
});

export const isSuccess = <A>(oa: Option<A>): oa is CustomSuccess<A> => (oa.status == 201) || (oa.status == 200) || (oa.status == 202) || (oa.status == 204);

export const isNotFound = <A>(oa: Option<A>): oa is CustomSuccess<A> => oa.status === 404;

export const isError = <A>(oa: Option<A>): oa is CustomError => oa.status === 777;