import { StackNavigator } from 'react-navigation';

import SocialFeedScreen from '../screens/SocialFeedScreen';
import CreatePost from '../screens/CreatePost'

export default StackNavigator({
  SocialFeed: {
    screen: SocialFeedScreen,
  },

  CreatPost: {
    screen: CreatePost,
  },
});