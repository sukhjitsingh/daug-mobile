import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-elements';

import { SOCIAL_FEED_MOCK_DATA } from '../utils/constants'

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      screen: 'profile'
    }
  }

  renderContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.headerImageContainer}>
          <Image
            source={{ uri: 'https://avatars1.githubusercontent.com/u/18251293?s=400&u=1ee2922f2dd90d94bb4efbec7cc815ef510a0ad7&v=4' }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        <View style={styles.profileInfoContainer}>
          <View style={styles.bannerContainer}>
            <Image
              source={{ uri: 'https://avatars1.githubusercontent.com/u/18251293?s=400&u=1ee2922f2dd90d94bb4efbec7cc815ef510a0ad7&v=4' }}
              style={{ width: 100, height: 100, borderRadius: 50, marginTop: -50, marginLeft: 10 }}
            />

          </View>
          <View style={styles.bannerInfoContainer}>
            <Text> 9 posts </Text>
            <Text> 450 followers </Text>
            <Text> 270 following </Text>
            <Button
              text='Edit Profile'
              clear={true}
              containerStyle={{ marginTop: 10 }}
            />
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text>Name</Text>
          <Text>Description...</Text>
        </View>

        <View style={styles.feedContainer}>
          <Button
            text='Login'
            clear={true}
            containerStyle={{ marginTop: 20 }}
          />
        </View>

      </View>
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
    height: 200,
    width: '100%',
  },

  profileInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'gray'
  },

  bannerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  bannerInfoContainer: {
    flex: 2,
    justifyContent: 'flex-end',
  },

  descriptionContainer: {
    paddingLeft: 10,
    backgroundColor: 'yellow'
  },

  feedContainer: {
    flex: 1,
    backgroundColor: 'gray'
  }
});
