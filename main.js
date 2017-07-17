'use strict';
import Expo from 'expo';
import { Constants, MapView,ViewPropTypes } from 'expo';
import React, {Component } from 'react';
import ReactNative from 'react-native';
import * as firebase from 'firebase';
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const Details = require('./components/Details')
const Mapa = require('./components/Mapa');
const AddList = require('./components/AddList');
const styles = require('./styles.js')
import { AppRegistry,} from 'react-native';
import { StackNavigator } from 'react-navigation';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
const { ListView, StyleSheet, Text, TextInput, View, TouchableHighlight,
   TouchableNativeFeedback, AlertIOS, Image, Button,Linking, Dimensions} = ReactNative;


var config = {
    apiKey: "AIzaSyDLpzGQIOR8ikZ208vTO2aErrY5RTTYEoA",
    authDomain: "exam-ab147.firebaseapp.com",
    databaseURL: "https://exam-ab147.firebaseio.com",
    projectId: "exam-ab147",
    storageBucket: "",
    messagingSenderId: "119560845918"
  };
const firebaseApp=firebase.initializeApp(config);


class HomeFire extends React.Component {
  static navigationOptions = {
    title: 'My Favourites Places',
  };


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
          _key: child.key,
          title: child.val().title,
          thumbnailUrl:  child.val().thumbnailUrl,
          description:  child.val().description,
          url: child.val().url,
          latitude: child.val().latitude,
          longitude: child.val().longitude,
          telefono: child.val().telefono,
          via: child.val().via,
          orario: child.val().orario
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
    const{navigate}=this.props.navigation;
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}
        />

        <ActionButton  onPress={() => navigate('Add',this.itemsRef )} title="Add" />

      </View>
    )
  }

  _renderItem(item) {

     const _handlePress = () => {
      this.props.navigation.navigate('Info',item);
    }


    const onPress = () => {
      AlertIOS.alert(
        'Are you sure you want to remove this place?',
        null,
        [
          //{text: 'Information', onPress:(text) => this._handlePress(item) },
          {text: 'Remove', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };

        return (
          <TouchableHighlight onPress={_handlePress} onLongPress={onPress}  >
            <View style={styles.li}>
              <Text style={styles.liText}>{item.title}</Text>
              <Image source={{uri:item.thumbnailUrl }} style={styles.avatar}/>
            </View>
          </TouchableHighlight>
        );
  }
}//final class


const SimpleApp = StackNavigator({
    Home: { screen: HomeFire  },
    Info: {screen: Details },
    Mp: {screen: Mapa},
    Add: {screen: AddList},
});

Expo.registerRootComponent(SimpleApp);
