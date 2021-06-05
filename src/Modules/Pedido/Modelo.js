import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Container, Text, View, Icon, Item, Input, Button } from "native-base";
import commonStyles from "../../commonStyles";
import Background from "../../components/Background";
import {
    getFirstItemCustoEstoque,
    saveEstoque,
} from "../../controllers/Businessctrl";
import { ShowMessage1 } from "../../components/Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchEstoque, resetEstoque, setModelo } from "./PedidoAction";
import Swiper from "react-native-swiper";
import social from "../../../assets/imgs/social.jpg";
const Modelo = ({ navigation }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.pedido);

    let updateData = () => {
        // dispatch(fetchEstoque(data));
    };
    console.log("xxxxxxxxxxxxxx MODELO xxxxxxxxxxxxxxx");
    // console.log(data);
    let selectModel = async (slide) => {
        console.log(
            "selectModelselectModelselectModelselectModelselectModelselectModel"
        );
        console.log(slide);
        dispatch(setModelo(slide));
        navigation.navigate("Detalhes");
    };
    let onChangeForm = (field, value) => {
        data[field] = value;
        updateData();
    };

    return (
        <Container style={{ paddingTop: 10 }}>
            <Background navigation={navigation} showlogo={true}>
                <SafeAreaView style={{ flex: 9, top: 0 }}>
                    <Swiper autoplay={false}>
                        {data.modelos.map((slide, index) => {
                            return (
                                <View key={index}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            backgroundColor:
                                                commonStyles.colors
                                                    .backgoundHeader,
                                            height: 45,
                                            paddingLeft: 35,
                                            paddingRight: 25,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                color: "white",
                                                fontSize: 22,
                                                flex: 9,
                                            }}
                                        >
                                            {slide.descricao}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => selectModel(slide)}
                                        >
                                            <Icon
                                                name={"md-checkmark"}
                                                size={20}
                                                color={
                                                    commonStyles.colors.mainText
                                                }
                                                style={{
                                                    color:
                                                        commonStyles.colors
                                                            .mainText,
                                                    alignSelf: "center",
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <Image
                                        source={slide.frente}
                                        style={{
                                            width:
                                                Dimensions.get("window").width -
                                                40,
                                            height:
                                                Dimensions.get("window")
                                                    .height - 500,
                                            marginTop: 5,
                                            resizeMode: "contain",
                                            alignSelf: "center",
                                        }}
                                    />
                                    <Image
                                        source={slide.verso}
                                        style={{
                                            width:
                                                Dimensions.get("window").width -
                                                40,
                                            height:
                                                Dimensions.get("window")
                                                    .height - 500,
                                            marginTop: 5,
                                            resizeMode: "contain",
                                            alignSelf: "center",
                                        }}
                                    />
                                </View>
                            );
                        })}
                    </Swiper>
                </SafeAreaView>
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
Modelo.navigationOptions = {
    title: "Modelo",
    headerShown: false,
};
export default Modelo;
