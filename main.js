
'use strict';
import Expo from 'expo';

import React, {Component} from 'react';
import ReactNative from 'react-native';
//const firebase = require('firebase');
import * as firebase from 'firebase';
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const styles = require('./styles.js')
import { NavigationProvider, StackNavigation } from '@expo/ex-navigation';
//import { FontAwesome } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
//import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';


const {
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} = ReactNative;


var config = {
    apiKey: "AIzaSyDLpzGQIOR8ikZ208vTO2aErrY5RTTYEoA",
    authDomain: "exam-ab147.firebaseapp.com",
    databaseURL: "https://exam-ab147.firebaseio.com",
    projectId: "exam-ab147",
    storageBucket: "",
    messagingSenderId: "119560845918"
  };
  const firebaseApp=firebase.initializeApp(config);


class Firebase extends React.Component {
  static navigationOptions = {title: 'My Favourites Places',};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }


  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="My favourites Places" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>

        <ActionButton onPress={this._addItem.bind(this)} title="Add" />

      </View>
    )
  }

  _handlePress = () =>{
    const { navigate } = this.props.navigation;
    navigate('Info');
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  _renderItem(item) {


    const onPress = () => {
      AlertIOS.alert(
        'More actions',
        null,
        [
          {text: 'Information', onPress:(text) => this._handlePress },
          {text: 'Remove', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };

    return (
      //<ListItem item={item} onPress={this._handlePress} />
        <ListItem item={item} onPress={onPress} />
    );
  }

}

class InfoScreen extends React.Component {
  static navigationOptions = {title: 'Info',};
  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Info Place" />

      </View>
    )
  }

}


const SimpleApp = StackNavigator({
    Home: {screen: Firebase  },
    Info: {screen: InfoScreen },

});


Expo.registerRootComponent(Firebase);
export default InfoScreen;
