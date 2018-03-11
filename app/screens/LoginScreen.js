import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { MaterialCommunityIcons, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Account Login',
    headerStyle: { backgroundColor: '#2C7181', borderBottomWidth: 0 },
    headerTitleStyle: { fontSize: 16 }
  };


  render() {
    function isEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    return (
      <View style={styles.container}>

        <View style={styles.textInputContainer}>
          <Input
            containerStyle={styles.loginInput}
            placeholder="Email"
            placeholderTextColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            leftIcon={
              <MaterialCommunityIcons
                name="email"
                size={24}
                color='white'
              />
            }
          />

          <Input
            containerStyle={styles.loginInput}
            placeholder="Password"
            placeholderTextColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            leftIcon={
              <MaterialCommunityIcons
                name='lock'
                size={24}
                color='white'
              />
            }
          />

          <Button
            text='Login'
            containerStyle={{ marginTop: 20 }}
            buttonStyle={{
              backgroundColor: "#81542C",
              borderRadius: 10,
              paddingHorizontal: 40,
            }}
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C7181',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInputContainer: {
    height: 150,
    justifyContent: 'space-between'
  },

  loginInput: {
  }
});
