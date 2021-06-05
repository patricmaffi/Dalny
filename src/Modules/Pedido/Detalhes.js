import React from "react";
import { ScrollView } from "react-native";
import { Container, Text, View, Button } from "native-base";
import commonStyles from "../../commonStyles";
import Background from "../../components/Background";
import { ShowMessage1 } from "../../components/Utils";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchEstoque,
    hideMessage,
    setOrder,
    showMessage,
} from "./PedidoAction";
import FormDetalhes from "./Components/FormDetalhes";
const Detalhes = ({ navigation }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.pedido);
    const order = useSelector((state) => state.pedido.order);

    let finish = () => {
        console.log("finishfinishfinish");
        console.log(data.modelo.pedido);
        if (!validate()) {
            dispatch(showMessage("PREENCHA INFORMACOES"));
            return;
        }
        data.modelo.pedido.descricao = data.modelo.descricao;
        if (!data.modelo.pedido.id) {
            data.modelo.pedido.id = Date.now();
            data.order.modelos.push(data.modelo.pedido);
        }
        dispatch(setOrder(data.order));
        navigation.navigate("Checkout");
    };
    let validate = () => {
        if (!data.modelo.pedido.valor_total) {
            return false;
        }

        return true;
    };

    return (
        <Container style={{ paddingTop: 10 }}>
            <Background
                navigation={navigation}
                showlogo={false}
                headerOption={2}
                title={data.modelo ? data.modelo.descricao : ""}
            >
                <ScrollView style={{ flex: 15, paddingHorizontal: 40 }}>
                    <FormDetalhes></FormDetalhes>
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
                        onPressOut={() => finish()}
                    >
                        <Text style={{ textAlign: "center" }}>CONCLUIR</Text>
                    </Button>
                </ScrollView>
            </Background>
            <ShowMessage1
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
Detalhes.navigationOptions = {
    title: "Detalhes",
    headerShown: false,
};
export default Detalhes;

const CardHeader = ({ titulo }) => {
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
        </View>
    );
};
