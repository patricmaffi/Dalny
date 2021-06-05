import { combineReducers } from "redux";
import pedido from "../Modules/Pedido/PedidoReducer";
import config from "../Modules/Configuracao/ConfigReducer";
import auth from "../Modules/Auth/AuthReducer";

const rootReducer = combineReducers({
    pedido: pedido,
    config: config,
    auth: auth,
});

export default rootReducer;
