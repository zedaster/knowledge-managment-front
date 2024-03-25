// TODO: Перенести адреса в dotenv
const apiUrl = 'https://backend-richie.kexogg.ru/'

export default {
    GET_ROOT_TREE: apiUrl,
    GET_SINGLE_ARTICLE: apiUrl + '',
    CREATE_ARTICLE: apiUrl + '',
    REGISTER: apiUrl + 'auth/registration',
    LOGIN: apiUrl + 'auth/login',
    REFRESH_TOKEN: apiUrl + 'refreshToken',
    DELETE_ARTICLE: apiUrl + '',
    GET_EDIT_DATA: apiUrl + 'history/',
    GET_CERTAIN_VERSION: apiUrl + 'history/versions/',
    COMMIT_VERSION: apiUrl + 'history/'
};