import { StackNavigator } from 'react-navigation';

import SocialFeedScreen from '../screens/SocialFeedScreen';
import CreatePost from '../screens/CreatePost'
import ProfileScreen from '../screens/ProfileScreen'
import PostDetailsScreen from '../screens/PostDetailsScreen'

export default StackNavigator(
  {
    SocialFeed: {
      screen: SocialFeedScreen,
    },

    Profile: {
      screen: ProfileScreen,
    },

    PostDetailsScreen: {
      screen: PostDetailsScreen,
    },
  },
  {
    initialRouteName: 'SocialFeed',
  });