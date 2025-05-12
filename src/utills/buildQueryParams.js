export const buildQueryParams = (paramsObj) => {
    const params = new URLSearchParams();
    for (const key in paramsObj) {
        const value = paramsObj[key];
        if (value !== undefined && value !== null && value !== "") {
            params.append(key, String(value));
        }
    }
    return params.toString();
};
