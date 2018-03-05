import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import { SOCIAL_FEED_MOCK_DATA } from '../utils/constants'

export default class SocialFeedScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  renderContent = ({ item }) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.mainContainer}>

          <TouchableOpacity
          // onPress={({ item }) => this.renderProfile({profile})}
          >
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
              <View style={styles.innerHeaderContainer}>
                <Text style={{ marginLeft: 20 }}>{item.name}</Text>
                <Text style={{ marginLeft: 20 }}>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.post['image'] }}
              style={{ width: '100%', height: 300 }}
            />
            <View style={{ flexDirection: 'row', height: 50 }}>
              <Text>{item.post['caption']}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
            <Ionicons
              name="ios-heart-outline"
              size={30}
              color='#085947'
              style={{ paddingRight: 8 }}
            />

            <Ionicons
              name="ios-chatbubbles-outline"
              size={30}
              color='#085947'
              style={{ paddingRight: 8 }}
            />

            <Ionicons
              name="ios-paper-plane-outline"
              size={30}
              color='#085947'
            />
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
          renderItem={({ item }) => this.renderContent({ item })}
          keyExtractor={item => item.name}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  innerHeaderContainer: {

  },

  imageContainer: {
    flex: 1,
  }
});
