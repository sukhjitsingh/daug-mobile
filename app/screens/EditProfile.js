import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';


export default class EditProfile extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: 'Edit Profile',
      headerStyle: { backgroundColor: '#2C7181', borderBottomWidth: 0 },
      headerTitleStyle: { fontSize: 20 },

      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
            <Text style={{ fontSize: 16 }}>Cancel</Text>
          </View>
        </TouchableOpacity>
      ),

      headerRight: (
        <TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
            <Text style={{ fontSize: 16 }}>Done</Text>
          </View>
        </TouchableOpacity>
      )
    }

  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://avatars1.githubusercontent.com/u/18251293?s=400&u=1ee2922f2dd90d94bb4efbec7cc815ef510a0ad7&v=4' }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <TouchableOpacity>
            <Text style={{ paddingTop: 10 }}>Change Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text>Name</Text>
          <Input
            containerStyle={styles.loginInput}
            value="Moni"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />
          <Text>Bio</Text>
          <Input
            containerStyle={styles.loginInput}
            value="Its the sher within."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />
          <Text>PRIVATE INFORMATION</Text>
          <Text>Email</Text>
          <Input
            containerStyle={styles.loginInput}
            value="sher@thejungle.com"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  bannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    flex: 3,
    paddingLeft: 20,
  },
})
