export default {
    fontFamily: "Roboto",
    fontFamilyBold: "Roboto",
    colors: {
        today: "#B13B44",
        secondary: "#FFF",
        mainText: "white",
        secText: "#C70039",
        thirdText: "#A1A1A0",
        subText: "#555",
        grayBackground: "#EFEFEF",
        backgoundHeader: "rgb(255, 0, 0)",
        buttonGreen: "#02AF9C",
        iconColor: "#E80037",
        iconSecundaryColor: "white",
        iconThirdColor: "#A1A1A0",
        backgroundColorPrimary: "#F8F8FF",
        borderGray: "#00000033",
        secundarybackground: "#FFCC29",
        fontColor: "black",
        avaiable: "#8EE58E",
        reservado: "rgb(255, 153, 0)",
        pago: "rgb(38, 197, 255)",
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black",
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    capture: {
        flex: 0,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: "center",
        margin: 20,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#A1A1A0",
        borderTopEndRadius: 16,
        borderTopStartRadius: 16,
        height: 40,
        marginHorizontal: -2,
    },
    card: {
        borderTopEndRadius: 16,
        borderTopStartRadius: 16,
        marginTop: 15,
    },
    cardItemBody: { marginLeft: -20, minWidth: 310 },
    inputCardTamanhos: { width: 50 },
    lblSize: { marginLeft: 15, alignSelf: "center" },
    lblInputInfos: { fontSize: 14, marginTop: 15 },
};
