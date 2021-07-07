import React, { useState, useEffect } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import {
    Container,
    Text,
    View,
    Body,
    Card,
    CardItem,
    Button,
    Icon,
} from "native-base";
import commonStyles from "../../commonStyles";
import Background from "../../components/Background";
import { sendEmail1, ShowMessage1 } from "../../components/Utils";
import { useSelector, useDispatch } from "react-redux";
import {
    clearOrders,
    deleteOrder,
    fetchOrders,
    generatePedidoPdf,
    getOrders,
    saveOrder,
    setOrder,
    setReloadOrders,
} from "./PedidoAction";
const Pedidos = ({ navigation }) => {
    const dispatch = useDispatch();
    const loadOrders = useSelector((state) => state.pedido.loadOrders);
    const orders = useSelector((state) => state.pedido.orders);
    const [data, setData] = useState({
        message: "Salvo com sucesso",
        showmessage: false,
    });

    let updateData = () => {
        setData(Object.assign({}, data));
    };
    console.log("xxxxxxxxxxxxxx PEDIDOS xxxxxxxxxxxxxxx");

    let loadItens = async (filtro, issearch) => {
        if (!loadOrders) {
            return;
        }
        let _orders = await getOrders();
        dispatch(fetchOrders(_orders));
    };
    loadItens();
    let selectModel = async () => {
        navigation.navigate("");
    };
    let onChangeForm = (field, value) => {
        data[field] = value;
        updateData();
    };

    if (!orders) {
        return null;
    }
    return (
        <Container style={{ paddingTop: 10 }}>
            <Background
                navigation={navigation}
                showlogo={false}
                title={"FINALIZAR PEDIDO"}
            >
                <ScrollView style={{ flex: 15, paddingHorizontal: 40 }}>
                    <CardPedidos
                        navigation={navigation}
                        pedidos={orders}
                    ></CardPedidos>
                </ScrollView>
                <Button
                    style={{
                        justifyContent: "center",
                        backgroundColor: commonStyles.colors.buttonGreen,
                        borderRadius: 8,
                        borderTopEndRadius: 0,
                        borderTopStartRadius: 0,
                        height: 50,
                        marginBottom: 5,
                        marginHorizontal: 50,
                    }}
                    onPressOut={async () => {
                        await clearOrders();
                        setTimeout(() => {
                            dispatch(setReloadOrders());
                        }, 1500);
                        setTimeout(() => {
                            dispatch(setReloadOrders());
                        }, 3000);
                    }}
                >
                    <Text style={{ textAlign: "center" }}>Limpar Pedidos</Text>
                </Button>
            </Background>
            <ShowMessage1
                visible={data.showmessage}
                message={data.message}
                timeout={3000}
                touchCallback={() => {
                    data.estoque = "0";
                    data.adicao = true;
                    data.showmessage = false;
                    data.item = undefined;

                    updateData();
                }}
            ></ShowMessage1>
        </Container>
    );
};
Pedidos.navigationOptions = {
    title: "Pedidos",
    headerShown: false,
};
export default Pedidos;

const CardHeader = ({ titulo, showIcon, navigation }) => {
    return (
        <View style={commonStyles.cardHeader}>
            <Text
                style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 16,
                    flex: 9,
                }}
            >
                {titulo}
            </Text>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Modelo");
                }}
                style={{
                    width: 50,
                    display: showIcon == true ? "flex" : "none",
                }}
            >
                <Icon
                    name={"ios-add-circle"}
                    style={{
                        color: commonStyles.colors.iconSecundaryColor,
                        alignSelf: "center",
                        fontSize: 24,
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

const CardPedidos = ({ navigation, pedidos }) => {
    return (
        <Card style={commonStyles.card}>
            <CardHeader titulo={"Pedidos"} navigation={navigation}></CardHeader>
            <CardItem>
                <Body style={commonStyles.cardItemBody}>
                    <CardOrder
                        pedidos={pedidos}
                        navigation={navigation}
                    ></CardOrder>
                </Body>
            </CardItem>
        </Card>
    );
};

const CardOrder = ({ navigation, pedidos }) => {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.pedido.order);
    const modelos = useSelector((state) => state.pedido.modelos);
    let handleSelect = (order) => {
        dispatch(setOrder(order));
        navigation.navigate("Checkout");
    };
    let handleConfirmSendEmail = (order) => {
        if (order.sended) {
            // return;
        }
        Alert.alert(
            "Atenção",
            "Tem certeza que deseja enviar \nApós enviado não será mais possível editar",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "Sim", onPress: () => enviarEmail(order) },
            ]
        );
    };
    let handleDelete = (order) => {
        Alert.alert("Atenção", "Tem certeza que deseja excluir?", [
            {
                text: "Não",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Sim",
                onPress: async () => {
                    await deleteOrder(order);
                    dispatch(setReloadOrders());
                },
            },
        ]);
    };
    let enviarEmail = async (order) => {
        let pdfs = await generatePedidoPdf(order, modelos);
        sendEmail1(
            "Cliente: " + order.cliente.fantasia,
            "<h1>Pedido Cliente: " +
                order.cliente.fantasia +
                "</h1><p>Vendedor: " +
                order.vendedor.vendedor +
                "</p>",
            pdfs,
            [
                "comercial@dalny.com.br",
                order.cliente.email,
                order.vendedor.email,
            ]
        );
        order.sended = true;
        saveOrder(order);
    };
    return (
        <View
            style={{
                justifyContent: "space-between",
                flex: 9,
                flexDirection: "column",
                alignSelf: "stretch",
                width: "auto",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text
                    style={{
                        marginLeft: 10,
                        fontSize: 15,
                        fontFamily: commonStyles.fontFamily,
                        flex: 7,
                    }}
                >
                    Cliente
                </Text>
                <Text
                    style={{
                        width: 50,
                        textAlign: "center",
                        fontSize: 15,
                        fontFamily: commonStyles.fontFamily,
                    }}
                >
                    -
                </Text>
            </View>
            {pedidos.map((el, index) => {
                return (
                    <View
                        key={index}
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 15,
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 15,
                                fontFamily: commonStyles.fontFamily,
                                flex: 7,
                            }}
                        >
                            {el.cliente ? el.cliente.razao : ""}
                        </Text>
                        <TouchableOpacity
                            onPress={() => handleSelect(el)}
                            style={{ width: 40 }}
                        >
                            <Icon
                                name={
                                    el.status == "a" ? "ios-create" : "ios-eye"
                                }
                                style={{
                                    color: commonStyles.colors.iconColor,
                                    alignSelf: "center",
                                    fontSize: 24,
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleConfirmSendEmail(el)}
                            style={{ width: 40 }}
                        >
                            <Icon
                                name={
                                    el.sended == true
                                        ? "ios-checkmark"
                                        : "ios-mail"
                                }
                                style={{
                                    color: commonStyles.colors.iconColor,
                                    alignSelf: "center",
                                    fontSize: 24,
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleDelete(el)}
                            style={{ width: 40 }}
                        >
                            <Icon
                                name={"trash"}
                                style={{
                                    color: commonStyles.colors.iconColor,
                                    alignSelf: "center",
                                    fontSize: 24,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
};
