import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Constants, MapView } from 'expo';

class Mapa extends Component {
	static navigationOptions = {
		title: 'Ubicacion',
	};

  render() {
		const {state} = this.props.navigation;
    const { width, height } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          zoomEnabled
          style={{ width, height : height - 200 }}
					initialRegion={{
			       latitude: 37.525729,
			       longitude: 15.072030,
			       latitudeDelta: 0.1,
			       longitudeDelta: 0.1
			     }}

          >
          <MapView.Marker
            title={state.params.title}
            coordinate={{ latitude: state.params.latitude, longitude: state.params.longitude }}
            pinColor="blue"
          />

          </MapView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  }
});
module.exports = Mapa;
