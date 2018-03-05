import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements'

import LION_IMAGE from '../../assets/lion.png'

export default class IntroScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={styles.viewContainer}>
        <View style={styles.mainContainer}>
          <Image
            source={LION_IMAGE}
            style={styles.logoImage}
          />
          <Text>Hail the King</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Login')}
            icon={
              <Icon
                name='login'
                type='simple-line-icon'
                color='white' />
            }
            text='Login' />

          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Signup')}
            icon={
              <Icon
                name='logout'
                type='simple-line-icon'
                color='white' />
            }
            text='Signup' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#341F0D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#81542C',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: '#2C7181'
  },

  logoImage: {
    alignContent: 'center'
  }
});