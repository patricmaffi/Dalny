import React, { useState, useEffect } from "react";
import { Text, View, Icon } from "native-base";
import commonStyles from "../commonStyles";
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import DefaultStyle from "../style/DefaultStyle";
import { ShowMessage1 } from "../components/Utils";
import { useDispatch } from "react-redux";
import { newOrder, setReloadOrders } from "../Modules/Pedido/PedidoAction";

const FooterTabs = ({ navigation, carrinho, user, secondFooter }) => {
    const dispatch = useDispatch();
    console.log("FOOTER");
    const [wait, setWait] = useState(false);
    let market =
        navigation && navigation.state.params && navigation.state.params.market
            ? navigation.state.params.market
            : undefined;
    // console.log(market)
    let footer2 = () => {
        let makeButton = (iconName, screenName, title, event) => {
            return (
                <TouchableOpacity
                    style={DefaultStyle.touchIconFooter}
                    onPress={() => {
                        if (event) {
                            event();
                        }
                        navigation.navigate(screenName);
                    }}
                >
                    <Icon
                        name={iconName}
                        size={20}
                        style={{
                            color: commonStyles.colors.iconSecundaryColor,
                            alignSelf: "center",
                        }}
                    />
                    <Text style={DefaultStyle.menulabel}>{title}</Text>
                </TouchableOpacity>
            );
        };
        return (
            <View
                style={{
                    height: 55,
                    justifyContent: "center",
                    paddingTop: 5,
                    backgroundColor: commonStyles.colors.backgoundHeader,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 25,
                    }}
                >
                    {makeButton("home", "Dashboard", "Início")}
                    {makeButton("ios-cube", "Modelo", "Novo", () => {
                        dispatch(newOrder());
                    })}
                    {makeButton("logo-buffer", "Pedidos", "Pedidos", () => {
                        dispatch(setReloadOrders());
                    })}
                    {makeButton("ios-settings", "Config1", "Conf")}
                </View>
                <ShowMessage1
                    visible={wait}
                    touchCallback={() => {
                        setWait(false);
                    }}
                ></ShowMessage1>
            </View>
        );
    };
    return footer2();
    // return footer1()
};

export default FooterTabs;
