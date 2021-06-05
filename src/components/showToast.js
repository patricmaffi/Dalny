import React from "react";
import { Text, Toast } from "native-base";
import { View } from "react-native";

export function showToast(message) {
    return Toast.show({
        text: message,
        buttonText: "Okay",
        duration: 5000,
        type: "danger",
    });
}
