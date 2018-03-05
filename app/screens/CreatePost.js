import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class EditProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://avatars1.githubusercontent.com/u/18251293?s=400&u=1ee2922f2dd90d94bb4efbec7cc815ef510a0ad7&v=4' }}
            style={{ width: 100, height: 100, borderRadius: 50, zIndex: 5 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  bannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
  },
})
