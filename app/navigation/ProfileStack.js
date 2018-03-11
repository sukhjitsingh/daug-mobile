import { StackNavigator } from 'react-navigation';

import IntroScreen from '../screens/IntroScreen'
import EditProfile from '../screens/EditProfile'
import ProfileScreen from '../screens/ProfileScreen';
import PostDetailScreen from '../screens/PostDetailsScreen'

export default StackNavigator({
  Profile: {
    screen: ProfileScreen,
  },

  Logout: {
    screen: IntroScreen,
  },

  EditProfile: {
    screen: EditProfile,
  },

  PostDetailScreen: {
    screen: PostDetailScreen,
  }
});