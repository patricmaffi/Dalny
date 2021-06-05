const INITIAL_STATE = {};

function config(state = INITIAL_STATE, action) {
    console.log("CONFIG reducer function");
    // console.log(state);
    console.log(action);
    switch (action.type) {
        case "FETCHED_CONFIG":
            return { ...action.data };
        default:
            return state;
    }
}
export default config;
