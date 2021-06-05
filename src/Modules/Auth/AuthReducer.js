export const INITIAL_STATE_USER = {
    user: undefined,
    showLoading: false,
    loadedFonts: false,
}

function auth(state = INITIAL_STATE_USER, action) {
    console.log('CHECKOUT reducer function')
    switch (action.type) {
        case 'RESET_USER':
            return { ...state, user: undefined }
        case 'SET_USER':
            return { ...state, user: action.user }
        case 'SET_LOADING_LOGIN':
            return { ...state, showLoading: action.isshow }
        case 'LOADED_FONTS':
            return { ...state, loadedFonts: action.isloaded }
        default:
            return state
    }
}
export default auth
