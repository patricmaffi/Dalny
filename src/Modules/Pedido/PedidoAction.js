import html from "../../../assets/danfe.html";
import modeloPedido from "../Pedido/danfe.json";
import * as Print from "expo-print";
import * as SecureStore from "expo-secure-store";
import { AsyncStorage } from "react-native";
// import * as Sharing from "expo-sharing";
// import * as FileSystem from "expo-file-system";

export function showMessage(message) {
    return { type: "SHOW_MESSAGE", message };
}
export function hideMessage() {
    return { type: "HIDE_MESSAGE", undefined };
}
export function fetchPedido(data) {
    return { type: "FETCHED_PEDIDO", data };
}
export function setModelo(_modelo, pedido) {
    let modelo = Object.assign({}, _modelo);
    modelo.pedido = { codigo: modelo.codigo };
    if (pedido) {
        modelo.pedido = pedido;
    }
    return { type: "SET_MODELO", modelo };
}
export function newOrder() {
    return setOrder({ modelos: [] });
}
export function setOrder(_order) {
    let order = Object.assign({}, _order);
    return { type: "SET_ORDER", order };
}
export function setSeller(seller) {
    return { type: "SET_SELLER", seller };
}
export async function loadSeller(dispatch) {
    console.log("loadSeller");
    let vendedor = {};
    await AsyncStorage.getItem("vendedor", (err, result) => {
        console.log("loadSeller RES");
        console.log(result);
        if (result) {
            vendedor = JSON.parse(result);
            dispatch(setSeller(vendedor));
        }
    });
}
export async function saveSeller(seller) {
    console.log("saveSeller");
    console.log(seller);
    await AsyncStorage.setItem("vendedor", JSON.stringify(seller));
}
export function setReloadOrders(loadOrders) {
    return { type: "LOAD_ORDERS", loadOrders };
}
export function fetchOrders(orders) {
    return { type: "FETCH_ORDERS", orders };
}
export async function clearOrders(_order) {
    Alert.alert(
        "Atenção",
        "Tem certeza que deseja limpar os pedidos \nTodos os pedidos serão excluídos",
        [
            {
                text: "Não",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Sim",
                onPress: async () => {
                    let ids = await getOrdersID();
                    for (let i = 0; i < ids.length; i++) {
                        let id = ids[i];
                        await SecureStore.deleteItemAsync(id + "");
                    }
                    await SecureStore.deleteItemAsync("ordersID");
                },
            },
        ]
    );
}
export async function saveOrder(_order) {
    saveOrderID(_order.id);
    console.log("saveOrdersaveOrdersaveOrder");
    if (!_order.cod_pedido) {
        console.log(_order.cod_pedido);
        let cod_ped = await SecureStore.getItemAsync("cod_ped");
        console.log(cod_ped);
        _order.cod_pedido = cod_ped ? parseInt(cod_ped) + 1 : 1;
        console.log(_order.cod_pedido);
        await SecureStore.setItemAsync("cod_ped", _order.cod_pedido + "");
    }
    console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
    let strOrder = JSON.stringify(_order);
    await SecureStore.setItemAsync(_order.id + "", strOrder);
}

export const getOrders = async () => {
    let ids = await getOrdersID();
    let orders = [];
    try {
        for (let i = 0; i < ids.length; i++) {
            let id = ids[i];
            let strOrder = await SecureStore.getItemAsync(id + "");
            if (strOrder) {
                orders.push(JSON.parse(strOrder));
            }
        }
    } catch (error) {}
    return orders;
};
export async function saveOrderID(id) {
    let ids = await getOrdersID();
    let exists = ids.some((el) => {
        return el == id;
    });
    if (exists) {
        return;
    }
    ids.push(id);
    let strIDS = JSON.stringify(ids);
    await SecureStore.setItemAsync("ordersID", strIDS);
}
export const getOrdersID = async () => {
    let orders;
    try {
        let strOrders = await SecureStore.getItemAsync("ordersID");
        if (strOrders) {
            orders = JSON.parse(strOrders);
        }
    } catch (error) {
        console.log(error);
    }
    if (!orders) {
        orders = [];
    }
    return orders;
};
export async function generatePedidoPdf(pedido, modelos) {
    console.log(pedido);
    let pdfs = [];
    let data = new Date(pedido.id);
    let dataFormatada =
        data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
    console.log(dataFormatada);
    for (let i = 0; i < pedido.modelos.length; i++) {
        let modelo = pedido.modelos[i];
        let map = {
            DATA_PED: dataFormatada,
            RAZAOEMPRESA: pedido.cliente.razao,
            FANTASIAEMPRESA: pedido.cliente.fantasia,
            EMAILEMPRESA: pedido.cliente.email,
            FONEEMPRESA: pedido.cliente.fone,
            CNPJ: pedido.cliente["CPF/CNPJ"],
            CONTATO: pedido.cliente.contato,
            CLI_ENDERECO: pedido.cliente.endereco || "",

            MODELO: modelo["descricao"],
            MODELOS: genDetalhesHtml(modelo, "modelo", modelos, true),

            BORDADO: genBordadoHtml(modelo, "bordado", modelos),

            TECIDOBASE: modelo["tecido_base"],
            TECIDODETALHE: modelo["tecido_detalhe"],
            CORBASE: modelo["cor_tecido_base"],
            CORDETALHE: modelo["cor_tecido_detalhe"],

            QTDETOTAL: modelo["qtd_total"],
            VALORTOTAL: "R$ " + parseFloat(modelo["valor_total"]).toFixed(2),
            VALORUNITARIO:
                "R$ " + parseFloat(modelo["valor_unitario"]).toFixed(2),
            PAGAMENTO: pedido["pagamento"],

            ROWSOBS: genObsHtml(modelo.observacoes),
            TAMANHOSFIELDS: getTamanhosFieldsHTMl(modelo, modelos),
            TAMANHOS: genTamanhosHtml(modelo, modelo.tipo_tamanho, modelos),

            DETALHES: genDetalhesHtml(modelo, "detalhes", modelos, true),
        };

        let newHtml = replaceAll(map, modeloPedido.teste);

        // console.log(newHtml);
        const response = await Print.printToFileAsync({
            html: newHtml,
        });
        pdfs.push(response.uri);
    }

    // this changes the bit after the last slash of the uri (the document's name) to "invoice_<date of transaction"
    console.log(pdfs);
    return pdfs;
}
const replaceAll = (map, html) => {
    for (var key in map) {
        var value = map[key];
        html = replaceBykey(html, key, value);
    }
    return html;
};
const replaceBykey = (html, field, valor) => {
    valor = valor ? valor : "";
    valor = valor === true ? "SIM" : valor === false ? "NÃO" : valor;
    let res = html.replace("[#" + field + "#]", valor);
    return res;
};
const genModelosHtml = (modelo, field, modelos) => {
    //<td style="font-family:Calibri;font-size:14; white-space: nowrap;font-weight:bold; width: 30%" align="center">TRADICIONAL: [#TRADICIONAL#]</td>
};
const genObsHtml = (observacoes) => {
    let html = "<tr>";
    html +=
        '<td style="font-family:Calibri;font-size:14; white-space: nowrap;font-weight:bold; width: 30%" align="center">[#NOME#]</td>';
    html +=
        '<td style="font-family:Calibri;font-size:14; white-space: nowrap;font-weight:bold; width: 25%" align="center">[#TAMANHO#]</td>';
    html +=
        '<td style="font-family:Calibri;font-size:14; white-space: nowrap;font-weight:bold; width: 25%" align="center">[#QUANTIDADE#]</td>';
    html +=
        '<td style="font-family:Calibri;font-size:14; white-space: nowrap;font-weight:bold; width: 25%" align="center">[#OBS#]</td>';
    html += "</tr>";
    let htmlObs = "";
    for (let i = 0; i < observacoes.length; i++) {
        let obs = observacoes[i];
        let map = {
            NOME: obs["nome"],
            OBS: obs["obs"],
            QUANTIDADE: obs["quantidade"],
            TAMANHO: obs["tamanho"],
        };
        htmlObs += replaceAll(map, html);
    }
    return htmlObs;
};

const genTamanhosHtml = (modelo, field, modelos) => {
    let modOriginal = getModeloOriginal(modelo, modelos);
    let arrdata = modelo.tamanhos;

    let html = "";

    let fields = modOriginal.tamanhosField;
    let htmlRet = "";
    for (let i = 0; i < arrdata.length; i++) {
        let data = arrdata[i];
        html += '<tr style="width:100%;">';
        html +=
            '<td style="font-family:Calibri;font-size:14; white-space: nowrap;font-weight:bold; width: 30%;border-bottom: 1px solid black;" align="center">' +
            data[field] +
            "</td>";
        for (let i = 0; i < fields.length; i++) {
            let value = data[fields[i].field] ? data[fields[i].field] : "";
            html +=
                '<td style="font-family:Calibri;font-size:14; white-space: nowrap;font-weight:bold; width: 25%;border-bottom: 1px solid black;" align="center">' +
                value +
                "</td>";
        }
        html += '</tr">';
        // htmlRet += replaceAll(map, html);
    }
    return html;
};

const getTamanhosFieldsHTMl = (modelo, modelos) => {
    let modOriginal = getModeloOriginal(modelo, modelos);
    let html = "";
    let fields = modOriginal.tamanhosField;
    for (let i = 0; i < fields.length; i++) {
        html +=
            '<td style="font-family:Calibri;font-size:14; white-space: nowrap;font-weight:bold; width: 25%" align="center">' +
            fields[i].desc +
            "</td>";
    }
    return html;
};
const genBordadoHtml = (modelo, sector, modelos) => {
    let modOriginal = getModeloOriginal(modelo, modelos);
    console.log("genBordadoHtml");
    let html = "";
    for (let i = 0; i < modOriginal[sector].length; i++) {
        let info = modOriginal[sector][i];
        let field = info.field;
        let value = modelo[sector][field];
        let value_s = modelo[sector][field + "_s"];
        if (value || value_s) {
            let newValue = value ? "Bord" : "";
            newValue += value && value_s ? "/Ser" : value_s ? "Ser" : "";
            html += genDetalheHtml(info.desc, newValue);
        }
    }
    if (modelo[sector]["obs"]) {
        html +=
            '<td style="font-family:Calibri;font-size:14; white-space: nowrap;font-weight:bold; width: 25%" align="center">Obs: ' +
            modelo[sector]["obs"] +
            "</td>";
    }
    return html;
};
const genDetalhesHtml = (modelo, sector, modelos, hideValue) => {
    let modOriginal = getModeloOriginal(modelo, modelos);
    // console.log(modelo);
    let html = "";
    for (let i = 0; i < modOriginal[sector].length; i++) {
        let info = modOriginal[sector][i];
        let field = info.field;
        let value = modelo[sector][field];
        if (value) {
            html += genDetalheHtml(info.desc, value, hideValue);
        }
    }
    if (modelo[sector]["obs"]) {
        html +=
            '<td style="font-family:Calibri;font-size:14; white-space: nowrap;font-weight:bold; width: 25%" align="center">Obs: ' +
            modelo[sector]["obs"] +
            "</td>";
    }
    return html;
};
const genDetalheHtml = (field, value, hideValue) => {
    if (!hideValue) {
        field = field + " : " + value;
    }
    let html = '<tr style="width:100%">';
    html += '<tr style="width:100%;">';
    html +=
        '<td style="font-family:Calibri;font-size:14; white-space: nowrap;font-weight:bold; width: 40%" align="center">' +
        field +
        "</td>";
    html += "</tr>";
    // console.log(html);
    return html;
};
const getModeloOriginal = (modelo, modelos) => {
    let codModelo = modelo.codigo;
    let modOriginal = modelos.filter((el) => {
        return el.codigo == codModelo;
    });
    modOriginal = modOriginal[0];
    return modOriginal;
};
