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
import touca from "../../../assets/imgs/touca.jpg";
import touca1 from "../../../assets/imgs/touca1.jpg";
import macacao from "../../../assets/imgs/macacao.jpg";
import macacao1 from "../../../assets/imgs/macacao1.jpg";
import avental from "../../../assets/imgs/avental.jpg";
import avental1 from "../../../assets/imgs/avental1.jpg";
import { maskCNPJ, maskData, maskPhone } from "../../components/Utils";

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
        {
            field: "dtentrega",
            desc: "Data Entrega",
            mask: maskData,
            keyboard: "numeric",
        },
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
                { field: "aleta", desc: "Colarinho Aleta" },
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
                { size: 44, tam: "GG" },
                { size: 46, tam: "XG" },
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
                { field: "manga_punho", desc: "Manga Longa com Punho" },
                { field: "manga_barra", desc: "Manga Longa com Barra" },
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
                { size: "GG" },
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
                {
                    field: "retilinea_manga_cpeca",
                    desc: "Retilinea Manga cor da peça",
                },
                {
                    field: "retilinea_manga_cdet",
                    desc: "Retilinea Manga cor do detalhe",
                },
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
            ],
            tamanhos: [
                { size: "PP" },
                { size: "P" },
                { size: "M" },
                { size: "G" },
                { size: "GG" },
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
                { field: "gola_esporte", desc: "Gola Esporte" },
                { field: "gola_padre", desc: "Gola Padre" },
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
                { size: "GG" },
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
                { field: "barra_bolso_detalhe", desc: "Barra bolso detalhe" },
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
                { field: "bolso_cintura", desc: "Bolso Cintura" },
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
                { field: "bolso_fd", desc: "Bolso frente direita" },
                { field: "bolso_fe", desc: "Bolso frente esquerda" },
                { field: "bolso_td", desc: "Bolso traseiro direito" },
                { field: "bolso_te", desc: "Bolso traseiro esquerdo" },
                { field: "bolso_ad", desc: "Bolso adicional direito" },
                { field: "bolso_ae", desc: "Bolso adicional esquerdo" },
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
                { size: 44, tam: "GG" },
                { size: 46, tam: "XG" },
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
                { size: "GG" },
                { size: "XG" },
                { size: "XGG" },
                { size: "EG" },
                { size: "EGG" },
            ],
            detalhes: [
                { field: "com_touca", desc: "Com touca" },
                { field: "manga_punho", desc: "Manga com punho" },
                { field: "manga_barra", desc: "Manga com barra" },
                { field: "bolso_canguru", desc: "Bolso Canguru" },
            ],
        },
        {
            codigo: 8,
            descricao: "Jaqueta",
            frente: jaqueta,
            modelo: [
                { field: "matelado", desc: "Matelado" },
                { field: "liso", desc: "Liso" },
                { field: "liso_imp", desc: "Liso impermeável" },
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
                { size: "GG" },
                { size: "XG" },
                { size: "XGG" },
                { size: "EG" },
                { size: "EGG" },
            ],
            detalhes: [
                { field: "vies_duplo_ziper", desc: "Viés duplo zíper" },
                { field: "ziper_escondido", desc: "Ziper escondido" },
                { field: "punho_interno", desc: "Manga punho interno" },
                { field: "punho_externo", desc: "Manga punho externo" },
                { field: "manga_vies", desc: "Manga com viés" },
                { field: "manga_barra", desc: "Manga com barra" },
                { field: "jaqueta_vies", desc: "Jaqueta com viés" },
                { field: "jaqueta_barra", desc: "Jaqueta com barra" },
            ],
        },

        {
            codigo: 10,
            descricao: "Macacão",
            frente: macacao,
            verso: macacao1,
            modelo: [
                { field: "manga_curta", desc: "Manga Curta" },
                { field: "manga_longa", desc: "Manga Longa" },
                { field: "sport", desc: "Gola Sport" },
                { field: "padre", desc: "Gola Padre" },
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
                { field: "bolso_adc", desc: "Bolso Adc" },
            ],
            tamanhosField: [
                { field: "MC", desc: "MC" },
                { field: "ML", desc: "ML" },
            ],
            tamanhos: [
                { size: "PP" },
                { size: "P" },
                { size: "M" },
                { size: "G" },
                { size: "GG" },
                { size: "XG" },
                { size: "XGG" },
                { size: "EG" },
                { size: "EGG" },
            ],

            detalhes: [
                { field: "botao_escondido", desc: "Botão Escondido" },
                { field: "bolso_peito", desc: "Bolso Peito" },
                {
                    field: "faixa_reflexiva_manga",
                    desc: "Faixa Reflexiva Mangas",
                },
                { field: "bolso_adicional", desc: "Bolso Adicional" },
                { field: "reforco_pernas", desc: "Reforço entre pernas" },
                { field: "bolso_estendido", desc: "Bolso Estendido" },
                {
                    field: "reforco_interno_joelho",
                    desc: "Reforço Interno Joelho",
                },
                { field: "faixa_refletiva", desc: "Faixa Refletiva" },
            ],
        },
        {
            codigo: 9,
            descricao: "Touca",
            frente: touca,
            verso: touca1,
            modelo: [
                { field: "bandana", desc: "Modelo Bandana" },
                { field: "padaria", desc: "Modelo Padaria" },
                { field: "chef", desc: "Modelo Chef" },
                { field: "industrial", desc: "Modelo Industrial" },
            ],
            tecido: [
                { field: "tecido_base", desc: "Tecido Base" },
                { field: "cor_tecido_base", desc: "Cor" },
                { field: "tecido_detalhe", desc: "Tecido Detalhes" },
                { field: "cor_tecido_detalhe", desc: "Cor" },
            ],
            isSerigrafia: true,
            bordado: [
                { field: "bolso_esq", desc: "Frente" },
                { field: "lado_esq", desc: "Lado Esq." },
                { field: "lado_drt", desc: "Lado Drt." },
            ],

            detalhes: [
                { field: "vivo_superior", desc: "Vivo Superior" },
                { field: "vivo_inferior", desc: "Vivo Inferior" },
                { field: "velcro", desc: "Com Velcro" },
            ],
        },
        {
            codigo: 11,
            descricao: "Avental",
            frente: avental,
            verso: avental1,
            modelo: [
                { field: "inteiro", desc: "Avental Inteiro" },
                { field: "saia", desc: "Avental Saia" },
            ],
            tecido: [
                { field: "tecido_base", desc: "Tecido Base" },
                { field: "cor_tecido_base", desc: "Cor" },
                { field: "tecido_detalhe", desc: "Tecido Detalhes" },
                { field: "cor_tecido_detalhe", desc: "Cor" },
            ],
            isSerigrafia: true,
            bordado: [
                { field: "peito", desc: "Peito" },
                { field: "bolso_frente", desc: "Bolso Frente" },
            ],

            detalhes: [{ field: "bolso_frente", desc: "Bolso Frente" }],
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
