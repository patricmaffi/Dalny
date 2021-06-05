import {StyleSheet } from 'react-native'
import commonStyles from '../commonStyles'

export default StyleSheet.create({
    ex:{
        paddingHorizontal: 15,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#222',
        fontSize: 24,
        fontWeight: 'bold'
    },
    produtoStyle:
    {
        flex:4,
        paddingHorizontal: 15,
        height: 200,
        backgroundColor: '#DDD',
        borderWidth: 0.5,
        borderColor: '#222',
        flexDirection: 'column', 
        justifyContent: 'space-between'
    },
    menuicons:
    {
        width: 30, height: 30, alignSelf: "center", resizeMode: 'contain'
    },
    menulabel:
    {
        fontFamily:commonStyles.fontFamily,
        color: commonStyles.colors.secondary, 
        fontSize: 12,
        justifyContent:"center",
        alignSelf:'center'
    },
    touchIconFooter:
    {
        borderWidth:0, 
        justifyContent:'center',
        minWidth:50
    },
    width100:
    {
        width: 100
    },
    width300:
    {
        width: 300
    },
    top10:
    {
        top : 10,
    },
    fontDefault:{
        fontFamily:'MicrosoftNewTaiLue'
    }
})