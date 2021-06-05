import React, { useState, useEffect } from "react";
import { Button, SafeAreaView, TouchableOpacity } from "react-native";
import { Container, Text, View, Input } from "native-base";
import commonStyles from "../../commonStyles";
import Background from "../../components/Background";
import { AsyncStorage } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, loadConfig } from "./ConfigAction";

const Config = ({ navigation }) => {
    const dispatch = useDispatch();
    let data = { config: "" };
    data.config = useSelector((state) => state.config);
    console.log("xxxxxxxxxxxxxx Config APP GERENCIAL xxxxxxxxxxxxxxx");
    console.log(data);
    let updateData = () => {
        dispatch(fetchData(data.config));
    };
    let _loadConfig = async (force) => {
        if (!data.config.url || force) {
            dispatch(await loadConfig());
        }
    };
    _loadConfig();
    let saveConfig = async () => {
        console.log("saveConfig");
        await AsyncStorage.setItem("config", JSON.stringify(data.config));
        loadConfig(true);
    };
    let headerIcons = [{ name: "md-save", onPress: saveConfig }];

    return (
        <Container style={{ paddingTop: 10 }}>
            <Background
                navigation={navigation}
                showlogo={true}
                headerIcons={headerIcons}
                showbackicon={true}
                headerOption={2}
            >
                <SafeAreaView style={{ flex: 9, top: 0 }}>
                    <Text
                        style={{
                            fontFamily: commonStyles.fontFamily,
                            alignSelf: "center",
                        }}
                    >
                        Config
                    </Text>
                    <Text
                        style={{
                            fontFamily: commonStyles.fontFamily,
                            alignSelf: "flex-start",
                            marginLeft: 15,
                        }}
                    >
                        Url Coliseu:
                    </Text>
                    <View
                        style={{
                            height: 50,
                            marginBottom: 20,
                            borderBottomWidth: 1,
                            borderColor: commonStyles.colors.iconSecundaryColor,
                            backgroundColor: "gray",
                            marginHorizontal: 15,
                            marginTop: 5,
                        }}
                    >
                        {!data.config ? null : (
                            <Input
                                style={{ bottom: 0 }}
                                placeholder="ex: http://192.168.0.77:8080/CP"
                                value={data.config.url}
                                placeholderTextColor="black"
                                onChangeText={(text) => {
                                    data.config.url = text;
                                    updateData();
                                }}
                            />
                        )}
                    </View>
                </SafeAreaView>
            </Background>
        </Container>
    );
};
Config.navigationOptions = {
    title: "Config",
    headerShown: false,
};
export default Config;
