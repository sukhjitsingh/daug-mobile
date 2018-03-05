import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { Button, Icon } from 'react-native-elements'

import LION_IMAGE from '../../assets/lion.png'

export default class IntroScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={styles.viewContainer}>
        <LinearGradient
          style={styles.mainContainer}
          colors={['#072C34', '#2C7181']}
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0.1, 0.8]}
        >
          <Image
            source={LION_IMAGE}
            style={styles.logoImage}
          />
          <Text style={{ fontSize: 32, fontWeight: '900', color: '#81542C' }}>Babbar Sher</Text>
          <Text style={{ fontSize: 18, fontWeight: '400', color: '#CD915B' }}>The jungle king.</Text>
        </LinearGradient>

        <LinearGradient
          style={styles.buttonContainer}
          colors={['#072C34', '#2C7181']}
          start={{ x: 0.5, y: 1.0 }}
          end={{ x: 0.5, y: 0.0 }}
          locations={[-0.3, 1.0]}
        >
          <Button
            text='Login'
            buttonStyle={{
              backgroundColor: "#81542C",
              borderRadius: 10,
              paddingHorizontal: 30,
            }}
            onPress={() => this.props.navigation.navigate('Login')}
          />

          <Button
            text='Signup'
            buttonStyle={{
              backgroundColor: "#81542C",
              borderRadius: 10,
              paddingHorizontal: 30,
            }}
            onPress={() => this.props.navigation.navigate('Signup')}
          />
        </LinearGradient>
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
    backgroundColor: '#2C7181',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#072C34',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around'
  },

  logoImage: {
    alignContent: 'center'
  }
});