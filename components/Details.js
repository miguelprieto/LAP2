import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js');
const { ListView, StyleSheet, Text, TextInput, View, TouchableHighlight,
   TouchableNativeFeedback, AlertIOS, Image, Button,Linking, Dimensions} = ReactNative;
import { Constants, MapView,ViewPropTypes } from 'expo';
import { StackNavigator } from 'react-navigation';
const StatusBar = require('./StatusBar');



class Details extends React.Component {
  static navigationOptions = {title: 'Details of Restaurant',};

  render() {
    const {state} = this.props.navigation;
    return (
      <View style={styles.container} >
        <StatusBar title={state.params.title} />
        <Image source={{uri:state.params.thumbnailUrl }}
        style={styles.avatar2}   resizeMode="contain" />
        <StatusBar title="Description"/>
        <Text style={styles.liText}>{ state.params.description}</Text>
        <StatusBar title="Indirizzo" />
        <Text style={styles.liText}>{ state.params.via}</Text>
        <StatusBar title="Telefono" />
        <Text style={styles.liText}>{ state.params.telefono}</Text>
        <StatusBar title="Orario" />
        <Text style={styles.liText}>{ state.params.orario}</Text>
        <Button
          onPress={() =>
          Linking.openURL(state.params.url)}
          title="Go to website"
        />
        <Button title="Go to MAP"  onPress={() =>
        this.props.navigation.navigate('Mp',state.params)}/>

      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  }
});


module.exports = Details;
