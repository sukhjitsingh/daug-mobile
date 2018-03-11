import React from 'react';
import { Platform } from 'react-native';

import { TabNavigator } from 'react-navigation';
import { SimpleLineIcons, Feather, MaterialIcons, Foundation } from '@expo/vector-icons';

import SocialFeedStack from './SocialFeedStack';
import ProfileStack from './ProfileStack';
import CreatePostStack from './CreatePostStack';

const HomeTabs = TabNavigator({
  SocialTab: {
    screen: SocialFeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => (
        <Foundation
          name='home'
          color={tintColor}
          size={Platform.OS === 'ios' ? 22 : 25}
        />
      )
    }
  },
  CreatePostTab: {
    screen: CreatePostStack,
    title: 'Create Post',
    navigationOptions: {
      tabBarLabel: 'Post',
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons
          name='add-box'
          color={tintColor}
          size={Platform.OS === 'ios' ? 22 : 25}
        />
      )
    }
  },
  ProfileTab: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Feather
          name='user'
          color={tintColor}
          size={Platform.OS === 'ios' ? 22 : 25}
        />
      )
    }
  },
}, {
    initialRouteName: 'SocialTab',
    tabBarPosition: 'bottom',
    animationEnabled: Platform.OS === 'ios' ? false : true,
    swipeEnabled: Platform.OS === 'ios' ? false : true,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: '#81542C',
      inactiveTintColor: '#999999',
      style: {
        backgroundColor: '#ffffff',
        padding: Platform.OS === 'ios' ? 5 : 0,
      },
      indicatorStyle: {
        backgroundColor: 'white'
      },
      labelStyle: {
        fontSize: 12
      }
    }
  });

export default HomeTabs;