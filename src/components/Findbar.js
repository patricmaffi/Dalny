import React, { Component, useState, useEffect } from 'react'
import { Header, Item, Icon, Input, Button, Text, View } from 'native-base';
import * as Font from 'expo-font';
import commonStyles from '../commonStyles';
import { TouchableOpacity } from 'react-native';

export function onFilter({ filter }) {
    // console.log('onFilter')
    return { header: null }
}

const Findbar = ({ props, searchEvent, autofocus, text }) => {

    const [filter, setFilter] = useState('');
    console.log('FINDBARRRRRRRRRRRRRRRRRRRRRRRRRRR')
    console.log(text)
    if (filter !== text) {
        setFilter(text)
    }
    return (
        <View searchBar rounded noShadow style={{ backgroundColor: commonStyles.colors.backgroundColorPrimary, flex:9 }}>
            <Item style={{ marginRight: 5 }}>
                <Icon name="ios-search" />
                <Input
                    autoFocus={autofocus}
                    style={{ fontFamily: commonStyles.fontFamily }}
                    onChangeText={text => searchEvent(text, false)}
                    onBlur={(e) => searchEvent(filter, true)}
                    value={filter}
                    placeholder={'buscar'} />
                {/* <Icon name="ios-checkmark-circle-outline" /> */}
            </Item>
            {/* <Button transparent>
                <Text>Search</Text>
            </Button> */}
        </View>
    )
}

export default Findbar;