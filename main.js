'use strict';
import Expo from 'expo';
import { Constants, MapView } from 'expo';
import React, {Component} from 'react';
import ReactNative from 'react-native';
import * as firebase from 'firebase';
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const Mapa = require('./components/Mapa');
const styles = require('./styles.js')
import { AppRegistry,} from 'react-native';
import { StackNavigator } from 'react-navigation';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
const { ListView, StyleSheet, Text, View, TouchableHighlight,
  AlertIOS, Image, Button,Linking, Dimensions} = ReactNative;


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

//<StatusBar title="My Favourites Places" />

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}
        />


        <ActionButton onPress={this._addItem.bind(this)} title="Add" />

      </View>
    )
  }

_handlePress = (item) => {
  this.props.navigation.navigate('Info',item);
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
            this.itemsRef.push({ title: text})
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
          {text: 'Information', onPress:(text) => this._handlePress(item) },
          {text: 'Remove', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };

    const{navigate}=this.props.navigation;
    return (
       <ListItem item={item} onPress={onPress} />
    );
  }

}
//() => navigate('Info', item)

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
        <Button title="Go to MAP" onPress={() =>
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





const SimpleApp = StackNavigator({
    Home: { screen: HomeFire  },
    Info: {screen: Details },
    Mp: {screen: Mapa},
});




Expo.registerRootComponent(SimpleApp);
