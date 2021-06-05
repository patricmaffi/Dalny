import socialFrente from "../../../assets/imgs/social.jpg";
import socialCurta from "../../../assets/imgs/socialcurta.jpg";
import socialF from "../../../assets/imgs/socialfeminino.jpg";
import socialCurtaF from "../../../assets/imgs/socialfemininocurta.jpg";
import polo from "../../../assets/imgs/polo.jpg";
import polov from "../../../assets/imgs/polo1.jpg";
import pv from "../../../assets/imgs/pv.jpg";
import pv1 from "../../../assets/imgs/pv1.jpg";
import jaleco from "../../../assets/imgs/jaleco.jpg";
import jaleco1 from "../../../assets/imgs/jalecov.jpg";
import calcabrim from "../../../assets/imgs/calcabrim.jpg";
import calcabrim1 from "../../../assets/imgs/calcabrim1.jpg";
import moleton from "../../../assets/imgs/moleton.jpg";
import jaqueta from "../../../assets/imgs/jaqueta.jpg";
import { maskCNPJ, maskPhone } from "../../components/Utils";

const INITIAL_STATE_PEDIDO = {
    adicao: true,
    cliente_fields: [
        { field: "razao", desc: "Razão Social" },
        { field: "fantasia", desc: "Fantasia" },
        {
            field: "CPF/CNPJ",
            desc: "CNPJ/CPF",
            mask: maskCNPJ,
            onBlur: (text, cliente) => {
                if (text && text.length == 14) {
                    cliente["isCPF"] = true;
                    return true;
                }
                cliente["isCPF"] = false;
                return false;
            },
            keyboard: "numeric",
        },
        { field: "contato", desc: "Contato" },
        { field: "email", desc: "E-mail" },
        {
            field: "fone",
            desc: "Fone",
            mask: maskPhone,
            keyboard: "numeric",
        },

        { field: "endereco", desc: "Endereço", hide: true },
    ],
    pagamentos: ["Cartão", "Pix", "Á Vista", "30 Dias", "30/60", "30/60/90"],
    estoque: "0",
    showmessage: false,
    message: "Salvo com sucesso",
    modelo: undefined, //modelo atual que esta sendo editado
    order: {
        modelos: [],
    },
    orders: [],
    loadOrders: true,
    seller_fields: [
        { field: "vendedor", desc: "Vendedor" },
        { field: "email", desc: "E-mail" },
    ],

    //estruturas de configuração dos formularios
    modelos: [
        {
            codigo: 1,
            descricao: "Social Masculina",
            frente: socialFrente,
            verso: socialCurta,
            modelo: [
                { field: "tradicional", desc: "Tradicional" },
                { field: "slim", desc: "Slim" },
                { field: "fitslim", desc: "Fit Slim" },
            ],
            tecido: [
                { field: "tecido_base", desc: "Tecido Base" },
                { field: "cor_tecido_base", desc: "Cor" },
                { field: "tecido_detalhe", desc: "Tecido Detalhes" },
                { field: "cor_tecido_detalhe", desc: "Cor" },
            ],
            bordado: [
                // { field: "bordado", desc: "Bordado" },
                { field: "bolso_esq", desc: "Bolso Esq." },
                { field: "frente_esq", desc: "Frente Esq." },
                { field: "frente_drt", desc: "Frente Drt." },
                { field: "pala", desc: "Pala" },
                { field: "manga_esq", desc: "Manga Esq." },
                { field: "manga_drt", desc: "Manga Drt." },
            ],
            tamanhosField: [
                { field: "manga_curta", desc: "MC" },
                { field: "manga_longa", desc: "ML" },
            ],
            tamanhos: [
                { size: 1 },
                { size: 2 },
                { size: 3 },
                { size: 4 },
                { size: 5 },
                { size: 6 },
                { size: 7 },
                { size: 8 },
                { size: 9 },
            ],
            detalhes: [
                { field: "pe_gola_interno", desc: "Pé de gola interno" },
                { field: "pe_gola_externo", desc: "Pé de gola externo" },
                { field: "bolso_peito", desc: "Bolso Peito" },
                { field: "vivo_vista_interna", desc: "Vivo vista interna" },
                { field: "vivo_vista_externa", desc: "Vivo vista externa" },
                { field: "cor_botoes", desc: "Cor dos Botões" },
                { field: "vista_externa", desc: "Vista externa" },
                { field: "vivo_manga", desc: "Vivo Manga" },
                { field: "punho_interno", desc: "Punho Interno" },
                { field: "punho_externo", desc: "Punho Externo" },
                { field: "vista_interna", desc: "Vista Interna" },
            ],
            showSizeOptions: false,
        },
        {
            codigo: 2,
            descricao: "Social Feminina",
            frente: socialF,
            verso: socialCurtaF,
            modelo: [
                { field: "decote_fechado", desc: "Decote Fechado" },
                { field: "decote_v", desc: "Decote V" },
            ],
            tecido: [
                { field: "tecido_base", desc: "Tecido Base" },
                { field: "cor_tecido_base", desc: "Cor" },
                { field: "tecido_detalhe", desc: "Tecido Detalhes" },
                { field: "cor_tecido_detalhe", desc: "Cor" },
            ],
            bordado: [
                { field: "bolso_esq", desc: "Bolso Esq." },
                { field: "frente_esq", desc: "Frente Esq." },
                { field: "frente_drt", desc: "Frente Drt." },
                { field: "pala", desc: "Pala" },
                { field: "manga_esq", desc: "Manga Esq." },
                { field: "manga_drt", desc: "Manga Drt." },
            ],
            tamanhosField: [
                { field: "manga_curta", desc: "MC" },
                { field: "manga_longa", desc: "ML" },
            ],
            tamanhos: [
                { size: 36, tam: "PP" },
                { size: 38, tam: "P" },
                { size: 40, tam: "M" },
                { size: 42, tam: "G" },
                { size: 44, tam: "XG" },
                { size: 48, tam: "XGG" },
                { size: 50, tam: "EG" },
                { size: 52, tam: "EGG" },
            ],
            detalhes: [
                { field: "gola_externa", desc: "Gola Externa" },
                { field: "pe_gola_interno", desc: "Pé de gola interno" },
                { field: "pe_gola_externo", desc: "Pé de gola externo" },
                { field: "vivo_vista_interna", desc: "Vivo vista interna" },
                { field: "vivo_vista_externa", desc: "Vivo vista externa" },
                { field: "cor_botoes", desc: "Cor dos Botões" },
                { field: "tres_botoes", desc: "Três Botões Busto" },
                { field: "vista_interna", desc: "Vista Interna" },
                { field: "vista_externa", desc: "Vista externa" },
                { field: "vivo_manga", desc: "Vivo na Manga" },
                { field: "punho_interno", desc: "Punho Interno" },
                { field: "punho_externo", desc: "Punho Externo" },
            ],
            showSizeOptions: true,
        },
        {
            codigo: 3,
            descricao: "POLO Masculina/Feminina",
            frente: polo,
            verso: polov,
            modelo: [
                { field: "decote_v", desc: "Decote V" },
                { field: "decote_v_botoes", desc: "Decote V C/Botoes" },
            ],
            tecido: [
                { field: "tecido_base", desc: "Tecido Base" },
                { field: "cor_tecido_base", desc: "Cor" },
                { field: "tecido_detalhe", desc: "Tecido Detalhes" },
                { field: "cor_tecido_detalhe", desc: "Cor" },
            ],
            isSerigrafia: true,
            bordado: [
                { field: "bolso_esq", desc: "Bolso Esq." },
                { field: "frente_esq", desc: "Frente Esq." },
                { field: "frente_drt", desc: "Frente Drt." },
                { field: "pala", desc: "Pala" },
                { field: "manga_esq", desc: "Manga Esq." },
                { field: "manga_drt", desc: "Manga Drt." },
            ],
            tamanhosField: [
                { field: "masculino", desc: "Masc." },
                { field: "feminino", desc: "Fem." },
            ],
            tamanhos: [
                { size: "PP" },
                { size: "P" },
                { size: "M" },
                { size: "G" },
                { size: "XG" },
                { size: "XGG" },
                { size: "EG" },
                { size: "EGG" },
            ],
            tamanhosExtra: {
                titulo: "Tamanhos Extra",
                fields: [{ field: "infantil", desc: "infantil" }],
                tamanhos: [
                    { size: "1" },
                    { size: "2" },
                    { size: "3" },
                    { size: "4" },
                    { size: "5" },
                    { size: "6" },
                    { size: "7" },
                    { size: "8" },
                    { size: "9" },
                ],
            },
            detalhes: [
                { field: "vies_gola", desc: "Viés na gola" },
                { field: "gola_externa", desc: "Gola externa" },
                { field: "peitilho_interno", desc: "Peitilho Interno" },
                { field: "peitilho_externo", desc: "Peitilho Externo" },
                { field: "cor_botoes", desc: "Cor dos Botões" },
                { field: "vivo_manga", desc: "Vivo na Manga" },
                {
                    field: "barra_manga_sobreposta",
                    desc: "Barra Manga Sobreposta",
                },
                { field: "barra_aplicada", desc: "Barra Aplicada" },
                { field: "bolso_peito", desc: "Bolso Peito" },
                { field: "retilinea_manga", desc: "Retilinea na Manga" },
                { field: "cor_detalhe", desc: "Na cor do detalhe" },
            ],
        },
        {
            codigo: 4,
            descricao: "PV Masculina/Feminina",
            frente: pv,
            verso: pv1,
            modelo: [
                { field: "manga_curta", desc: "Manga Curta" },
                { field: "manga_longa", desc: "Manga Longa" },
                { field: "com_barra_normal", desc: "C/barra normal" },
                { field: "com_punho", desc: "C/punho" },
            ],
            tecido: [
                { field: "tecido_base", desc: "Tecido Base" },
                { field: "cor_tecido_base", desc: "Cor" },
                { field: "tecido_detalhe", desc: "Tecido Detalhes" },
                { field: "cor_tecido_detalhe", desc: "Cor" },
            ],
            isSerigrafia: true,
            bordado: [
                { field: "bolso_esq", desc: "Bolso Esq." },
                { field: "frente_esq", desc: "Frente Esq." },
                { field: "frente_drt", desc: "Frente Drt." },
                { field: "pala", desc: "Pala" },
                { field: "manga_esq", desc: "Manga Esq." },
                { field: "manga_drt", desc: "Manga Drt." },
            ],
            tamanhosField: [
                { field: "masculino", desc: "Masc." },
                { field: "feminino", desc: "Fem." },
                { field: "blook", desc: "B.Look" },
            ],
            tamanhos: [
                { size: "PP" },
                { size: "P" },
                { size: "M" },
                { size: "G" },
                { size: "XG" },
                { size: "XGG" },
                { size: "EG" },
                { size: "EGG" },
            ],
            tamanhosExtra: {
                titulo: "Tamanhos Extra",
                fields: [{ field: "infantil", desc: "infantil" }],
                tamanhos: [
                    { size: "PP" },
                    { size: "P" },
                    { size: "M" },
                    { size: "G" },
                    { size: "XG" },
                    { size: "XGG" },
                    { size: "EG" },
                    { size: "EGG" },
                ],
            },
            detalhes: [
                { field: "gola_redonda", desc: "Gola Redonda" },
                { field: "gola_cor_detalhe", desc: "Gola na Cor Detalhe" },
                { field: "vivo_manga", desc: "Vivo na Manga" },
                {
                    field: "barra_manga_sobreposta",
                    desc: "Barra Manga Sobreposta",
                },
                { field: "gola_v", desc: "Gola V" },
                {
                    field: "faixa_reflexiva_manga",
                    desc: "Faixa Reflexiva Mangas",
                },
                { field: "faixa_reflexiva", desc: "Faixa Reflexiva" },
                { field: "barra_aplicada", desc: "Barra Aplicada" },
            ],
        },
        {
            codigo: 5,
            descricao: "Jaleco",
            frente: jaleco,
            verso: jaleco1,
            modelo: [
                { field: "manga_curta", desc: "Manga Curta" },
                { field: "manga_longa", desc: "Manga Longa" },
                { field: "jaleco_curto_polo", desc: "Jaleco Curto Polo" },
                { field: "jaleco_longo", desc: "Jaleco Longo" },
            ],
            tecido: [
                { field: "tecido_base", desc: "Tecido Base" },
                { field: "cor_tecido_base", desc: "Cor" },
                { field: "tecido_detalhe", desc: "Tecido Detalhes" },
                { field: "cor_tecido_detalhe", desc: "Cor" },
            ],
            isSerigrafia: true,
            bordado: [
                { field: "bolso_esq", desc: "Bolso Esq." },
                { field: "frente_esq", desc: "Frente Esq." },
                { field: "frente_drt", desc: "Frente Drt." },
                { field: "pala", desc: "Pala" },
                { field: "manga_esq", desc: "Manga Esq." },
                { field: "manga_drt", desc: "Manga Drt." },
            ],
            tamanhosField: [
                { field: "masculino", desc: "Masc." },
                { field: "feminino", desc: "Fem." },
                { field: "blook", desc: "B.Look" },
            ],
            tamanhos: [
                { size: "PP" },
                { size: "P" },
                { size: "M" },
                { size: "G" },
                { size: "XG" },
                { size: "XGG" },
                { size: "EG" },
                { size: "EGG" },
            ],
            detalhes: [
                { field: "vies_gola", desc: "Viés na gola" },
                { field: "gola_externa", desc: "Gola externa" },
                { field: "peitilho_interno", desc: "Peitilho Interno" },
                { field: "peitilho_externo", desc: "Peitilho Externo" },
                { field: "vivo_manga", desc: "Vivo na Manga" },
                { field: "botao_escondido", desc: "Botao Escondido" },
                { field: "barra_bolso_detalhe", desc: "barra_bolso_detalhe" },
                { field: "vista_interna", desc: "Vista Interna" },
                {
                    field: "barra_manga_sobreposta",
                    desc: "Barra Manga Sobreposta",
                },
                {
                    field: "faixa_reflexiva_manga",
                    desc: "Faixa Reflexiva Mangas",
                },
                { field: "barra_aplicada", desc: "Barra Manga Aplicada" },
                { field: "bolso_peito", desc: "Bolso Peito" },
                {
                    field: "faixa_refletiva_cintura",
                    desc: "Faixa Refletiva Cintura",
                },
                {
                    field: "faixa_refletiva_manga",
                    desc: "Faixa Refletiva Manga",
                },
            ],
        },
        {
            codigo: 6,
            descricao: "Calça de Brim",
            frente: calcabrim,
            verso: calcabrim1,
            modelo: [
                { field: "calca", desc: "Calça" },
                { field: "calcao", desc: "Calção" },
                { field: "com_elastico", desc: "Com Elástico" },
                { field: "com_passador_cinto", desc: "Com Passador Cinto" },
                { field: "com_botao_ziper", desc: "Com Botão e Zíper" },
            ],
            tecido: [
                { field: "tecido_base", desc: "Tecido Base" },
                { field: "cor_tecido_base", desc: "Cor" },
                { field: "tecido_detalhe", desc: "Tecido Detalhes" },
                { field: "cor_tecido_detalhe", desc: "Cor" },
            ],
            isSerigrafia: true,
            bordado: [
                { field: "bolso_esq", desc: "Bolso Esq." },
                { field: "frente_esq", desc: "Frente Esq." },
                { field: "frente_drt", desc: "Frente Drt." },
                { field: "pala", desc: "Pala" },
                { field: "manga_esq", desc: "Manga Esq." },
                { field: "manga_drt", desc: "Manga Drt." },
            ],
            tamanhosField: [
                { field: "calca", desc: "Calça" },
                { field: "calcao", desc: "Calção" },
            ],
            showSizeOptions: true,
            tamanhos: [
                { size: 36, tam: "PP" },
                { size: 38, tam: "P" },
                { size: 40, tam: "M" },
                { size: 42, tam: "G" },
                { size: 44, tam: "XG" },
                { size: 48, tam: "XGG" },
                { size: 50, tam: "EG" },
                { size: 52, tam: "EGG" },
            ],
            detalhes: [
                { field: "bolso_adicional", desc: "Bolso Adicional" },
                {
                    field: "reforco_interno_joelho",
                    desc: "Reforço Interno Joelho",
                },
                { field: "reforco_pernas", desc: "Reforço entre pernas" },
                { field: "bolso_estendido", desc: "Bolso Estendido" },
                { field: "faixa_refletiva", desc: "Faixa Refletiva" },
            ],
        },
        {
            codigo: 7,
            descricao: "Moleton",
            frente: moleton,
            modelo: [
                { field: "jaqueta_moleton", desc: "Jaqueta Moleton" },
                { field: "blusa_moleton", desc: "Blusa Moleton" },
            ],
            tecido: [
                { field: "tecido_base", desc: "Tecido Base" },
                { field: "cor_tecido_base", desc: "Cor" },
            ],
            isSerigrafia: true,
            bordado: [
                { field: "bolso_esq", desc: "Bolso Esq." },
                { field: "frente_esq", desc: "Frente Esq." },
                { field: "frente_drt", desc: "Frente Drt." },
                { field: "pala", desc: "Pala" },
                { field: "manga_esq", desc: "Manga Esq." },
                { field: "manga_drt", desc: "Manga Drt." },
            ],
            tamanhosField: [
                { field: "masculino", desc: "Masc." },
                { field: "feminino", desc: "Fem." },
            ],
            tamanhos: [
                { size: "PP" },
                { size: "P" },
                { size: "M" },
                { size: "G" },
                { size: "XG" },
                { size: "XGG" },
                { size: "EG" },
                { size: "EGG" },
            ],
            detalhes: [
                { field: "vies_gola", desc: "Viés na gola" },
                { field: "gola_externa", desc: "Gola externa" },
                { field: "peitilho_interno", desc: "Peitilho Interno" },
                { field: "peitilho_externo", desc: "Peitilho Externo" },
                { field: "cor_botoes", desc: "Cor dos Botões" },
                { field: "vivo_manga", desc: "Vivo na Manga" },
                {
                    field: "barra_manga_sobreposta",
                    desc: "Barra Manga Sobreposta",
                },
                { field: "barra_aplicada", desc: "Barra Aplicada" },
                { field: "bolso_peito", desc: "Bolso Peito" },
                { field: "retilinea_manga", desc: "Retilinea na Manga" },
                { field: "cor_detalhe", desc: "Na cor do detalhe" },
            ],
        },
        {
            codigo: 8,
            descricao: "Jaqueta",
            frente: jaqueta,
            modelo: [
                { field: "matelado", desc: "Matelado" },
                { field: "lisa", desc: "Lisa" },
            ],
            tecido: [
                { field: "tecido_base", desc: "Tecido Base" },
                { field: "cor_tecido_base", desc: "Cor" },
            ],
            isSerigrafia: false,
            bordado: [
                { field: "bolso_esq", desc: "Bolso Esq." },
                { field: "frente_esq", desc: "Frente Esq." },
                { field: "frente_drt", desc: "Frente Drt." },
                { field: "pala", desc: "Pala" },
                { field: "manga_esq", desc: "Manga Esq." },
                { field: "manga_drt", desc: "Manga Drt." },
            ],
            tamanhosField: [
                { field: "masculino", desc: "Masc." },
                { field: "feminino", desc: "Fem." },
            ],
            tamanhos: [
                { size: "PP" },
                { size: "P" },
                { size: "M" },
                { size: "G" },
                { size: "XG" },
                { size: "XGG" },
                { size: "EG" },
                { size: "EGG" },
            ],
            detalhes: [
                { field: "vies_duplo_ziper", desc: "Viés duplo Ziper" },
                { field: "ziper_escondido", desc: "Ziper Escondido" },
                { field: "punho_interno", desc: "Punho Interno" },
                { field: "punho_externo", desc: "Punho Externo" },
                { field: "barra_s_punho", desc: "Barra S/ Punho" },
                { field: "vies_elastico", desc: "Viés Com Elástico" },
            ],
        },
    ],
};

function pedido(state = INITIAL_STATE_PEDIDO, action) {
    console.log("PEDIDO reducer function");
    // console.log(action);

    switch (action.type) {
        case "FETCHED_PEDIDO":
            return { ...action.data };
        case "SET_MODELO":
            return { ...state, modelo: action.modelo };
        case "SET_ORDER":
            return { ...state, order: action.order };
        case "SET_SELLER":
            return { ...state, seller: action.seller };
        case "FETCH_ORDERS":
            return { ...state, orders: action.orders, loadOrders: false };
        case "SHOW_MESSAGE":
            return { ...state, message: action.message, showmessage: true };
        case "HIDE_MESSAGE":
            return { ...state, showmessage: false };
        case "LOAD_ORDERS":
            return {
                ...state,
                loadOrders: true,
                order: { modelos: [] },
                modelo: undefined,
            };
        default:
            return state;
    }
}
export default pedido;
