const apiUrl = 'http://localhost:55555/'

export default {
    GET_ROOT_TREE: apiUrl,
    GET_ARTICLE_WITH_FULL_TREE: apiUrl + '',
    GET_ARTICLE_WITH_CHILDREN: apiUrl + 'test/',
    CREATE_ARTICLE: apiUrl + '',
    REGISTER: apiUrl + 'auth/registration',
    LOGIN: apiUrl + 'auth/login',
    REFRESH_TOKEN: apiUrl + 'refreshToken',
    DELETE_ARTICLE: apiUrl + '',
    GET_EDIT_DATA: apiUrl + 'history/',
    GET_CERTAIN_VERSION: apiUrl + 'history/versions/',
    COMMIT_VERSION: apiUrl + 'history/',
};