import React, { Component } from 'react';
import { View, Text, AsyncStorage  } from 'react-native';

export default class AuthLoadingScreen extends Component {
  constructor(props){
    super(props);
    this.isUserLoggedIn()
  }

  isUserLoggedIn = async () => {
    let user = await AsyncStorage.getItem('user');

    if(user){
      user = JSON.parse(user)
    }
    this.props.navigation.navigate(user ? 'Home' : 'Intro')
  }
  
  render() {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }
}