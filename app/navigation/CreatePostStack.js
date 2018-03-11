import { StackNavigator } from 'react-navigation';

import SocialFeedScreen from '../screens/SocialFeedScreen';
import CreatePost from '../screens/CreatePost'
import ProfileScreen from '../screens/ProfileScreen'

export default StackNavigator({
  CreatPost: {
    screen: CreatePost,
  },

  SocialFeed: {
    screen: SocialFeedScreen,
  },

  Profile: {
    screen: ProfileScreen,
  },
},
{
  mode: 'modal',
});