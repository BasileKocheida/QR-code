import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'native-base';
import {  connect } from 'react-redux';
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

  function HistoryScreenToConnect({history}) {
  
    return (
        <View style={styles.container}>
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
  
    mainText: {
      fontSize: 16,
      color: 'black'
    },
  });
  

  const HistoryScreen = connect(mapStateToProps, mapDispatchToProps)(HistoryScreenToConnect);
  export default HistoryScreen;