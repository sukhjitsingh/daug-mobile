import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ImageEditor, DeviceEventEmitter } from 'react-native';
import { Input } from 'react-native-elements';
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';



export default class EditProfile extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const params = navigation.state.params || {};
    console.log(params.updateProfile)

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
        <TouchableOpacity
          onPress={params.updateProfile}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
            <Text style={{ fontSize: 16 }}>Update</Text>
          </View>
        </TouchableOpacity>
      )
    }

  };

  constructor(props) {
    super(props)
    const { user } = props.navigation.state.params
    console.log("EDIT-PROFILE", user)

    this.state = {
      user: user,
      userName: user.name,
      userBio: user.bio,
      userProfileImage: user.profile_image,
      isLoading: false
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this.updateProfile });
  }

  updateProfile = async () => {
    this.setState({ isLoading: true })
    const { user, userName, userBio, userProfileImage } = this.state
    let details = {
      'name': userName,
      'bio': userBio,
      'profile_image': userProfileImage
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      const response = await fetch(`https://daug-app.herokuapp.com/api/users/${user.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });
      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();

        this.setState({ isLoading: false })

        Alert.alert(
          'Profile updated!',
          '',
          [
            {
              text: "Dismiss", onPress: () => {
                DeviceEventEmitter.emit('user_profile_updated', {})
                // this.props.navigation.goBack()
              }
            }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })

        Alert.alert('Unable to update profile!', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      Alert.alert('Unable to update profile!', `${error}`)
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

    }
  }

  pickImage = async () => {
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
      name: `user_${this.state.id}_profile_image_${new Date().getTime()}.png`,
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

      this.setState({ userProfileImage: response.body.postResponse.location });
    });
  };

  render() {
    const { user, userName, userBio, userProfileImage } = this.state
    console.log("EDIT-PROFILE-RENDER", this.state.user)
    return (
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          {this._renderProfileImage(userProfileImage)}
          <TouchableOpacity onPress={() => this.pickImage()} >
            <Text style={{ paddingTop: 10 }}>Change Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text>Name</Text>
          <Input
            containerStyle={styles.loginInput}
            value={userName}
            onChangeText={userName => this.setState({ userName })}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />
          <Text>Bio</Text>
          <Input
            containerStyle={styles.loginInput}
            value="Its the sher within."
            onChangeText={userBio => this.setState({ userBio })}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />
          <Text>PRIVATE INFORMATION</Text>
          <Text>Email</Text>
          <Input
            containerStyle={styles.loginInput}
            value={user.email}
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
