import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';

export default class SocialFeedScreen extends React.Component {

  renderContent() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={{ marginLeft: 20 }}>UserIcon</Text>
          <Text style={{ marginLeft: 20 }}>Name</Text>
        </View>
        <View style={{ backgroundColor: 'yellow', flex: 1 }}>
          <View style={{ backgroundColor: 'green', flexDirection: 'row', height: 300 }}>
            <Text>Image</Text>
          </View>
          <View style={{ backgroundColor: 'blue', flexDirection: 'row', height: 50 }}>
            <Text>Caption</Text>
          </View>
        </View>
        <View style={{ backgroundColor: 'pink', flexDirection: 'row', alignItems: 'center', height: 50 }}>
          <Text style={{ flex: 2, justifyContent: 'flex-start', marginLeft: 20 }}>2 Hours</Text>
          <Text style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 20 }}>Icon-10 Icon-20</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: 'gray', flex: 1 }}>
          {this.renderContent()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  headerContainer: {
    backgroundColor: 'red',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  }
});
