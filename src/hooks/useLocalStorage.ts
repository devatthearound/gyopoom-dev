const useLocalStorage = () => {
    const setLocalStorage = <T>(key: string, value: T) => {
        const localStorageObject = window.localStorage.getItem(key);
        if (localStorageObject) {
            window.localStorage.removeItem(key);
        }

        const valueToObject = {
            value: value,
            expire: new Date(Date.now() + (3600 * 1000 * 24))
        }
        const objectToString = JSON.stringify(valueToObject);

        window.localStorage.setItem(key, objectToString)
    }

    const getLocalStorage = (key: string) => {
        const localStorageObject = window.localStorage.getItem(key);

        // null 체크
        if (!localStorageObject) {
            return null;
        }

        // 문자열을 객체로 변환
        const value = JSON.parse(localStorageObject);


        // 현재 시간과 localStorage의 expire 시간 비교
        if (Date.now() > value.expire) {
            // 만료시간이 지난 item 삭제
            window.localStorage.removeItem(key);

            // null 리턴
            return null;
        }
        console.log(value.value)

        // 만료기간이 남아있는 경우, value 값 리턴
        return value.value;
    }
    return { setLocalStorage, getLocalStorage }
};

export default useLocalStorage