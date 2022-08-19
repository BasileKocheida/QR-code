import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
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

function EncodeScreenToConnect({history, addHistory}) {
    const [text, onChangeText] = useState("Write here");

    const handleTextListContent = () => {
      
      console.log(text)
      //Function qui lance le dispatch de l'action
      addHistory(text)
    };

  return (
    <SafeAreaView style={styles.container}>
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
        />
        <TouchableOpacity
          onPress={() => {handleTextListContent()}}
          style={{fontSize: 40, borderWidth: 1, padding: 5, width: 150, margin:12}}
        >
          <Text>Enregistrer</Text>
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', height: '100%'}}>
          <QRCode
              value={history.length > 0 ? history[history.length -1] : "health app"}
              size={300}
              bgColor='#000000'
              fgColor='#000000'
          />
        </View>
    </SafeAreaView>  
    );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },

  });

  const EncodeScreen = connect(mapStateToProps, mapDispatchToProps)(EncodeScreenToConnect);
  export default EncodeScreen;