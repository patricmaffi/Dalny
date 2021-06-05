import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { Text } from "native-base";
import { LineChart, BarChart } from "react-native-chart-kit";
import { View } from "react-native";
import { getMovimento12Meses } from "../../controllers/Businessctrl";
import Loading from "../../components/Loading";

const GraficoEntSai = ({ navigation }) => {
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
    let loadEntradasSaidas = async () => {
        if (data.loading == false) {
            return;
        }
        let res = await getMovimento12Meses();
        if (!res) {
            return;
        }
        for (let i = 0; i < res.length; i++) {
            let valores = [];
            for (let a = 0; a < res[i].data.length; a++) {
                valores.push(res[i].data[a][1]);
            }
            switch (res[i].name) {
                case "Entradas":
                    data.entradas = valores;
                    break;
                case "Despesas":
                    data.despesas = valores;
                    break;
                case "Saídas":
                    data.saidas = valores;
                    break;
                default:
                    break;
            }
        }
        var months = [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez",
        ];
        data.meses = [];
        for (let i = 12; i >= 0; i--) {
            var d = new Date();
            d.setMonth(d.getMonth() - i);
            data.meses.push(months[d.getMonth()]);
        }

        data.loading = false;
        updateData();
    };
    // loadEntradasSaidas();

    //DADOS TEMPORARIOS
    const data2 = {
        labels: ["Jan", "Fev", "Mar", "Abr"],
        datasets: [
            {
                data: [10, 45, 28, 31],
            },
        ],
    };

    return (
        <View style={{ flex: 1 }}>
            {data.loading == true ? (
                <Loading></Loading>
            ) : (
                <View>
                    <Text style={{ alignSelf: "center" }}>
                        PEDIDOS ÚLTIMOS 4 MESES
                    </Text>
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
                        verticalLabelRotation={0}
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
export default GraficoEntSai;
