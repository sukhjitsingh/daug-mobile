import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, SafeAreaView, TouchableOpacity, AsyncStorage, DeviceEventEmitter} from 'react-native';
import { Button } from 'react-native-elements';

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
        <View style={{ width: '100%', height: 200 }}>

        </View>
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

    }
  }

  renderContent = () => {
    const { user } = this.state
    { console.log("USER-INFO:", user) }


    // const Component = user.posts ? ScrollView : View

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.headerImageContainer}>
              {this._renderBannerImage(user && user.banner_image)}
              <View style={styles.profileInfoContainer}>
                <View style={styles.bannerContainer}>
                  {this._renderProfileImage(user && user.profile_image)}
                </View>

                <View style={styles.bannerViewContainer}>
                  <View style={styles.bannerInfoContainer}>
                    <Text> {user && user.posts ? user.posts.length : 0}</Text>
                    <Text> {user && user.followers ? user.followers.length : 0} </Text>
                    <Text> {user && user.following ? user.following.length : 0} </Text>
                  </View>
                  <View style={styles.bannerInfoContainer}>
                    <Text> posts </Text>
                    <Text> followers </Text>
                    <Text> following </Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, }}>
                    <Button
                      text='Edit Profile'
                      // clear={true}
                      buttonStyle={{
                        backgroundColor: "#81542C",
                        borderColor: "#81542C",
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: 5,
                      }}
                      // containerStyle={{ marginTop: 10 }}
                      onPress={() => this.props.navigation.navigate('EditProfile', { user: user })}
                    />
                    <Button
                      text='Logout'
                      buttonStyle={{
                        backgroundColor: "#81542C",
                        borderColor: "#81542C",
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: 5,
                      }}
                      // containerStyle={{ marginTop: 20 }}
                      onPress={() => this.props.navigation.navigate('Intro')}
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
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>

    )
  }

  renderPostSection(post, index) {
    return (
      <View style={{}} key={index}>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() => this.props.navigation.navigate('')}
        >
          <Image
            source={{ uri: post && post.image || "" }}
            style={{ width: 100, height: 100, borderRadius: 100 / 4 }}
          />
        </TouchableOpacity>
        {/* <View style={{ paddingVertical: 10 }}>
          <View>
            <Text>{post.location}</Text>
            <Text>{post.caption}</Text>
          </View>
        </View> */}
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
      // <ScrollView>
      //   <FlatList style={{ backgroundColor: 'gray', flex: 1 }}
      //     data={SOCIAL_FEED_MOCK_DATA}
      //     style={styles.m}
      //     renderItem={({ item }) => this.renderContent({ item })}
      //   />
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },

  headerImageContainer: {
    // height: 200,
    // width: '100%',
    // zIndex: -10,
  },

  profileInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#EEEEEE',
    paddingBottom: 10,
    // zIndex: 0,
  },

  bannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    elevation: 5,
    backgroundColor: 'transparent'
  },
  bannerViewContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
  bannerInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
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
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
});
