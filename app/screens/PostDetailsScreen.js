import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Feather, SimpleLineIcons } from '@expo/vector-icons';

import { timeSince } from '../utils/helpers';

export default class PostDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Post',
    headerTintColor: '#81542C',
    headerTitleStyle: {
      fontSize: 20,
    },
  });

  constructor(props) {
    super(props)

    const { postDetails } = props.navigation.state.params
    console.log('POST-DETALES-TEST-UserId:', postDetails.userId)
    console.log('POST-DETALES-TEST-PostId:', postDetails.id)
    console.log('POST-DETALES-TEST-FEED-POSTS:', postDetails)

    this.state = {
      postId: postDetails.id || null,
      item: postDetails || null,
      liked: false,
      commented: false,
    }
  }

  async componentDidMount() {
    const { postId } = this.state
    console.log('POST-DETAILS-MOUNT:', postId)
    if (postId === null) {
      Alert.alert(
        'Unable to display Post!',
        'Please try again later',
        [
          {
            text: "OK", onPress: () => {
              this.props.navigation.goBack()
            }
          }
        ],
        { cancelable: false }
      )
    } else {
      await this._fetchPost()
    }

  }

  async _fetchPost() {
    this.setState({ isLoading: true });
    const { postId } = this.state
    try {
      const response = await fetch(`https://daug-app.herokuapp.com/api/posts/${postId}`, {
        method: 'GET'
      });
      const responseJSON = await response.json();

      if (response.status === 200) {
        console.log(responseJSON);
        console.log('POST-DETALES-FETCH-POST:', responseJSON)


        this.setState({ item: responseJSON, isLoading: false })
      } else {
        const error = responseJSON.message

        console.log("failed" + error);
      }
    } catch (error) {
      console.log("failed" + error);
    }
  }

  async _fetchUser() {
    this.setState({ isLoading: true });
    console.log('POST-DETALES-FETCH-USER-ID:', this.state.item.userId)


    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.item.userId}`, {
        method: 'GET'
      });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();

        console.log(responseJSON);

        this.setState({ user: responseJSON, isLoading: false })
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log("failed" + error);
      }
    } catch (error) {
      console.log("failed" + error);
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

  renderContent = () => {
    const { navigate } = this.props.navigation
    const { item, liked, commented } = this.state

    const Component = item && item.comments ? ScrollView : View

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Component style={{ flex: 1 }}>
          <View style={styles.viewContainer} key={item}>
            {console.log("POST-DETAILS-ITEMS:", item)}
            <TouchableOpacity
              onPress={() => navigate('Profile', { user: item.user, userId: item.userId })}>
              <View style={styles.headerContainer}>
                {this._renderProfileImage(item.user.profile_image)}
                <View style={styles.headerInfoContainer}>
                  <Text>{item.user.name}</Text>
                  <Text>{item.location}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.imageContainer}>
              {this._renderImage(item.image)}
              <View style={{ flexDirection: 'row', height: 50 }}>
                <Text style={{ padding: 10 }}>{item.description}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
              <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                <SimpleLineIcons
                  name="heart"
                  size={30}
                  color='#81542C'
                  style={{ paddingHorizontal: 10 }}
                />
                <Text>{item.likes.length}</Text>
                <SimpleLineIcons
                  name="bubbles"
                  size={30}
                  color='#81542C'
                  style={{ paddingHorizontal: 10 }}
                />
                <Text>{item.comments ? item.comments.length : 0}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 10 }}>
                <Text>{timeSince(item.createdAt)}</Text>
              </View>
            </View>

            <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
              <Text style={{ color: 'black', padding: 10 }}>
                {item.comments ? item.comments.length : 'NO'} COMMENTS</Text>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {item.comments && this.renderComments()}
              </View>
            </View>
          </View>
        </Component>
      </SafeAreaView>
    );
  }

  renderCommentSection(comment, index) {
    const { navigate } = this.props.navigation    
    return (
      <View style={{ flexDirection: 'row' }} key={index}>
        <TouchableOpacity
          style={{ justifyContent: 'center', paddingHorizontal: 10 }}
          onPress={() => navigate('Profile', { user: comment.user, userId: comment.userId })}
        >
          <Image
            source={{ uri: comment.user.profile_image }}
            style={{ width: 25, height: 25, borderRadius: 25 / 2 }}
          />
        </TouchableOpacity>
        <View style={{ paddingVertical: 10 }}>
          <View>
            <Text>{comment.user.name}</Text>
            <Text>{comment.description}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderComments() {
    const { comments } = this.state.item

    return (
      <View style={styles.commentsContainer}>
        {
          comments.map((comment, index) => {
            return this.renderCommentSection(comment, index)
          })
        }
      </View>
    )
  }

  render() {
    return (
      this.renderContent()
    );
  }
}


const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
    flex: 1,
    paddingLeft: 20,
  },

  imageContainer: {
    // flex: 1,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  }
});