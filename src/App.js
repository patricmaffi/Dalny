import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider } from "react-redux";
import store from "./_redux/index";
import Barcode from "./screens/Barcode";
import Config from "./Modules/Configuracao/Config";
import Modelo from "./Modules/Pedido/Modelo";
import Dashboard from "./Modules/Dashboard/Dashboard";
import Detalhes from "./Modules/Pedido/Detalhes";
import Checkout from "./Modules/Pedido/Checkout";
import Pedidos from "./Modules/Pedido/Pedidos";

const RootStack = createStackNavigator({
    Dashboard: {
        screen: Dashboard,
    },
    Detalhes: {
        screen: Detalhes,
    },
    Config: {
        screen: Config,
    },
    Barcode: {
        screen: Barcode,
    },
    Modelo: {
        screen: Modelo,
    },
    Checkout: {
        screen: Checkout,
    },
    Pedidos: {
        screen: Pedidos,
    },
});

const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
