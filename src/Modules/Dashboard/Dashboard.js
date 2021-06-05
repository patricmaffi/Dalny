import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Container, Text } from "native-base";
import Background from "../../components/Background";
import { useSelector, useDispatch } from "react-redux";
import { loadConfig } from "../Configuracao/ConfigAction";
import GraficoEntSai from "./GraficoEntSai";
import GraficoFaturamento from "./GraficoFaturamento";
import Loading from "../../components/Loading";
import * as Font from "expo-font";
import { sendEmail } from "../../components/Utils";
import { loadSeller } from "../Pedido/PedidoAction";

const Dashboard = ({ navigation }) => {
    const dispatch = useDispatch();
    const config = useSelector((state) => state.config);
    const seller = useSelector((state) => state.pedido.seller);
    const auth = useSelector((state) => state.auth);
    const [data, setData] = useState({ fontLoaded: false });
    console.log("xxxxxxxxxxxxxx DASHBOARD APP GERENCIAL xxxxxxxxxxxxxxx");
    console.log(auth);
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
    // let _loadConfig = async () => {
    //     if (!config.url) {
    //         dispatch(await loadConfig());
    //     }
    // };

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
                    <ScrollView
                        style={{
                            flex: 15,
                            paddingHorizontal: 20,
                            flexDirection: "row",
                        }}
                    >
                        {/* <GraficoFaturamento></GraficoFaturamento>
                        <GraficoEntSai></GraficoEntSai> */}
                    </ScrollView>
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
