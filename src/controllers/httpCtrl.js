import api from "../services/api";

//CHAMADA HTTP GENERICA
export var urlNode;
export const setUrlNode = async (url) => {
    urlNode = url;
};
export const getUrlNode = async (url) => {
    return urlNode;
};
const catchCB = (error) => {
    console.log("XXXXXXXXXXXXXXXXXXXXX catch XXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(error.response ? error.response.data : "");
    return error.response;
};
export const callHTTP = async (path, _data, method, token) => {
    if (token) {
        api.defaults.headers.Authorization = "Bearer " + token;
    }
    try {
        let result;
        switch (method) {
            case "POST":
                result = await api.post(path, _data).catch(catchCB);
                break;
            case "PUT":
                result = await api.put(path, _data).catch(catchCB);
                break;
            default:
                result = await api.get(path).catch(catchCB);
            // code block
        }
        // console.log('XXXXXXXXXXXXXXXXXXXXX CALLHTTP XXXXXXXXXXXXXXXXXXXXXXXXXXX')
        // console.log(result)
        return result ? result.data : null;
    } catch (error) {
        console.log(
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX generic error XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        );
        console.log(error);
        return null;
    }
};
export const callHTTP1 = async (path, _data, method) => {
    console.log("callHTTP");
    console.log(urlNode + path);
    console.log(_data);
    let data = {
        method: method ? method : "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            body: JSON.stringify(_data),
        },
    };
    if (method !== "GET") {
        data.body = JSON.stringify(_data);
    }
    console.log(data);
    try {
        let result = await fetch(
            (await getUrlNode()) + path,
            data
        ).then((response) => response.text());
        console.log(
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        );
        let retorno = JSON.parse(result);
        return retorno;
    } catch (error) {
        console.log("error");
        console.log(error);
        return null;
    }
    return null;
};
