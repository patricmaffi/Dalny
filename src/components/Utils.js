import React from "react";
import Toast from "react-native-root-toast";
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Modal,
    Image,
} from "react-native";
import { Icon } from "native-base";
import * as Font from "expo-font";
import commonStyles from "../commonStyles";
import * as MailComposer from "expo-mail-composer";
import Communications from "react-native-communications";
import RNSmtpMailer from "react-native-smtp-mailer";

export const showMessage = async (text, categoria) => {
    let toast = Toast.show(text, {
        duration: 3000,
        backgroundColor: "orange",
        shadow: false,
        animation: true,
    });
};
export const ShowMessage1 = ({
    props,
    visible,
    timeout,
    touchCallback,
    message,
    iconName,
}) => {
    if (timeout && visible == true) {
        const t = setTimeout(() => {
            if (touchCallback) {
                touchCallback();
            }
        }, timeout);
    }
    let msg1 = () => {
        return (
            <TouchableWithoutFeedback
                onPressOut={() =>
                    touchCallback ? touchCallback() : () => console.log("")
                }
            >
                <View
                    style={{
                        flex: 10,
                        justifyContent: "space-between",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                    }}
                >
                    <View></View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            height: 100,
                        }}
                    >
                        <View style={{ minWidth: 10 }}></View>
                        <View
                            style={{
                                borderRadius: 15,
                                minWidth: 250,
                                backgroundColor: "white",
                                flexDirection: "row",
                                justifyContent: "space-around",
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginRight: 20,
                                }}
                            >
                                <Icon
                                    name={
                                        iconName
                                            ? iconName
                                            : "ios-checkbox-outline"
                                    }
                                    size={120}
                                    color={commonStyles.colors.iconColor}
                                    style={{
                                        alignSelf: "center",
                                        fontSize: 40,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 20,
                                        alignSelf: "center",
                                        marginLeft: 15,
                                        fontFamily: commonStyles.fontFamily,
                                    }}
                                >
                                    {message}
                                </Text>
                            </View>
                        </View>
                        <View style={{ minWidth: 10 }}></View>
                    </View>
                    <View></View>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    let msg2 = () => {
        return (
            <TouchableWithoutFeedback>
                <View
                    style={{
                        flex: 10,
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <View></View>
                    <View
                        style={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <View></View>
                        <View>
                            <Image
                                style={{
                                    width: 160,
                                    height: 160,
                                    marginTop: 5,
                                    resizeMode: "contain",
                                }}
                                source={{
                                    uri: "https://lh3.googleusercontent.com/proxy/CSvhavcJnOJOvBKAK0RI2QqmTphYBRwdsuDknpnnzINe5MMV03Z6qyTCP5X3U2qPKMvH_54Wu3gBVaJ1gAmlMHIJmPHkie-zz5BqJOZp8AlNckUy6iKI4RrK9Ts",
                                }}
                            />

                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontSize: 16,
                                    color: "white",
                                }}
                            >
                                PEDIDO REALIZADO!
                            </Text>
                        </View>
                        <View></View>
                    </View>
                    <View></View>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    let jsx = msg1();
    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            {jsx}
        </Modal>
    );
};
export const loadFonts = async () => {
    await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        // ShortStack: require("../../assets/fonts/ShortStack-Regular.ttf"),
        // MicrosoftNewTaiLue: require("../../assets/fonts/MicrosoftNewTaiLue.ttf"),
        // MicrosoftNewTaiLueBold: require("../../assets/fonts/MicrosoftNewTaiLue-Bold.ttf"),
    });
};
export const sendEmail1 = async (subject, body, pdfs, dest) => {
    console.log("sendEmail");
    console.log(pdfs);
    await MailComposer.composeAsync({
        recipients: dest,
        subject: subject,
        isHtml: true,
        body: body,
        attachments: pdfs,
    });
};
export const maskPhone = (text) => {
    text = text.replace(/\D/g, "");
    text = text.replace(/^(\d{2})(\d{5})(\d)/, "($1) $2-$3");
    if (text.length > 15) {
        text = text.substring(0, 15);
    }
    return text;
};
export const maskCNPJ = (text) => {
    text = text.replace(/\D/g, "");
    if (text.length > 11) {
        text = text.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d)/,
            "$1.$2.$3/$4-$5"
        );
        if (text.length > 18) {
            text = text.substring(0, 18);
        }
        return text;
    }
    text = text.replace(/^(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4");
    return text;
};
// export const handleEmail = (url) => {
//     var Mailer = require("NativeModules").RNMail;
//     Mailer.mail(
//         {
//             subject: "Screenshot",
//             recipients: ["example@gmail.com"],
//             ccRecipients: ["example1@gmail.com"],
//             //bccRecipients: ['supportBCC@example.com'],
//             body: "<b>Hello</b><p>Please check attached screenshot.</p>",
//             isHTML: true,
//         },
//         (error, event) => {
//             console.log("errror", error);
//         }
//     );
// };
