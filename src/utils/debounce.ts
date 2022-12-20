
function debounce<T extends (...args: any) => any>(callBack: T, duration: number) {
    let timer: NodeJS.Timeout;

    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callBack(...args);
        }, duration);
    };
}

export default debounce