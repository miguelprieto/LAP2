import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text, Image, Button} = ReactNative;

class ListItem extends Component {
  render() {
    //const {state} = this.props.navigation;
    return (
      <TouchableHighlight onPress={this.props.onPress} >
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.title}</Text>
          <Image source={{uri:this.props.item.thumbnailUrl }} style={styles.avatar}/>
        </View>
      </TouchableHighlight>
    );
  }
}
module.exports = ListItem;

/*
require('./myIcon.png')
  */
