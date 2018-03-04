import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IntroScreen from './app/screens/IntroScreen'
import LoginScreen from './app/screens/LoginScreen'
import ProfileScreen from './app/screens/ProfileScreen'
import SignupScreen from './app/screens/SignupScreen'
import SocialFeedScreen from './app/screens/SocialFeedScreen'


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      screen: 'signup'
    }
  }


  render() {
    const { screen } = this.state

    if (screen === 'login') {
      return <LoginScreen/>
    } else if (screen === 'signup') {
      return <SignupScreen/>
    } else if (screen === 'profile') {
      return <ProfileScreen/>
    } else if (screen === 'socialFeed') {
      return <SocialFeedScreen/>
    } else {
      return <IntroScreen />
    }
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
