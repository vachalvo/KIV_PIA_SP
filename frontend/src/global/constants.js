const Constants = {
    BASE_URL: 'http://localhost:8080',
    SESSION_STORAGE_TOKEN: 'token',
    SESSION_STORAGE_USER_ID: 'id',
    SESSION_STORAGE_ADMIN: 'admin',
    SESSION_STORAGE_USER: 'user',
    SESSION_STORAGE_CHAT_USER_ID: 'chat_user_id',
    SESSION_STORAGE_CHAT_USER_NAME: 'chat_user_name',
    AUTH_TYPE: 'Bearer',
    XSRF_TOKEN_COOKIE: 'XSRF-TOKEN',
    HEADERS: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        withCredentials: true,
    },
}

export default Constants;