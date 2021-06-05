import React, { useState } from "react";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { Container, Text, View, Item, Button } from "native-base";
import validate from "validate.js";
import PV from "../../components/Validation";
import Loading from "../../components/Loading";
import commonStyles from "../../commonStyles";
import Background from "../../components/Background";
// import bg from "../../../assets/imgs/BG.png";
import { TextInput } from "react-native-gesture-handler";
// import logo_topo from "../../../assets/imgs/logo_menu_46.png";
import { showMessage, ShowMessage1 } from "../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import { sendSession } from "../../controllers/Businessctrl";
import PickerEstab from "../../components/PickerEstab";

const Login = ({ navigation }) => {
    console.log("Login");
    const [data, setData] = useState({ user: {} });
    let auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let updateData = async () => {
        setData(Object.assign({}, data));
    };
    let jsxBody;
    console.log("xxxxxxxxxxxxxxxxxxxx login xxxxxxxxxxxxxxxxxxxxxxx");
    // console.log(data);
    let verifySession = async () => {
        console.log("verifySession");
        let user = data.user;
        user.estab = data.estab;
        console.log(user);
        let valResult = validate(user, PV);
        console.log("valResult");
        console.log(valResult);
        if (!valResult) {
            let userLogged = await sendSession(user);
            console.log(userLogged);
            if (userLogged != null) {
                if (userLogged.categoria) {
                    ShowMessage1(userLogged.mensagem);
                } else {
                    fetchUserRedux(dispatch, userLogged);
                    navigation.goBack();
                }
            }
        } else {
            ShowMessage1("preencha os campos");
        }
        // dispatch(setLoading(false))
    };

    jsxBody = <Loading></Loading>;

    if (!auth.showLoading) {
        jsxBody = (
            <View
                style={{
                    flex: 9,
                    justifyContent: "center",
                    backgroundColor: commonStyles.colors.grayBackground,
                }}
            >
                {/* <ImageBackground
                    source={bg}
                    style={{ flex: 9, justifyContent: "center" }}
                > */}
                <View
                    style={{
                        flexDirection: "row",
                        flex: 4,
                        justifyContent: "center",
                        marginTop: 15,
                    }}
                >
                    <View style={{ justifyContent: "center" }}>
                        {/* <Image source={logo_topo}></Image> */}
                    </View>
                </View>
                <View style={{ flex: 3, padding: 40 }}>
                    <View style={{ justifyContent: "space-between" }}>
                        <Item>
                            <PickerEstab
                                value={
                                    data.estab ? data.estab.estab : undefined
                                }
                                onChange={(a) => {
                                    data.estab = a;
                                    updateData();
                                }}
                            ></PickerEstab>
                        </Item>
                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            marginTop: 30,
                        }}
                    >
                        <Item>
                            <TextInput
                                style={{
                                    flex: 9,
                                    fontFamily: commonStyles.fontFamily,
                                    color: commonStyles.colors.fontColor,
                                }}
                                placeholderTextColor="black"
                                autoCapitalize="none"
                                placeholder="Usuário"
                                onChangeText={(text) => {
                                    data.user.login = text;
                                    updateData();
                                }}
                            />
                        </Item>
                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            marginTop: 30,
                        }}
                    >
                        <Item>
                            <TextInput
                                style={{ color: "black", flex: 9 }}
                                placeholderTextColor="black"
                                autoCapitalize="none"
                                placeholder="Senha"
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    data.user.password = text;
                                    updateData();
                                }}
                            />
                        </Item>
                    </View>
                    <View style={{ justifyContent: "center", marginTop: 50 }}>
                        <Button
                            style={{
                                justifyContent: "center",
                                backgroundColor: commonStyles.colors.iconColor,
                                borderRadius: 8,
                                height: 50,
                            }}
                            onPressOut={() => {
                                verifySession();
                            }}
                        >
                            <Text style={{ textAlign: "center" }}>ENTRAR</Text>
                        </Button>
                    </View>
                </View>
                <View
                    style={{
                        justifyContent: "flex-end",
                        flex: 2,
                        minHeight: 50,
                    }}
                >
                    {/* <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'center' }}
                        onPress={() => { showMessage('falta implementar') }}>
                        <Text style={{ textAlign: 'center', color: commonStyles.colors.mainText }}>Esqueceu sua senha?</Text>
                    </TouchableOpacity> */}
                </View>
                <View
                    style={{
                        justifyContent: "flex-end",
                        flex: 2,
                        minHeight: 50,
                        marginBottom: 20,
                    }}
                ></View>
                {/* </ImageBackground> */}
            </View>
        );
    }
    return (
        <Container>
            <Background
                showbackicon={true}
                navigation={navigation}
                title={"teste"}
                hideFooter={true}
                headerOption={1}
            >
                {jsxBody}
            </Background>
        </Container>
    );
};
Login.navigationOptions = {
    title: "Login",
    headerShown: false,
};

export default Login;
