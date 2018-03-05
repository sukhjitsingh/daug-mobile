import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';

import { SOCIAL_FEED_MOCK_DATA } from '../utils/constants'

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props)

    this.state = {
      screen: 'profile'
    }
  }

  renderContent = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
                style={{ width: 100, height: 100, borderRadius: 50, zIndex: 5 }}
              />
            </View>

            <View style={styles.bannerViewContainer}>
              <View style={styles.bannerInfoContainer}>
                <Text> 9 </Text>
                <Text> 450 </Text>
                <Text> 270 </Text>
              </View>
              <View style={styles.bannerInfoContainer}>
                <Text> posts </Text>
                <Text> followers </Text>
                <Text> following </Text>
              </View>

              <Button
                text='Edit Profile'
                clear={true}                
                buttonStyle={{
                  borderColor: "#81542C",
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                }}
                containerStyle={{ marginTop: 10 }}
                onPress={() => this.props.navigation.navigate('EditProfile')}
              />
            </View>

          </View>

          <View style={styles.descriptionContainer}>
            <Text>Name</Text>
            <Text>Description...</Text>
          </View>

          <View style={styles.feedContainer}>
            <Button
              text='Logout'
              clear={true}
              buttonStyle={{
                borderColor: "#81542C",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 10,
              }}
              containerStyle={{ marginTop: 20 }}
              onPress={() => this.props.navigation.navigate('Intro')}
            />
          </View>

        </View>
      </SafeAreaView>

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
    backgroundColor: 'gray',
    paddingBottom: 10,
  },

  bannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
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
    backgroundColor: 'yellow'
  },

  feedContainer: {
    flex: 1,
    backgroundColor: 'gray'
  }
});
