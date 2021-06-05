import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import {
    Container,
    Text,
    View,
    Item,
    Body,
    ListItem,
    Card,
    CardItem,
    Button,
    Label,
    Icon,
    Picker,
    Textarea,
} from "native-base";
import commonStyles from "../../commonStyles";
import Background from "../../components/Background";
import { ShowMessage1 } from "../../components/Utils";
import { useSelector, useDispatch } from "react-redux";
import {
    saveOrder,
    saveSeller,
    setModelo,
    setOrder,
    setReloadOrders,
    showMessage,
    hideMessage,
} from "./PedidoAction";
import { TextInput } from "react-native-gesture-handler";
const Checkout = ({ navigation }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.pedido);
    const order = useSelector((state) => state.pedido.order);

    let validateOrder = (order) => {
        let valid = true;
        if (
            !order.cliente.razao ||
            !order.cliente.fantasia ||
            !order.cliente.contato ||
            !order.cliente.email ||
            !order.cliente.fone ||
            !order.cliente["CPF/CNPJ"] ||
            !order.vendedor.email ||
            !order.vendedor.vendedor
        ) {
            dispatch(showMessage("Preencha todas as informações"));
            valid = false;
        }
        return valid;
    };
    let handleFinishOrder = async () => {
        if (!order.id) {
            let dt = Date.now();
            order.id = dt;
        }
        saveSeller(order.vendedor);
        if (validateOrder(order)) {
            saveOrder(order);
            dispatch(setReloadOrders());
            navigation.navigate("Pedidos");
        }
    };
    console.log("xxxxxxxxxxxxxx DETALHES xxxxxxxxxxxxxxx");
    return (
        <Container style={{ paddingTop: 10 }}>
            <Background
                navigation={navigation}
                showlogo={false}
                headerOption={2}
                title={"FINALIZAR PEDIDO"}
            >
                <ScrollView style={{ flex: 15, paddingHorizontal: 40 }}>
                    <CardItensPedido navigation={navigation}></CardItensPedido>
                    <CardPagamento order={order}></CardPagamento>
                    <CardCliente order={order}></CardCliente>
                    <CardVendedor order={order}></CardVendedor>
                    <Button
                        style={{
                            justifyContent: "center",
                            backgroundColor: commonStyles.colors.buttonGreen,
                            borderRadius: 8,
                            borderTopEndRadius: 0,
                            borderTopStartRadius: 0,
                            height: 50,
                            marginTop: -5,
                            marginBottom: 25,
                        }}
                        onPressOut={handleFinishOrder}
                        // disabled={order.sended}
                    >
                        <Text style={{ textAlign: "center" }}>
                            FINALIZAR PEDIDO
                        </Text>
                    </Button>
                </ScrollView>
            </Background>
            <ShowMessage1
                iconName="ios-alert"
                visible={data.showmessage}
                message={data.message}
                timeout={3000}
                touchCallback={() => {
                    dispatch(hideMessage());
                }}
            ></ShowMessage1>
        </Container>
    );
};
Checkout.navigationOptions = {
    title: "Checkout",
    headerShown: false,
};
export default Checkout;

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

const CardCliente = ({ order }) => {
    const fields = useSelector((state) => state.pedido.cliente_fields);

    if (!order.cliente) {
        order.cliente = {};
    }
    return (
        <Card style={commonStyles.card}>
            <CardHeader titulo={"Dados Cliente"}></CardHeader>
            <CardItem>
                <Body style={commonStyles.cardItemBody}>
                    <ListItem style={{ width: 300 }}>
                        <Body>
                            {fields.map((el, index) => {
                                if (
                                    el.field == "endereco" &&
                                    !order.cliente.isCPF
                                ) {
                                    return null;
                                }
                                return (
                                    <View key={index}>
                                        <Label
                                            style={commonStyles.lblInputInfos}
                                        >
                                            {el.desc}
                                        </Label>
                                        <Item regular style={{ height: 35 }}>
                                            <CustomInput
                                                modelo={order}
                                                element={order.cliente}
                                                fieldName={el.field}
                                                keyboardType={el.keyboard}
                                                mask={el.mask}
                                                onBlur={el.onBlur}
                                            ></CustomInput>
                                        </Item>
                                    </View>
                                );
                            })}
                        </Body>
                    </ListItem>
                </Body>
            </CardItem>
        </Card>
    );
};
const CardVendedor = ({ order }) => {
    const fields = useSelector((state) => state.pedido.seller_fields);
    const seller = useSelector((state) => state.pedido.seller);
    if (!order.vendedor) {
        order.vendedor = {};
        if (seller) {
            order.vendedor = seller;
        }
    }
    return (
        <Card style={commonStyles.card}>
            <CardHeader titulo={"Dados Vendedor"}></CardHeader>
            <CardItem>
                <Body style={commonStyles.cardItemBody}>
                    <ListItem style={{ width: 300 }}>
                        <Body>
                            {fields.map((el, index) => {
                                return (
                                    <View key={index}>
                                        <Label
                                            style={commonStyles.lblInputInfos}
                                        >
                                            {el.desc}
                                        </Label>
                                        <Item regular>
                                            <CustomInput
                                                modelo={order}
                                                element={order.vendedor}
                                                fieldName={el.field}
                                            ></CustomInput>
                                        </Item>
                                    </View>
                                );
                            })}
                        </Body>
                    </ListItem>
                </Body>
            </CardItem>
        </Card>
    );
};
const CardItensPedido = ({ navigation }) => {
    return (
        <Card style={commonStyles.card}>
            <CardHeader
                titulo={"Itens Pedido"}
                showIcon={true}
                navigation={navigation}
            ></CardHeader>
            <CardItem>
                <Body style={commonStyles.cardItemBody}>
                    <CardOrder navigation={navigation}></CardOrder>
                </Body>
            </CardItem>
        </Card>
    );
};
const CardPagamento = ({ order }) => {
    const dispatch = useDispatch();
    const options = useSelector((state) => state.pedido.pagamentos);
    return (
        <Card style={commonStyles.card}>
            <CardHeader titulo={"Pagamento"}></CardHeader>
            <CardItem>
                <Body style={commonStyles.cardItemBody}>
                    <CustomPicker
                        options={options}
                        modelo={order}
                        element={order}
                        fieldName={"pagamento"}
                    ></CustomPicker>
                    <ListItem style={{ width: 300 }}>
                        <Body>
                            <Label>Observação</Label>
                            <Textarea
                                rowSpan={3}
                                defaultValue={order["obs_pgto"]}
                                bordered
                                placeholder=""
                                onChangeText={(text) => {
                                    order["obs_pgto"] = text;
                                    dispatch(setOrder(order));
                                }}
                            />
                        </Body>
                    </ListItem>
                </Body>
            </CardItem>
        </Card>
    );
};

const CardOrder = ({ navigation }) => {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.pedido.order);
    const modelos = useSelector((state) => state.pedido.modelos);
    let handleVisualizarModelo = (pedido) => {
        let modelo = modelos.filter((m) => {
            return m.codigo == pedido.codigo;
        });
        // let editableModel = JSON.stringify(modelo[0]);
        // editableModel = JSON.parse(editableModel);
        // editableModel["pedido"] = pedido;
        dispatch(setModelo(modelo[0], pedido));
        navigation.navigate("Detalhes");
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
                    Modelo
                </Text>
                <Text
                    style={{
                        width: 50,
                        textAlign: "center",
                        marginLeft: 10,
                        fontSize: 15,
                        fontFamily: commonStyles.fontFamily,
                    }}
                >
                    Qtd.
                </Text>
                <Text
                    style={{
                        width: 50,
                        textAlign: "center",
                        fontSize: 15,
                        fontFamily: commonStyles.fontFamily,
                    }}
                >
                    Editar
                </Text>
            </View>
            {order.modelos.map((el, index) => {
                let modelo = modelos.filter((m) => {
                    return m.codigo == el.codigo;
                });
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
                            {modelo[0].descricao}
                        </Text>
                        <Text
                            style={{
                                width: 50,
                                textAlign: "center",
                                marginLeft: 10,
                                fontSize: 15,
                                fontFamily: commonStyles.fontFamily,
                            }}
                        >
                            {el.qtd_total}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                handleVisualizarModelo(el);
                            }}
                            style={{ width: 50 }}
                        >
                            <Icon
                                name={"ios-create"}
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

const CustomInput = ({
    modelo,
    element,
    fieldName,
    keyboardType,
    mask,
    onBlur,
}) => {
    const dispatch = useDispatch();
    console.log(fieldName);
    console.log(mask);
    return (
        <TextInput
            style={{ color: "black", flex: 9 }}
            placeholderTextColor="black"
            autoCapitalize="none"
            placeholder=""
            onBlur={() => {
                if (onBlur) {
                    onBlur(element[fieldName], element);
                    dispatch(setOrder(modelo));
                }
            }}
            onChangeText={(text) => {
                if (mask) {
                    text = mask(text);
                }
                element[fieldName] = text;
                dispatch(setOrder(modelo));
            }}
            keyboardType={keyboardType || "default"}
            value={element[fieldName]}
        />
    );
};
const CustomPicker = ({ modelo, element, fieldName, options }) => {
    const dispatch = useDispatch();
    let handlerChange = (val) => {
        element[fieldName] = val;
        dispatch(setOrder(modelo));
    };
    return (
        <Item picker>
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={element[fieldName]}
                onValueChange={handlerChange}
            >
                {options.map((el, index) => {
                    return <Picker.Item label={el} value={el} key={index} />;
                })}
            </Picker>
        </Item>
    );
};
