import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Item,
    Input,
    CheckBox,
    Body,
    ListItem,
    Card,
    CardItem,
    Label,
    Textarea,
    Button,
} from "native-base";

import { Image, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import commonStyles from "../../../commonStyles";
import { setModelo } from "../PedidoAction";
import RadioForm from "react-native-simple-radio-button";

const FormDetalhes = ({ navigation }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.pedido);

    console.log("xxxxxxxxxxxxxx FormDetalhes xxxxxxxxxxxxxxx");
    // console.log(data.modelo);
    if (!data.modelo) {
        return null;
    }
    let jsxBody;
    switch (data.modelo.codigo) {
        case 1:
            jsxBody = (
                <FormCamisaSocialMasculina
                    modelo={data.modelo}
                ></FormCamisaSocialMasculina>
            );
            break;
        case 2:
            jsxBody = (
                <FormCamisaSocialFeminina
                    modelo={data.modelo}
                ></FormCamisaSocialFeminina>
            );
            break;

        default:
            jsxBody = (
                <FormCamisaSocialMasculina
                    modelo={data.modelo}
                ></FormCamisaSocialMasculina>
            );
            break;
    }
    return jsxBody;
};
export default FormDetalhes;

const FormCamisaSocialMasculina = ({ sizes, modelo }) => {
    return (
        <>
            <CardModelo modelo={modelo}></CardModelo>
            <CardTecidos modelo={modelo}></CardTecidos>
            <CardBordado modelo={modelo}></CardBordado>
            <CardTamanhos modelo={modelo}></CardTamanhos>
            {!modelo.tamanhosExtra ? null : (
                <CardTamanhosExtra modelo={modelo}></CardTamanhosExtra>
            )}
            <CardObservacoes modelo={modelo}></CardObservacoes>
            <CardODetalhes modelo={modelo}></CardODetalhes>
            <CardTotal modelo={modelo}></CardTotal>
        </>
    );
};
const FormCamisaSocialFeminina = ({ modelo }) => {
    return (
        <>
            <CardModelo modelo={modelo}></CardModelo>
            <CardTecidos modelo={modelo}></CardTecidos>
            <CardBordado modelo={modelo}></CardBordado>
            <CardTamanhos modelo={modelo}></CardTamanhos>
            <CardObservacoes modelo={modelo}></CardObservacoes>
            <CardODetalhes modelo={modelo}></CardODetalhes>
            <CardTotal modelo={modelo}></CardTotal>
        </>
    );
};
const CardHeader = ({ titulo }) => {
    return (
        <View style={commonStyles.cardHeader}>
            <Text
                style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 16,
                    flex: 9,
                }}
            >
                {titulo}
            </Text>
        </View>
    );
};
const CardTecidos = ({ modelo }) => {
    return (
        <Card style={commonStyles.card}>
            <CardHeader titulo={"Tecido"}></CardHeader>
            <CardItem
                style={{
                    marginHorizontal: 0,
                    paddingHorizontal: 0,
                }}
            >
                <Body style={commonStyles.cardItemBody}>
                    {modelo.tecido.map((el, index) => {
                        return (
                            <ListItem style={{ width: 300 }} key={index}>
                                <Body>
                                    <Label>{el.desc}</Label>
                                    <Item regular>
                                        <CustomInput
                                            modelo={modelo}
                                            element={modelo.pedido}
                                            fieldName={el.field}
                                        ></CustomInput>
                                    </Item>
                                </Body>
                            </ListItem>
                        );
                    })}
                </Body>
            </CardItem>
        </Card>
    );
};

const CardModelo = ({ modelo }) => {
    return (
        <Card style={commonStyles.card}>
            <CardHeader titulo={"Modelo"}></CardHeader>
            <CardItem>
                <Body style={commonStyles.cardItemBody}>
                    {modelo.modelo.map((el, index) => {
                        return (
                            <CheckOption
                                key={index}
                                data={el}
                                modelo={modelo}
                                sector={"modelo"}
                            ></CheckOption>
                        );
                    })}
                </Body>
            </CardItem>
        </Card>
    );
};

const CardBordado = ({ modelo }) => {
    const dispatch = useDispatch();
    let sector = "bordado";
    if (!modelo.pedido[sector]) {
        modelo.pedido[sector] = {};
    }

    return (
        <Card style={commonStyles.card}>
            <CardHeader titulo={"Bordados"}></CardHeader>
            <CardItem>
                <Body style={commonStyles.cardItemBody}>
                    <CheckOption
                        data={{ field: "bordado", desc: "Bordado" }}
                        modelo={modelo}
                        sector={sector}
                    ></CheckOption>
                    {!modelo.isSerigrafia ? null : (
                        <>
                            <CheckOption
                                data={{
                                    field: "serigrafia",
                                    desc: "Serigrafia",
                                }}
                                modelo={modelo}
                                sector={sector}
                            ></CheckOption>
                            <Body
                                style={{
                                    flexDirection: "row",
                                    alignSelf: "flex-start",
                                    paddingLeft: 20,
                                    marginTop: 15,
                                }}
                            >
                                <Text>B</Text>
                                <Text style={{ marginLeft: 35 }}>S</Text>
                            </Body>
                        </>
                    )}
                    {!modelo.pedido[sector].bordado &&
                    !modelo.pedido[sector].serigrafia
                        ? null
                        : modelo.bordado.map((el, index) => {
                              return (
                                  <ListItem style={{ width: 400 }} key={index}>
                                      <CheckBox
                                          checked={
                                              modelo.pedido[sector][el.field]
                                          }
                                          onPressOut={(v) => {
                                              modelo.pedido[sector][el.field] =
                                                  !modelo.pedido[sector][
                                                      el.field
                                                  ];
                                              dispatch(
                                                  setModelo(
                                                      modelo,
                                                      modelo.pedido
                                                  )
                                              );
                                          }}
                                      />
                                      {!modelo.isSerigrafia ? (
                                          <Body>
                                              <Text>{el.desc}</Text>
                                          </Body>
                                      ) : (
                                          <>
                                              <CheckBox
                                                  style={{ marginLeft: 15 }}
                                                  checked={
                                                      modelo.pedido[sector][
                                                          el.field + "_s"
                                                      ]
                                                  }
                                                  onPressOut={(v) => {
                                                      modelo.pedido[sector][
                                                          el.field + "_s"
                                                      ] =
                                                          !modelo.pedido[
                                                              sector
                                                          ][el.field + "_s"];
                                                      dispatch(
                                                          setModelo(
                                                              modelo,
                                                              modelo.pedido
                                                          )
                                                      );
                                                  }}
                                              />
                                              <Body>
                                                  <Text>{el.desc}</Text>
                                              </Body>
                                          </>
                                      )}
                                  </ListItem>
                              );
                          })}
                    {!modelo.pedido.bordado ? null : (
                        <ListItem style={{ width: 300 }}>
                            <Body>
                                <Label>Observação</Label>
                                <Textarea
                                    rowSpan={5}
                                    defaultValue={modelo.pedido[sector]["obs"]}
                                    bordered
                                    placeholder=""
                                    onChangeText={(text) => {
                                        modelo.pedido[sector]["obs"] = text;
                                        dispatch(
                                            setModelo(modelo, modelo.pedido)
                                        );
                                    }}
                                />
                            </Body>
                        </ListItem>
                    )}
                </Body>
            </CardItem>
        </Card>
    );
};
const CardTamanhos = ({ modelo }) => {
    const dispatch = useDispatch();
    if (!modelo.pedido.tipo_tamanho) {
        modelo.pedido.tipo_tamanho = "size";
        modelo.pedido.tamanhos = JSON.parse(JSON.stringify(modelo.tamanhos));
    }
    // modelo.pedido.tamanhos = Object.assign([], modelo.tamanhos);
    var radio_props = [
        { label: "        ", value: 0 },
        { label: "", value: 1 },
    ];
    return (
        <Card style={commonStyles.card}>
            <CardHeader titulo={"Tamanhos"}></CardHeader>
            <CardItem>
                <Body style={commonStyles.cardItemBody}>
                    <View
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 25,
                            marginTop: 35,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                flex: 9,
                            }}
                        >
                            <Label
                                style={{
                                    marginLeft: 30,
                                    alignSelf: "center",
                                }}
                            >
                                Tam
                            </Label>
                            {modelo.tamanhosField.map((el, index) => {
                                return (
                                    <Label
                                        key={index}
                                        style={commonStyles.lblSize}
                                    >
                                        {el.desc}
                                    </Label>
                                );
                            })}
                        </View>
                    </View>
                    {modelo.showSizeOptions == true ? (
                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 10,
                                justifyContent: "center",
                                paddingLeft: 25,
                            }}
                        >
                            <RadioForm
                                radio_props={radio_props}
                                initial={
                                    modelo.pedido.tipo_tamanho == "tam" ? 1 : 0
                                }
                                formHorizontal={true}
                                onPress={(value) => {
                                    let tipo_tamanho =
                                        value == 0 ? "size" : "tam";
                                    modelo.pedido.tipo_tamanho = tipo_tamanho;
                                    dispatch(setModelo(modelo, modelo.pedido));
                                }}
                            />
                        </View>
                    ) : null}

                    {modelo.pedido.tamanhos.map((el, index) => {
                        return (
                            <ListItem style={{ width: 300 }} key={index}>
                                <Body>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Label style={commonStyles.lblSize}>
                                            {el.size}
                                        </Label>
                                        <Label style={commonStyles.lblSize}>
                                            {el.tam}
                                        </Label>
                                        {modelo.tamanhosField.map(
                                            (el1, index1) => {
                                                return (
                                                    <Item
                                                        key={index1}
                                                        regular
                                                        style={{ width: 50 }}
                                                    >
                                                        <CustomInput
                                                            modelo={modelo}
                                                            element={el}
                                                            fieldName={
                                                                el1.field
                                                            }
                                                            keyboardType={
                                                                "numeric"
                                                            }
                                                        ></CustomInput>
                                                    </Item>
                                                );
                                            }
                                        )}
                                    </View>
                                </Body>
                            </ListItem>
                        );
                    })}
                </Body>
            </CardItem>
        </Card>
    );
};
const CardTamanhosExtra = ({ modelo }) => {
    const dispatch = useDispatch();
    if (!modelo.pedido.tamanhosExtra) {
        modelo.pedido.tamanhosExtra = JSON.parse(
            JSON.stringify(modelo.tamanhosExtra)
        );
    }
    let tamanhos = modelo.pedido.tamanhosExtra.tamanhos;
    let fields = modelo.pedido.tamanhosExtra.fields;
    let titulo = modelo.pedido.tamanhosExtra.titulo;
    return (
        <Card style={commonStyles.card}>
            <CardHeader titulo={titulo}></CardHeader>
            <CardItem>
                <Body style={commonStyles.cardItemBody}>
                    <View
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 25,
                            marginTop: 35,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                flex: 9,
                            }}
                        >
                            <Label
                                style={{
                                    marginLeft: 30,
                                    alignSelf: "center",
                                }}
                            >
                                Tam
                            </Label>
                            {fields.map((el, index) => {
                                return (
                                    <Label
                                        key={index}
                                        style={commonStyles.lblSize}
                                    >
                                        {el.desc}
                                    </Label>
                                );
                            })}
                        </View>
                    </View>

                    {tamanhos.map((el, index) => {
                        return (
                            <ListItem style={{ width: 300 }} key={index}>
                                <Body>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Label style={commonStyles.lblSize}>
                                            {el.size}
                                        </Label>
                                        <Label style={commonStyles.lblSize}>
                                            {el.tam}
                                        </Label>
                                        {fields.map((el1, index1) => {
                                            return (
                                                <Item
                                                    key={index1}
                                                    regular
                                                    style={{ width: 50 }}
                                                >
                                                    <CustomInput
                                                        modelo={modelo}
                                                        element={el}
                                                        fieldName={el1.field}
                                                        keyboardType={"numeric"}
                                                    ></CustomInput>
                                                </Item>
                                            );
                                        })}
                                    </View>
                                </Body>
                            </ListItem>
                        );
                    })}
                </Body>
            </CardItem>
        </Card>
    );
};
const CardObservacoes = ({ modelo }) => {
    const dispatch = useDispatch();
    if (!modelo.pedido.observacoes) {
        modelo.pedido.observacoes = [];
    }
    return (
        <Card style={commonStyles.card}>
            <CardHeader titulo={"Observações"}></CardHeader>
            <CardItem>
                <Body style={commonStyles.cardItemBody}>
                    {modelo.pedido.observacoes.map((el, index) => {
                        return (
                            <ListItem style={{ minWidth: 290 }} key={index}>
                                <Body>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            marginTop: 15,
                                        }}
                                    >
                                        <Label style={{ flex: 8 }}>Nome</Label>
                                        <Label style={{ flex: 3 }}>
                                            Tamanho
                                        </Label>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginTop: 15,
                                        }}
                                    >
                                        <Item regular style={{ flex: 8 }}>
                                            <CustomInput
                                                modelo={modelo}
                                                element={el}
                                                fieldName={"nome"}
                                            ></CustomInput>
                                        </Item>
                                        <Item regular style={{ flex: 3 }}>
                                            <CustomInput
                                                modelo={modelo}
                                                element={el}
                                                fieldName={"tamanho"}
                                            ></CustomInput>
                                        </Item>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            marginTop: 15,
                                        }}
                                    >
                                        <Label style={{ flex: 3 }}>Qtd</Label>
                                        <Label style={{ flex: 8 }}>Obs</Label>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginTop: 15,
                                        }}
                                    >
                                        <Item regular style={{ flex: 3 }}>
                                            <CustomInput
                                                modelo={modelo}
                                                element={el}
                                                fieldName={"quantidade"}
                                                keyboardType={"numeric"}
                                            ></CustomInput>
                                        </Item>
                                        <Item regular style={{ flex: 8 }}>
                                            <CustomInput
                                                modelo={modelo}
                                                element={el}
                                                fieldName={"obs"}
                                            ></CustomInput>
                                        </Item>
                                    </View>
                                </Body>
                            </ListItem>
                        );
                    })}
                    <Button
                        style={{
                            justifyContent: "center",
                            alignSelf: "center",
                            backgroundColor: commonStyles.colors.buttonGreen,
                            borderRadius: 8,
                            height: 50,
                            marginBottom: 5,
                            marginTop: 5,
                        }}
                        onPressOut={() => {
                            modelo.pedido.observacoes.push({});
                            dispatch(setModelo(modelo, modelo.pedido));
                        }}
                    >
                        <Text style={{ textAlign: "center" }}>
                            ADICIONAR OBSERVAÇÃO
                        </Text>
                    </Button>
                </Body>
            </CardItem>
        </Card>
    );
};

const CardODetalhes = ({ modelo }) => {
    if (!modelo.pedido.observacoes) {
        modelo.pedido.observacoes = [];
    }
    return (
        <Card style={commonStyles.card}>
            <CardHeader titulo={"Detalhes"}></CardHeader>
            <CardItem>
                <Body style={commonStyles.cardItemBody}>
                    {modelo.detalhes.map((el, index) => {
                        return (
                            <CheckOption
                                key={index}
                                data={el}
                                modelo={modelo}
                                sector={"detalhes"}
                            ></CheckOption>
                        );
                    })}
                </Body>
            </CardItem>
            <CardItem>
                <View style={{ flexDirection: "column", marginLeft: -30 }}>
                    <Image
                        source={modelo.frente}
                        style={{
                            width: Dimensions.get("window").width - 40,
                            height: Dimensions.get("window").height - 460,
                            marginTop: 5,
                            resizeMode: "contain",
                            alignSelf: "center",
                        }}
                    />
                    <Image
                        source={modelo.verso}
                        style={{
                            width: Dimensions.get("window").width - 40,
                            height: Dimensions.get("window").height - 460,
                            marginTop: 5,
                            resizeMode: "contain",
                            alignSelf: "center",
                        }}
                    />
                </View>
            </CardItem>
        </Card>
    );
};

const CardTotal = ({ modelo }) => {
    if (!modelo.pedido.valor_unitario) {
        modelo.pedido.valor_unitario = 0.0;
    }
    let somaQuantidade = () => {
        modelo.pedido.qtd_total = 0;
        let fields = [
            "manga_curta",
            "manga_longa",
            "masculino",
            "feminino",
            "blook",
            "calca",
            "calcao",
        ];
        if (modelo.pedido.tamanhos) {
            for (let i = 0; i < modelo.pedido.tamanhos.length; i++) {
                let qtd = modelo.pedido.tamanhos[i];
                for (let x = 0; x < fields.length; x++) {
                    modelo.pedido.qtd_total += qtd[fields[x]]
                        ? parseFloat(qtd[fields[x]])
                        : 0;
                }
            }
            if (
                modelo.pedido &&
                modelo.pedido.valor_unitario &&
                modelo.pedido.qtd_total
            ) {
                modelo.pedido.valor_total =
                    modelo.pedido.qtd_total *
                    parseFloat(modelo.pedido.valor_unitario);
            }
            modelo.pedido.qtd_total = modelo.pedido.qtd_total.toString();
            if (modelo.pedido.valor_total) {
                modelo.pedido.valor_total =
                    modelo.pedido.valor_total.toString();
            }
        }
        somaQuantidadeExtra();
    };
    let somaQuantidadeExtra = () => {
        if (!modelo.pedido.tamanhosExtra) {
            return;
        }
        let fields = modelo.pedido.tamanhosExtra.fields.map((el) => {
            return el.field;
        });
        let tamanhos = modelo.pedido.tamanhosExtra.tamanhos;
        modelo.pedido.qtd_total = parseFloat(modelo.pedido.qtd_total);
        if (modelo.pedido.tamanhos) {
            for (let i = 0; i < tamanhos.length; i++) {
                let qtd = tamanhos[i];
                for (let x = 0; x < fields.length; x++) {
                    modelo.pedido.qtd_total += qtd[fields[x]]
                        ? parseFloat(qtd[fields[x]])
                        : 0;
                }
            }
            if (
                modelo.pedido &&
                modelo.pedido.valor_unitario &&
                modelo.pedido.qtd_total
            ) {
                modelo.pedido.valor_total =
                    modelo.pedido.qtd_total *
                    parseFloat(modelo.pedido.valor_unitario);
            }
            modelo.pedido.qtd_total = modelo.pedido.qtd_total.toString();
            if (modelo.pedido.valor_total) {
                modelo.pedido.valor_total =
                    modelo.pedido.valor_total.toString();
            }
        }
    };
    somaQuantidade();

    return (
        <Card style={commonStyles.card}>
            <CardHeader titulo={"Totais"}></CardHeader>
            <CardItem>
                <Body style={commonStyles.cardItemBody}>
                    <ListItem style={{ minWidth: 290 }}>
                        <Body>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    marginTop: 15,
                                }}
                            >
                                <Label style={{ flex: 8 }}>Quantidade</Label>
                            </View>
                            <Item regular style={{ flex: 8 }}>
                                <Input
                                    placeholder=""
                                    editable={false}
                                    value={modelo.pedido.qtd_total}
                                />
                            </Item>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    marginTop: 15,
                                }}
                            >
                                <Label style={{ flex: 8 }}>
                                    Valor Unitario
                                </Label>
                            </View>
                            <Item regular style={{ flex: 8 }}>
                                <CustomInput
                                    modelo={modelo}
                                    element={modelo.pedido}
                                    fieldName={"valor_unitario"}
                                    keyboardType={"numeric"}
                                ></CustomInput>
                            </Item>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    marginTop: 15,
                                }}
                            >
                                <Label style={{ flex: 8 }}>Valor Total</Label>
                            </View>

                            <Item regular style={{ flex: 8 }}>
                                <Input
                                    placeholder=""
                                    editable={false}
                                    value={modelo.pedido.valor_total}
                                />
                            </Item>
                        </Body>
                    </ListItem>
                </Body>
            </CardItem>
        </Card>
    );
};

const CheckOption = ({ data, modelo, sector }) => {
    const dispatch = useDispatch();
    if (!modelo.pedido[sector]) {
        modelo.pedido[sector] = {};
    }
    return (
        <>
            <ListItem style={{ width: 400 }}>
                <CheckBox
                    checked={modelo.pedido[sector][data.field]}
                    onPressOut={(v) => {
                        modelo.pedido[sector][data.field] =
                            !modelo.pedido[sector][data.field];
                        dispatch(setModelo(modelo, modelo.pedido));
                    }}
                />
                <Body>
                    <Text>{data.desc}</Text>
                </Body>
            </ListItem>
        </>
    );
};
const CustomInput = ({ modelo, element, fieldName, keyboardType }) => {
    const dispatch = useDispatch();
    return (
        <Input
            placeholder=""
            onChangeText={(text) => (element[fieldName] = text)}
            onBlur={() => dispatch(setModelo(modelo, modelo.pedido))}
            keyboardType={keyboardType || "default"}
            defaultValue={element[fieldName] ? element[fieldName] : ""}
        />
    );
};
