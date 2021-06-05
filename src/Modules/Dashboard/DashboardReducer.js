const INITIAL_STATE_ESTOQUE = {
    estoque: "0",
    adicao: true,
    showmessage: false,
    message: "Salvo com sucesso",
};

function estoque(state = INITIAL_STATE_ESTOQUE, action) {
    console.log("estoque reducer function");
    // console.log(state);
    // console.log(action);
    switch (action.type) {
        case "FETCHED_ESTOQUE":
            return { ...action.data };
        default:
            return state;
    }
}
export default estoque;
