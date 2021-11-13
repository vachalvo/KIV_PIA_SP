const baseURL = 'http://localhost:8080'

export const getUri = (useCase) => {
    return baseURL + useCase;
}

export const initFetch = (method, data) => {
    return {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
}
