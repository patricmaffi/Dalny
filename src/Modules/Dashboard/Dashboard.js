import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Button, Container, Text, View } from "native-base";
import Background from "../../components/Background";
import { useSelector, useDispatch } from "react-redux";
import { loadConfig } from "../Configuracao/ConfigAction";
import GraficoEntSai from "./GraficoEntSai";
import GraficoFaturamento from "./GraficoFaturamento";
import Loading from "../../components/Loading";
import * as Font from "expo-font";
import { sendEmail } from "../../components/Utils";
import { loadSeller, newOrder } from "../Pedido/PedidoAction";
import commonStyles from "../../commonStyles";

const Dashboard = ({ navigation }) => {
    const dispatch = useDispatch();
    const config = useSelector((state) => state.config);
    const seller = useSelector((state) => state.pedido.seller);
    const [data, setData] = useState({ fontLoaded: false });
    console.log("xxxxxxxxxxxxxx TELA INICIAL xxxxxxxxxxxxxxx");

    let updateData = () => {
        setData(Object.assign({}, data));
    };

    const loadFonts = async () => {
        console.log("loadFonts");
        if (data.fontLoaded === true) {
            return;
        }

        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        });
        data.fontLoaded = true;
        updateData();
    };
    let _loadVendedor = async () => {
        if (!seller) {
            loadSeller(dispatch);
        }
    };
    useEffect(() => {
        loadFonts();
        _loadVendedor();
    }, []);

    if (data.fontLoaded == false) {
        return <Loading></Loading>;
    }
    return (
        <Container style={{ paddingTop: 10 }}>
            <Background navigation={navigation} showlogo={true}>
                <SafeAreaView style={{ flex: 9, top: 0 }}>
                    <View style={{ flex: 9 }}></View>
                    <Button
                        style={{
                            justifyContent: "center",
                            backgroundColor: commonStyles.colors.buttonGreen,
                            borderRadius: 8,
                            borderTopEndRadius: 0,
                            borderTopStartRadius: 0,
                            height: 50,
                            marginHorizontal: 40,
                            marginTop: -5,
                            marginBottom: 55,
                        }}
                        onPressOut={() => {
                            dispatch(newOrder());
                            navigation.navigate("Modelo");
                        }}
                    >
                        <Text style={{ textAlign: "center" }}>Novo Pedido</Text>
                    </Button>
                </SafeAreaView>
            </Background>
        </Container>
    );
};
Dashboard.navigationOptions = {
    title: "Dashboard",
    headerShown: false,
};
export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF",
    },
    chart: {
        flex: 1,
    },
});
