import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage, ImageEditor, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';

export default class CreatePost extends Component {
  static navigationOptions = {
    title: 'Create Post',
    headerStyle: { borderBottomWidth: 0 },
    headerTitleStyle: { color: '#81542C', fontSize: 20 },
  };

  constructor(props) {
    super(props)

    this.state = {
      newPostContent: '',
      image: null,
      isLoading: false
    }
  }

  componentDidMount() {
    this.getUserId()
      .then(res => {
        res = JSON.parse(res)
        this.setState({ user: res })
      })
      .catch(err => {
        console.error(err);
        alert("An error occurred")
      });
  }

  getUserId = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('user')
        .then(res => {
          if (res !== null) {
            resolve(res);
          } else {
            resolve(null);
          }
        })
        .catch(err => reject(err));
    });
  }


  async createButtonPressed() {
    this.setState({ isLoading: true })

    const { userId, newPostContent, isLoading, image } = this.state
    const { navigate } = this.props.navigation

    let details = {};

    if (image !== null) {
      details.image = image
    }

    if (newPostContent !== null && newPostContent.length > 0) {
      details.description = newPostContent
    }

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.user.id}/posts`, {
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
        Alert.alert('Create Post failed', `Unable to share post.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Create Post failed', 'Unable to share post. Please try again later')
    }
  }

  _renderProfileImage = (image) => {
    if (image) {
      return (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      )
    } else {
      return (
        <Image
          source={require('../../assets/profile.png')}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      )
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      console.log('Profile Image cancelled');
      return;
    }

    let resizedUri = await new Promise((resolve, reject) => {
      ImageEditor.cropImage(result.uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: { width: result.width, height: result.height },
          resizeMode: 'contain',
        },
        (uri) => resolve(uri),
        () => reject(),
      );
    });

    const file = {
      uri: resizedUri,
      name: `user_${this.state.user.id}_profile_image_${new Date().getTime()}.png`,
      type: "image/png"
    }

    const options = {
      keyPrefix: "uploads/",
      bucket: "daug",
      region: "us-east-1",
      accessKey: "AKIAIKG2UJ7AHBKJ5N2Q",
      secretKey: "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",
      successActionStatus: 201
    }

    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");

      console.log(response.body);

      this.setState({ image: response.body.postResponse.location });
    });
  };

  render() {
    const { newPostContent, user } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          {this._renderProfileImage(user && user.profile_image)}
          <View style={styles.subBannerContainer}>
            <Text style={{ padding: 5 }}>{user && user.name}</Text>
            <TouchableOpacity>
              <Text>
                <Ionicons
                  name='md-pin'
                  size={Platform.OS === 'ios' ? 18 : 20}
                />
                Add Location</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => this._pickImage()}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons
                name="md-image"
                size={40}
                color='#81542C'
                style={{ paddingHorizontal: 10, justifyContent: 'center', }}
              />
            </View>
            <Text style={{ paddingTop: 10 }}>Upload from Gallary</Text>
          </TouchableOpacity>
          <Input
            containerStyle={styles.contentInput}
            placeholder="Whats on your mind"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onChangeText={(newPostContent) => this.setState({ newPostContent })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text='Cancel'
            buttonStyle={styles.buttonStyle}
          />
          <Button
            text='Share'
            buttonStyle={styles.buttonStyle}
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
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
  },
  subBannerContainer: {
    justifyContent: 'center',
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
    justifyContent: 'center',
    paddingVertical: 10,
  },
  contentInput: {
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  buttonStyle: {
    backgroundColor: "#81542C",
    borderColor: "#81542C",
    borderWidth: 1,
    paddingHorizontal: 5,
    marginTop: 10,
  }
})
