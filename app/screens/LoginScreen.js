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
            clear={true}
            containerStyle={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>

        <TouchableOpacity

        />

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
