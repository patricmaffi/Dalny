import React, { useState, useEffect } from "react";
import { Image, StatusBar, TouchableOpacity } from "react-native";
import { View, Text, Icon } from "native-base";
import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import commonStyles from "../commonStyles";
import logo_topo from "../../assets/imgs/logo.png";
import DefaultStyle from "../style/DefaultStyle";

const Header = ({ navigation, icons, title, option, showbackicon, city }) => {
    StatusBar.setBarStyle("dark-content", false);
    console.log("HEADER");
    console.log(option);
    let header2 = () => {
        return (
            <View style={{}}>
                <StatusBar
                    backgroundColor={commonStyles.colors.backgroundColorPrimary}
                    color="white"
                />
                <View
                    style={{
                        height: 55,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: commonStyles.colors.backgoundHeader,
                    }}
                >
                    <View
                        style={{ alignSelf: "center", flex: 1, marginLeft: 10 }}
                    >
                        {!showbackicon ? null : (
                            <Icon
                                name={"md-arrow-back"}
                                size={20}
                                color={commonStyles.colors.iconColor}
                                style={{
                                    marginLeft: 7,
                                    color: commonStyles.colors.iconColor,
                                }}
                                onPress={() => navigation.goBack()}
                            />
                        )}
                    </View>
                    <View
                        style={{
                            alignSelf: "center",
                            justifyContent: "center",
                            flex: 9,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: commonStyles.colors.mainText,
                                fontFamily: commonStyles.fontFamily,
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {title}
                        </Text>
                        {!city ? null : (
                            <View style={{ flexDirection: "row" }}>
                                <Icon
                                    name={"map-marker"}
                                    size={12}
                                    color={commonStyles.colors.iconColor}
                                    style={{
                                        color: commonStyles.colors.iconColor,
                                        marginRight: 4,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: commonStyles.colors.mainText,
                                        fontFamily: commonStyles.fontFamily,
                                    }}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {city.name}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignSelf: "center",
                            justifyContent: "flex-end",
                            flex: 2,
                        }}
                    >
                        <FlatList
                            data={icons}
                            horizontal={true}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: "flex-end",
                            }}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        style={DefaultStyle.touchIconFooter}
                                        onPress={item.onPress}
                                    >
                                        <Icon
                                            name={item.name}
                                            size={26}
                                            color="white"
                                            style={{
                                                marginRight: 15,
                                                color:
                                                    commonStyles.colors
                                                        .iconColor,
                                            }}
                                        />
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    };
    let header1 = () => {
        console.log("header1");
        return (
            <View style={{ marginBottom: 0, marginTop: 25 }}>
                <StatusBar
                    backgroundColor={commonStyles.colors.backgroundColorPrimary}
                    color="white"
                />
                <Image
                    source={logo_topo}
                    style={{ alignSelf: "center" }}
                ></Image>
            </View>
        );
    };
    if (option) {
        switch (option) {
            case 2:
                console.log("ENTROU 2");
                return header2();
                break;
            default:
                console.log("ENTROU 1");
                return header1();
        }
    }
    return header1();
};
export default Header;
