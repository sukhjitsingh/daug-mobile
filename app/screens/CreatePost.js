import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';

export default class CreatePost extends Component {
  static navigationOptions = {
    title: 'Create Post',
    headerStyle: { backgroundColor: '#2C7181', borderBottomWidth: 0 },
    headerTitleStyle: { fontSize: 20 },
  };

  constructor(props) {
    super(props)

    this.state = {
      userId: 7,
      newPostContent: '',
      isLoading: false
    }
  }


  async createButtonPressed() {
    this.setState({ isLoading: true })

    const { userId, newPostContent, isLoading } = this.state
    const { navigate } = this.props.navigation

    var details = {};

    if (newPostContent !== null && newPostContent.length > 0) {
      details.description = newPostContent
    }

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/${userId}/posts`, {
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
          'Post created!',
          'You have successfully signed up!',
          [
            { text: "Continue", onPress: () => navigate("SocialFeed") }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })
        Alert.alert('Create Post failed', `Unable to signup.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Sign up failed!', 'Unable to Signup. Please try again later')
    }
  }

  render() {
    const { newPostContent } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://avatars1.githubusercontent.com/u/18251293?s=400&u=1ee2922f2dd90d94bb4efbec7cc815ef510a0ad7&v=4' }}
            style={styles.avatar}
          />
          <View style={styles.subBannerContainer}>
            <Text>Moni</Text>
            <TouchableOpacity>
              <Text>
                <EvilIcons
                  name='location'
                  size={Platform.OS === 'ios' ? 12 : 15}
                />
                Add Location</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Input
            containerStyle={styles.loginInput}
            placeholder="Whats on your mind"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onChangeText={(newPostContent) => this.setState({ newPostContent })}
          />

          <Button
            text='Cancel'
            buttonStyle={{
              backgroundColor: "#81542C",
              borderColor: "#81542C",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 5,
              marginTop: 10,
            }} />

          <Button
            text='Share'
            buttonStyle={{
              backgroundColor: "#81542C",
              borderColor: "#81542C",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 5,
              marginTop: 10,
            }}
            onPress={() => this.createButtonPressed()} />
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
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
  },
  subBannerContainer: {
    flex: 2,
    paddingLeft: 10,
    paddingTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
  },

  shareButton: {
    fontSize: 18,
    padding: 5,
    borderWidth: 1,
    borderColor: '#81542C',
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 10,
  }
})
