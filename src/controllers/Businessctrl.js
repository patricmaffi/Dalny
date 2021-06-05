import { callHTTP, callHTTP1 } from "./httpCtrl";
export const getItensCustoEstoque = async (filtro) => {
    try {
        const response = await callHTTP(
            "/appgerencial/buscaritensultimacompra/" + filtro,
            {},
            "GET"
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const getFirstItemCustoEstoque = async (filtro) => {
    let itens = await getItensCustoEstoque(filtro);
    if (itens) {
        let el = itens[0];
        let item = {
            codbarra: el[0],
            estoque: el[3],
            subdescricao: el[1],
        };
        return item;
    }
};
export const getComandas = async () => {
    try {
        const response = await callHTTP(
            "/comanda/buscarComandasNative/false",
            { buscarFechadas: true },
            "GET"
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const getQuantidadesAertas = async () => {
    try {
        const response = await callHTTP(
            "/comanda/buscarQuantidadeComandasAbertas",
            {},
            "GET"
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const getFaturamento30dias = async () => {
    try {
        const response = await callHTTP(
            "/dashboard/faturamento30dias.json",
            {},
            "GET"
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const getMovimento12Meses = async () => {
    try {
        const response = await callHTTP(
            "/dashboard/faturamento12meses.json",
            {},
            "GET"
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const getEstabs = async () => {
    try {
        const response = await callHTTP("/comunicacao/getFilial", {}, "POST");
        return JSON.parse(response.string);
    } catch (error) {
        console.log(error);
    }
};
export const changeItemStatus = async (item, obs, status) => {
    try {
        const response = await callHTTP(
            "/comanda/alterarInfosComanda/" +
                item.idcomanda +
                "/" +
                obs +
                "/" +
                status,
            {},
            "GET"
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const saveEstoque = async (codbarra, estoque, adicao) => {
    try {
        let data = {
            codbarra: codbarra,
            estoque: estoque,
            somarsubstituir: adicao == true ? "SM" : "SB",
        };
        console.log(data);
        const response = await callHTTP(
            "/auditoriaitem/salvarappgerencial",
            data,
            "POST"
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const sendSession = async (user) => {
    try {
        let data = {
            estab: user.estab.estab,
            login: user.login,
            senha: user.password,
        };

        console.log(data);

        const response = await callHTTP("/acessar1", data, "POST");
        return response;
    } catch (error) {
        console.log(error);
    }
};
