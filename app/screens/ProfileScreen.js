import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, SafeAreaView, TouchableOpacity, Alert, AsyncStorage, DeviceEventEmitter, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerVisible: navigation.state.params ? navigation.state.params.isHeaderShow : false,
      title: 'Profile',
      headerTintColor: '#81542C',
      headerTitleStyle: {
        fontSize: 20,
      }
    }
  }

  constructor(props) {
    super(props)
    const user = props.navigation.state.params && props.navigation.state.params.user
    const userId = props.navigation.state.params && props.navigation.state.params.userId
    const isHeaderShow = props.navigation.state.params && props.navigation.state.params.isHeaderShow

    this.state = {
      user: user || null,
      userId: userId || null,
      isLoading: false,
      isHeaderShow: isHeaderShow || false
    }
  }

  componentDidMount() {
    if (this.state.userId === null) {
      this.getUserId()
        .then(res => {
          res = JSON.parse(res)
          this.setState({ userId: res.id })
          this.state.user === null && this.getUserData()
        })
        .catch(err => {
          alert("An error occurred")
        });
    } else {
      this.getUserData()

      this.getUserId()
        .then(response => {
          response = JSON.parse(response)
          this.setState({ post_detail_home_user_id: response.id })
        })
        .catch(err => {
          console.error(err)
          Alert.alert("An error occurred")
        })
    }
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

  componentWillMount() {
    DeviceEventEmitter.addListener('user_profile_updated', (e) => {
      this.getUserData()
    })
  }

  async getUserData() {
    this.setState({ isLoading: true })

    try {
      const response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.userId}`, {
        method: 'GET'
      });
      const responseJSON = await response.json();

      if (response.status === 200) {
        this.setState({
          user: responseJSON,
          isLoading: false,
        })
      } else {
        const error = responseJSON.message

        console.log("Server request failed " + error);
      }
    } catch (error) {
      console.log("Server is down " + error);
    }
  }

  async _followUser() {
    const { post_detail_home_user_id, userId } = this.state

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/${post_detail_home_user_id}/follow/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: null
      });

      let responseJSON = null;

      if (response.status === 201) {
        responseJSON = response.json();

        console.log(responseJSON);

        this.getUserData();
        this.setState({ following: true });

        Alert.alert(
          'Following user!',
          '',
          [
            {
              text: "Dismiss", onPress: () => {
                console.log("User followed!");
              }
            }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message;

        console.log(responseJSON);

        this.setState({ isLoading: false, errors: responseJSON.errors, following: false });

        Alert.alert('1. Unable to follow user', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, error, following: false })

      Alert.alert('1.2 Unable to follow user', `${error}`)
    }
  }

  _renderBannerImage = (image) => {
    if (image) {
      return (
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: 200 }}
        />
      )
    } else {
      return (
        <View style={{ marginTop: 40 }}>

        </View>
        // <Image style={{ width: '100%', height: 200 }}
        //   source={require('../../assets/profile.png')}
        // />
      )
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

  renderContent = () => {
    const { user } = this.state
    { console.log("USER-INFO:", user) }


    // const Component = user && user.posts ? ScrollView : View

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.headerImageContainer}>
              {this._renderBannerImage(user && user.banner_image)}
              <View style={styles.profileInfoContainer}>
                <View style={styles.profileContainer}>
                  {this._renderProfileImage(user && user.profile_image)}
                </View>
                <View style={{ flex: 3 }}>

                  <View style={styles.statusViewContainer}>
                    <View style={styles.statusInfoContainer}>
                      <Text> {user && user.posts ? user.posts.length : 0}</Text>
                      <Text> posts </Text>
                    </View>
                    <View style={styles.statusInfoContainer}>
                      <Text> {user && user.followers ? user.followers.length : 0} </Text>
                      <Text> followers </Text>
                    </View>
                    <View style={styles.statusInfoContainer}>
                      <Text> {user && user.following ? user.following.length : 0} </Text>
                      <Text> following </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, }}>
                    <Button
                      text='Edit Profile'
                      // clear={true}
                      buttonStyle={{
                        backgroundColor: "#81542C",
                        borderColor: "#81542C",
                        borderWidth: 1,
                        paddingHorizontal: 5,
                      }}
                      // containerStyle={{ marginTop: 10 }}
                      onPress={() => this.props.navigation.navigate('EditProfile', { user: user })}
                    />
                    <Button
                      text={this.state.following ? 'Following' : 'Follow'}
                      onPress={() => this._followUser()}
                      buttonStyle={{
                        backgroundColor: "#81542C",
                        borderColor: "#81542C",
                        borderWidth: 1,
                        paddingHorizontal: 5,
                      }}
                    />
                  </View>
                </View>

              </View>
            </View>

            <View style={styles.descriptionContainer}>
              <Text>{user && user.name}</Text>
              <Text>{user && user.bio}</Text>
            </View>

            <View style={styles.footerContainer}>
              <Text style={{ color: 'black', padding: 10 }}>
                {user && user.posts ? user.posts.length : 'NO'} POSTS</Text>
              <View style={styles.postsContainer}>
                {user && user.posts && this.renderPosts()}
              </View>
              <Button
                text='Logout'
                buttonStyle={{
                  backgroundColor: "#81542C",
                  borderColor: "#81542C",
                  borderWidth: 1,
                  paddingHorizontal: 5,
                }}
                // containerStyle={{ marginTop: 20 }}
                onPress={() => this.props.navigation.navigate('Intro')}
              />
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>

    )
  }

  renderPostSection(post, index) {
    return (
      <View style={[{ width: DEVICE_WIDTH / 3, height: DEVICE_WIDTH / 3 }]} key={index}>
        <TouchableOpacity
          style={{ padding: 4 }}
        // onPress={() => this.props.navigation.navigate('PostDetailsScreen', { postDetails: post })}
        >
          <Image
            source={{ uri: post && post.image || "" }}
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderPosts() {
    const { posts } = this.state.user
    console.log("PROFILE POSTS:", posts)
    return (
      posts.map((post, index) => {
        return this.renderPostSection(post, index)
      })
    )
  }

  render() {
    return (
      this.renderContent()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },

  headerImageContainer: {
    // height: 200,
    // width: '100%',
    // zIndex: -10,
  },

  profileInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#EEEEEE',
    paddingBottom: 10,
    zIndex: 0,
  },

  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    elevation: 5,
    zIndex: 1,    
    marginLeft: 10,
  },
  statusViewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statusInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  descriptionContainer: {
    paddingLeft: 10,
    backgroundColor: '#EEEEEE'
  },

  footerContainer: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  postsContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    flexWrap: 'wrap',
    // alignItems: 'flex-start',
  }
});
