import { AsyncStorage } from "react-native";
import { setUrlNode } from "../../controllers/httpCtrl";
import api from "../../services/api";

export function fetchData(data) {
    return { type: "FETCHED_CONFIG", data };
}
export function resetData() {
    console.log("resetData CONFIG");

    return fetchData({});
}
export async function loadConfig() {
    console.log("resetData CONFIG");
    let config = { url: "http://localhost:8080/CP" };
    await AsyncStorage.getItem("config", (err, result) => {
        if (result) {
            config = JSON.parse(result);
            api.defaults.baseURL = config.url;
            setUrlNode(config.url);
        }
    });

    return fetchData(config);
}
