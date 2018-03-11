import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

import { SOCIAL_FEED_MOCK_DATA } from '../utils/constants'

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
    const isHeaderShow = props.navigation.state.params && props.navigation.state.params.isHeaderShow

    this.state = {
      user: user || SOCIAL_FEED_MOCK_DATA[0].user,
      isHeaderShow: isHeaderShow || false
    }
  }

  renderContent = () => {
    const { user } = this.state

    const Component = user.posts ? ScrollView : View

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Component style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.headerImageContainer}>
              <Image
                source={{ uri: user.banner }}
                style={{ width: '100%', height: 200 }}
              />
              <View style={styles.profileInfoContainer}>
                <View style={styles.bannerContainer}>
                  <Image
                    source={{ uri: user.image }}
                    style={{ width: 100, height: 100, borderRadius: 50, }}
                  />
                </View>

                <View style={styles.bannerViewContainer}>
                  <View style={styles.bannerInfoContainer}>
                    <Text> {user.posts ? user.posts.length : 0}</Text>
                    <Text> {user.followers} </Text>
                    <Text> {user.following} </Text>
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
                      onPress={() => this.props.navigation.navigate('EditProfile')}
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
              <Text>{user.name}</Text>
              <Text>{user.bio}</Text>
            </View>

            <View style={styles.footerContainer}>
              <Text style={{ color: 'black', padding: 10 }}>
                {user.posts ? user.posts.length : 'NO'} POSTS</Text>
              <View style={styles.postsContainer}>
                {user.posts && this.renderPosts()}
              </View>
            </View>

          </View>
        </Component>
      </SafeAreaView>

    )
  }

  renderPostSection(post, index) {   
    return (
      <View style={{}} key={index}>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={ () => this.props.navigation.navigate('')}
        >
          <Image
            source={{ uri: post.image }}
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
