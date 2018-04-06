import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView, Alert, AsyncStorage } from 'react-native';
import { Feather, SimpleLineIcons, Ionicons } from '@expo/vector-icons';

import { timeSince } from '../utils/helpers';

export default class SocialFeedScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    const userId = props.navigation.state.params && props.navigation.state.params.userId

    this.state = {
      isFeedLoading: true,
      feedPosts: null,
      liked: false,
      isCommented: false,
      userId: userId || null,
    }
  }

  async componentDidMount() {

    this.getFeedPosts()

    this.getUserId()
      .then(res => {
        res = JSON.parse(res)
        this.setState({ userId: res.id })
        this.getFeedPosts()
      })
      .catch(err => {
        alert("An error occurred", err)
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

  async fetchUserData() {
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

  async getFeedPosts() {
    try {
      const response = await fetch(`https://daug-app.herokuapp.com/api/feed/`, {
        method: 'GET'
      });
      const responseJSON = await response.json();

      if (response.status === 200) {
        this.setState({
          isFeedLoading: false,
          feedPosts: responseJSON
        })
      } else {
        const error = responseJSON.message

        console.log("Server request failed " + error);
      }
    } catch (error) {
      console.log("Server is down " + error);
    }
  }

  _renderImage = (image) => {
    if (image) {
      return (
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: 300 }}
        />
      )
    } else {

    }
  }

  _renderProfileImage = (image) => {
    if (image) {
      return (
        <Image
          source={{ uri: image }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      )
    } else {

    }
  }

  async _postLike(postId) {
    console.log("USER-STATE:", this.state.userId)


    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/posts/${postId}/like/${this.state.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: null
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.getFeedPosts()
        this.setState({ liked: true })

        Alert.alert(
          'You liked this post!',
          '',
          [
            {
              text: "Dismiss", onPress: () => {
                console.log("liked!")
              }
            }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors, comment: null })

        Alert.alert('1 Unable to like post! ', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, error, comment: null })

      Alert.alert('1.2 Unable to like post! ', `${error}`)
    }
  }

  async _postUnLike(postId) {

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/posts/${postId}/unlike/${this.state.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: null
      });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.getFeedPosts()
        this.setState({ liked: false })

        Alert.alert(
          'You unliked this post!',
          '',
          [
            {
              text: "Dismiss", onPress: () => {
                console.log("unliked!")

              }
            }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors, comment: null })

        Alert.alert('2 Unable to unlike post! ', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, error, comment: null })

      Alert.alert('2.1 Unable to unlike post! ', `${error}`)
    }
  }

  renderContent = ({ item }) => {
    const { navigate } = this.props.navigation
    const { liked, isCommented } = this.state
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => navigate('Profile', { user: item.user, userId: item.userId, isHeaderShow: true })}
        >
          <View style={styles.headerContainer}>
            {this._renderProfileImage(item.user.profile_image)}
            <View style={styles.headerInfoContainer}>
              <Text>{item.user.name}</Text>
              <Text>{item.location}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => navigate('PostDetailsScreen', { postId: item.id, postDetails: item })}
          >
            {this._renderImage(item.image)}
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', height: 50 }}>
            <Text style={{ padding: 10 }}>{item.description}</Text>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', height: 50 }}>
          <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name={liked ? "md-heart" : 'md-heart-outline'}
              size={30}
              color={liked ? '#81542C' : null}
              style={{ paddingHorizontal: 10 }}
              onPress={() => liked === false ? this._postLike(item.id) : this._postUnLike(item.id)}
            />
            <Text>{item.likes.length}</Text>
            <SimpleLineIcons
              name="bubbles"
              size={30}
              color={isCommented ? '#81542C' : null}
              style={{ paddingHorizontal: 10 }}
            />
            <Text>{item.comments ? item.comments.length : 0}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 10 }}>
            <Text>{timeSince(item.createdAt)}</Text>
          </View>
        </View>
      </View>

    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <FlatList style={{ backgroundColor: 'gray', flex: 1 }}
            data={this.state.feedPosts}
            style={styles.m}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => this.renderContent({ item })}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
  },
  headerInfoContainer: {
    paddingLeft: 20,
  },

  imageContainer: {
    flex: 1,
  }
});
