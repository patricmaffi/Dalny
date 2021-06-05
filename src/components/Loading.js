
import React from 'react'
import { View, Image, Text } from 'react-native'
const Loading = () => {
    return (
        <View style={{ flex: 10, justifyContent: 'space-between' }}>
            <View></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 100 }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ borderRadius: 15, width: 250, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', marginRight:20}}>

                        <Image
                            source={{ uri: 'https://gifimage.net/wp-content/uploads/2017/10/carregando-gif-animado-3.gif' }}
                            style={{ width: 40, height: 40, borderRadius: 15, alignSelf: 'center' }}
                        />
                        <Text style={{fontSize:22, alignSelf: 'center', marginLeft:15 }}>Aguarde</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
            <View></View>
        </View>
    )
}

export default Loading