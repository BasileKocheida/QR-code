import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Link } from 'native-base';
import {connect} from 'react-redux';
import { addItemHistory } from '../action/action';

const mapStateToProps = (state) => {
  return {
    history: state.history
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addHistory: (text) => dispatch(addItemHistory(text))
  }
}

  function DecodeScreenToConnect({history, addHistory}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    // const [scannedContent, setScannedContent] = useState([]);
  
    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
      if (!hasPermission) {
        getBarCodeScannerPermissions();
      }
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true)
        Alert.alert(
            "Alert QR CODE",
            "New URL",
            [
              {
                text: "Annuler",
                onPress: () => setScanned(false),
                style: "cancel"
              },
              { text: "Ajouter", onPress: () => {
                console.log('ici')
                // setScannedContent(scannedContent.concat([data]))
                //Function qui lance le dispatch de l'action
                addHistory(data)
                // console.log(history)
                setScanned(false)
                } 
              }
            ]
          );
          
        // console.log(scannedContent);

    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={{height: 400, width: 400}}
                />
            </View>
            <View>
                {
                    history.map((content, index) =>{
                        return (
                            <Link key={index} href={content}>{content}</Link>
                        )
                    })
                }
            </View>
        </View>    
    );
}

const styles = StyleSheet.create({
    container: {
      // flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
    },
  
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
  
    },
  
    mainText: {
      fontSize: 16,
      color: 'black'
    },
  });
  

  const DecodeScreen = connect(mapStateToProps, mapDispatchToProps)(DecodeScreenToConnect);
  export default DecodeScreen;