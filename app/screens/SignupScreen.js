import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { MaterialCommunityIcons, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';

export default class SignupScreen extends React.Component {
  static navigationOptions = {
    title: 'Signup',
    headerStyle: { backgroundColor: '#2C7181', borderBottomWidth: 0 },
    headerTitleStyle: { fontSize: 16 }
  };

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      isLoading: false
    }
  }

  async signupButtonPressed() {
    this.setState({ isLoading: true })

    const { name, email, password } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'name': name,
      'email': email,
      'password': password
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.setState({ isLoading: false })
        Alert.alert(
          'Signed Up!',
          'You have successfully signed up!',
          [
            { text: "Continue", onPress: () => navigate("Home") }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })
        Alert.alert('Sign up failed!', `Unable to signup.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Sign up failed!', 'Unable to Signup. Please try again later')
    }
  }

  render() {
    const { name, email, password } = this.state
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.container}>
          <View style={styles.textInputContainer}>
            <Input
              containerStyle={styles.loginInput}
              placeholder="Name"
              placeholderTextColor="white"
              value={this.name}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => this.refs.txtEmail.focus()}
              leftIcon={
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color='white'
                />
              }
              onChangeText={(name) => this.setState({ name })}
            />

            <Input
              containerStyle={styles.loginInput}
              placeholder="Email"
              placeholderTextColor="white"
              value={this.email}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => this.refs.txtPwd.focus()}
              leftIcon={
                <MaterialCommunityIcons
                  name="email"
                  size={24}
                  color='white'
                />
              }
              ref={"txtEmail"}
              onChangeText={(email) => this.setState({ email })}
            />

            <Input
              containerStyle={styles.loginInput}
              placeholder="Password"
              placeholderTextColor="white"
              value={this.password}
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
              ref={"txtPwd"}
              onChangeText={(password) => this.setState({ password })}
            />

            <Button
              text='Signup'
              buttonStyle={{
                backgroundColor: "#81542C",
                paddingHorizontal: 40,
              }}
              containerStyle={{ marginTop: 20 }}
              onPress={() => this.signupButtonPressed()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
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
