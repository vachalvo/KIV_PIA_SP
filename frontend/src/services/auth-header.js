import Constants from "../global/constants";

export default function authHeader(csfrToken = undefined) {
    const token = JSON.parse(sessionStorage.getItem(Constants.SESSION_STORAGE_TOKEN));
    const headers = Constants.HEADERS;

    if (token) {
        if(csfrToken){
            return {
                ...headers,
                Authorization: Constants.AUTH_TYPE + ' ' + token,
                'X-Authorization': Constants.AUTH_TYPE + ' ' + token,
                'X-XSRF-TOKEN': csfrToken,
                'X-CSRF-TOKEN': csfrToken,
            };
        }
        return {
            ...headers,
            Authorization: Constants.AUTH_TYPE + ' ' + token,
            'X-Authorization': Constants.AUTH_TYPE + ' ' + token,

        };
    }

    return headers;
}