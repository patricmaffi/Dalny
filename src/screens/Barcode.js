import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


const Barcode = ({ navigation}) => {
    const [data, setData] = useState({});
    const [scanned, setScanned] = useState(false);
    console.log('xxxxxxxxxxxxxx CAMERA xxxxxxxxxxxxxxx')
    console.log(onCaptureBarcode)
    console.log(navigation)
    let onCaptureBarcode = navigation.getParam('onCaptureBarcode');
    let updateData = () => {
      setData(Object.assign({}, data))
    }
    const checkPermission = async () => {
      console.log('__startCamera')
      if (data.hasPermission) {
        return
      }
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      // const { status } = await Permissions.askAsync(Permissions.CAMERA)
      if (status === 'granted') {
        data.hasPermission = (status === 'granted');
        updateData()
      } else {
        Alert.alert('Access denied')
      }
    }
    checkPermission()
    const handleBarCodeScanned = ({ type, data }) => {      
      onCaptureBarcode(data, true);
      navigation.goBack()
    //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
    if (!data.hasPermission) {
      return <Text>teste </Text>
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
    );  
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 10,
      backgroundColor: 'gray',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      flexDirection: 'row'
    },
  });
Barcode.navigationOptions = {
    title: 'Barcode',
    headerShown: false
}
export default Barcode