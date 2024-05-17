const apiUrl = import.meta.env.VITE_API_URL

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

    // formulas
    GET_ALL_FORMULAS: apiUrl + "formulas",
    GET_FORMULA_BY_ID: apiUrl + "formulas/",
    GET_FORMULA_TITLE_MAP: apiUrl + "formulas/map",
    UPDATE_FORMULA: apiUrl + "formulas/",
    CREATE_FORMULA: apiUrl + "formulas",
    DELETE_FORMULA: apiUrl + "formulas/",

    // admin panel
    GET_PANEL_USERS: apiUrl + "panel/users",
    UPDATE_MANY_PANEL_USERS: apiUrl + "panel/users",

    // user profile
    GET_PROFILE_INFO: apiUrl + "profile/"
};