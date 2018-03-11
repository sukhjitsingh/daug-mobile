import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather, SimpleLineIcons } from '@expo/vector-icons';

// import { SOCIAL_FEED_MOCK_DATA } from '../utils/constants'

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

    this.state = {
      member: postDetails,
      liked: false,
      commented: false,
    }
  }

  renderContent = () => {
    const { navigate } = this.props.navigation
    const { member, liked, commented } = this.state

    const Component = member.comments ? ScrollView : View

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Component style={{ flex: 1 }}>
          <View style={styles.viewContainer} key={member}>

            <TouchableOpacity
              onPress={() => navigate('Profile', { user: member.user })}>
              <View style={styles.headerContainer}>
                <Image
                  source={{ uri: member.image }}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <View style={styles.headerInfoContainer}>
                  <Text>{member.user.name}</Text>
                  <Text>{member.location}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: member.image }}
                style={{ width: '100%', height: 300 }}
              />
              <View style={{ flexDirection: 'row', height: 50 }}>
                <Text style={{ padding: 10 }}>{member.caption}</Text>
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
                <Text>{member.likes}</Text>
                <SimpleLineIcons
                  name="bubbles"
                  size={30}
                  color='#81542C'
                  style={{ paddingHorizontal: 10 }}
                />
                <Text>{member.comments ? member.comments.length : 0}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 10 }}>
                <Text>{member.date}</Text>
              </View>
            </View>

            <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
              <Text style={{ color: 'black', padding: 10 }}>
                {member.comments ? member.comments.length : 'NO'} COMMENTS</Text>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {member.comments && this.renderComments()}
              </View>
            </View>
          </View>
        </Component>
      </SafeAreaView>
    );
  }

  renderCommentSection(comment, index) {
    return (
      <View style={{ flexDirection: 'row' }} key={index}>
        <TouchableOpacity
          style={{ justifyContent: 'center', paddingHorizontal: 10 }}
        >
          <Image
            source={{ uri: comment.user.image }}
            style={{ width: 25, height: 25, borderRadius: 25 / 2 }}
          />
        </TouchableOpacity>
        <View style={{ paddingVertical: 10 }}>
          <View>
            <Text>{comment.user.name}</Text>
            <Text>{comment.content}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderComments() {
    const { comments } = this.state.member

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