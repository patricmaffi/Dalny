export function setUser(user) {
    return { type: 'SET_USER', user }
}
export function setLoading(isshow) {
    return { type: 'SET_LOADING_LOGIN', isshow }
}
export function setLoadedFonts(isloaded) {
    return { type: 'LOADED_FONTS', isloaded }
}
export function resetUser() {
    return { type: 'RESET_USER' }
}
