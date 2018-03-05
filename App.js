import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IntroScreen from './app/screens/IntroScreen'
import LoginScreen from './app/screens/LoginScreen'
import ProfileScreen from './app/screens/ProfileScreen'
import SignupScreen from './app/screens/SignupScreen'
import SocialFeedScreen from './app/screens/SocialFeedScreen'

import RootNavigator from './app/navigation/RootNavigator'


export default class App extends React.Component {
  
  render() {
    return <RootNavigator />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
