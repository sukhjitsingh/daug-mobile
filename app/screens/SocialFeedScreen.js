import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather, SimpleLineIcons } from '@expo/vector-icons';


import { SOCIAL_FEED_MOCK_DATA } from '../utils/constants'

export default class SocialFeedScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
  }

  renderContent = ({ item }) => {
    const { navigate } = this.props.navigation
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.mainContainer}>

          <TouchableOpacity
            onPress={() => navigate('Profile', { user: item.user, isHeaderShow: true })}
          >
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
              <View style={styles.headerInfoContainer}>
                <Text>{item.user.name}</Text>
                <Text>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => navigate('PostDetailsScreen', { postDetails: item })}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: '100%', height: 300 }}
              />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', height: 50 }}>
              <Text style={{ padding: 10 }}>{item.caption}</Text>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', height: 50 }}>
            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
              <SimpleLineIcons
                name="heart"
                size={30}
                color='#81542C'
                style={{ paddingHorizontal: 10 }}
              />
              <Text>{item.likes}</Text>
              <SimpleLineIcons
                name="bubbles"
                size={30}
                color='#81542C'
                style={{ paddingHorizontal: 10 }}
              />
              <Text>{item.comments ? item.comments.length : 0}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 10 }}>
              <Text>{item.date}</Text>
            </View>

            {/* <SimpleLineIconsÍ
              name="paper-plane"
              size={30}
              color='#81542C'
            /> */}
          </View>
        </View>
      </SafeAreaView>

    );
  }

  render() {
    return (
      <ScrollView>
        <FlatList style={{ backgroundColor: 'gray', flex: 1 }}
          data={SOCIAL_FEED_MOCK_DATA}
          style={styles.m}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => this.renderContent({ item })}
        />
      </ScrollView>
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
