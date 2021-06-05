import { INITIAL_STATE_ESTOQUE } from "../../_redux/index";
export function fetchEstoque(data) {
    return { type: "FETCHED_ESTOQUE", data };
}
export function resetEstoque() {
    console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");

    return fetchEstoque({
        estoque: "0",
        adicao: true,
        showmessage: true,
        message: "Salvo com sucesso",
    });
}
