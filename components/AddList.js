import React, { Component } from 'react';
import { Card, CardSection, Input, Button2 } from '../components/common';
//import DatePicker from 'react-native-datepicker'
import { StackNavigator } from 'react-navigation';
import { View, Image, TouchableOpacity } from 'react-native';
import { ImagePicker } from 'expo';
import firebase from 'firebase';

class AddList extends Component {
  static navigationOptions = {
    title: "Adding to List",
    headerBackTitle: 'null'
  }


  state = {
    title:"",
    thumbnailUrl:'http://www.hotelondaverde.it/img/image_27.jpg',
    description:"",
    orario:"",
    via:"",
    telefono:"",
    url:"",
    latitude: 37.525729,
    longitude:15.072030
  }

 todoCreate = ({ title, thumbnailUrl, description,orario, via, telefono, url }) =>{
   firebase.database().ref(`/items`)
   .push({ title, thumbnailUrl, description,orario, via, telefono, url })
    this.props.navigation.goBack();
}





  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ thumbnailUrl: result.uri });
    }
  };

  render() {
    const {state} = this.props.navigation;

    return (
      <View>
        <Card>
          <CardSection>
            <Input
              label="Title"
              placeholder="Cosa vuoi fare oggi"
              value={this.state.title}
              onChangeText={text => this.setState({ title: text })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Descrip."
              placeholder="Description"
              value={this.state.description}
              onChangeText={text => this.setState({ description: text })}
            />
          </CardSection>


          <CardSection>
            <Input
              label="Via"
              placeholder="Indirizzo"
              value={this.state.via}
              onChangeText={text => this.setState({ via: text })}
            />
          </CardSection>

          <CardSection>
          <Input
            label="Tel"
            placeholder="Telefono"
            value={this.state.telefono}
            onChangeText={text => this.setState({ telefono: text })}
          />
          </CardSection>

          <CardSection>
          <Input
            label="Orario"
            placeholder="orario"
            value={this.state.orario}
            onChangeText={text => this.setState({ orario: text })}
          />
          </CardSection>

          <CardSection>
          <Input
            label="Website"
            placeholder="url"
            value={this.state.url}
            onChangeText={text => this.setState({ url: text })}
          />
          </CardSection>

          <CardSection>
            <TouchableOpacity
              style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  flex: 1
                }}
              onPress={this._pickImage}
              >
              <Image
                source={{ uri: this.state.thumbnailUrl }}
                // resizeMode="cover"
                style={{ height: 150, width: "100%" }}
              />
            </TouchableOpacity>
          </CardSection>

          <CardSection>
            <Button2 children={"Add"} onPress={() => this.todoCreate({
                title: this.state.title,
                thumbnailUrl: this.state.thumbnailUrl,
                description: this.state.description,
                orario: this.state.orario,
                telefono: this.state.telefono,
                url: this.state.url,
                via: this.state.via
              })}>
            </Button2>
          </CardSection>

        </Card>
      </View>
    )
  }
}

//navigateBack: () => this.props.navigation.goBack()
module.exports = AddList;
