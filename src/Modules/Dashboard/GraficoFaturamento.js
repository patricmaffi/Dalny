import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Text } from "native-base";
import { BarChart, LineChart } from "react-native-chart-kit";
import { View } from "react-native";
import { getFaturamento30dias } from "../../controllers/Businessctrl";
import Loading from "../../components/Loading";

const GraficoFaturamento = ({ navigation }) => {
    const [data, setData] = useState({
        entradas: [],
        saidas: [],
        despesas: [],
        loading: false,
    });
    console.log("xxxxxxxxxxxxxx DASHBOARD APP GERENCIAL xxxxxxxxxxxxxxx");
    let updateData = () => {
        setData(Object.assign({}, data));
    };
    let load = async () => {
        if (data.loading == false) {
            return;
        }
        let res = await getFaturamento30dias();
        console.log("1111111111111111111111111111111111111");
        console.log(res);
        if (!res) {
            return;
        }
        data.dias = [];
        data.totais = res[0].data.map((el) => el[1]);
        let fator = 4;
        let highVal = 0;
        for (let i = 0; i < res[0].data.length; i++) {
            let el = res[0].data[i];
            if (i % fator == 0) {
                let d = new Date(el[0]);
                let dia =
                    d.getDate().toString().length == 1
                        ? "0" + d.getDate()
                        : d.getDate();
                let mes =
                    (d.getMonth() + 1).toString().length == 1
                        ? "0" + (d.getMonth() + 1)
                        : d.getMonth() + 1;
                data.dias.push(dia + "/" + mes);
            }
            if (el[1] > highVal) {
                highVal = el[1];
            }
        }
        data.loading = false;
        updateData();
    };
    // load();
    //DADOS TEMPORARIOS
    const data2 = {
        labels: ["CAM. SOC. M", "CAM. SOC. F", "Polo", "PV"],
        datasets: [
            {
                data: [50, 25, 11, 31],
            },
        ],
    };

    return (
        <View style={{ flex: 1 }}>
            {data.loading == true ? (
                <Loading></Loading>
            ) : (
                <View>
                    <Text style={{ alignSelf: "center" }}>TIPOS PEDIDOS</Text>
                    <BarChart
                        style={{
                            marginVertical: 2,
                            borderRadius: 12,
                        }}
                        data={data2}
                        width={Dimensions.get("window").width - 40}
                        height={220}
                        yAxisLabel=""
                        fromZero={true}
                        showValuesOnTopOfBars={true}
                        chartConfig={{
                            backgroundColor: "#ff0000",
                            backgroundGradientFrom: "#ff0000",
                            backgroundGradientTo: "#ff6666",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            useShadowColorFromDataset: false,
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,

                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "2",
                                strokeWidth: "2",
                                stroke: "#ffa726",
                            },
                        }}
                        verticalLabelRotation={-15}
                    />
                    {/* <LineChart
                        data={{
                            labels: data.meses,
                            datasets: [
                                {
                                    data: data.entradas,
                                },
                                {
                                    color: (opacity = 5) =>
                                        `rgba(51, 204, 51, 1)`,
                                    data: data.saidas,
                                },
                                {
                                    color: (opacity = 5) =>
                                        `rgba(255, 51, 0, 1)`,
                                    data: data.despesas,
                                },
                            ],
                        }}
                        width={Dimensions.get("window").width - 40} // from react-native
                        height={220}
                        yAxisLabel="R$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        horizontalLabelRotation={-40}
                        verticalLabelRotation={-40}
                        chartConfig={{
                            backgroundColor: "#0033cc",
                            backgroundGradientFrom: "#0033cc",
                            backgroundGradientTo: "#668cff",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "2",
                                strokeWidth: "2",
                                stroke: "#ffa726",
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 2,
                            borderRadius: 12,
                        }}
                    /> */}
                </View>
            )}
        </View>
    );
};
export default GraficoFaturamento;
