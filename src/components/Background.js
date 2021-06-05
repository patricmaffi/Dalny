import React, { useState, useEffect } from 'react'
import commonStyles from '../commonStyles'
import { View, StatusBar } from 'react-native'
import Header from './Header'
import FooterTabs from './FooterTabs'
const Background = ({children, navigation, title, showbackicon, showlogo, headerIcons, 
    carrinho, user,  headerOption, hideFooter, city}) => {
    console.log('showbackicon')    
    console.log(title)
    console.log(hideFooter)
    let jsxHeader = () => {
        if(headerOption != 0)
        {
            let jsx = (showbackicon) ?
                <Header icons={headerIcons} title={title} showbackicon showlogo={showlogo} navigation={navigation} option={headerOption} city={city}></Header>
                : <Header icons={headerIcons} title={title} showlogo={showlogo} option={headerOption} city={city}></Header>
            return jsx
        }
        return null
    }
    let jsxFooter = () => {
        if(!hideFooter)
        {
            return <FooterTabs navigation={navigation} carrinho={carrinho} user={user} ></FooterTabs>
        }
        return null
    }

    let fundo1 = (child) => {
        return (
            <View style={{ flex: 10 }}>
                {jsxHeader()}
                <View style={{ flex: 10, paddingTop:15, paddingBottom:0}}>
                    {children}                    
                </View>
                {jsxFooter()}
            </View>
        )
    }
    return fundo1()
}
export default Background