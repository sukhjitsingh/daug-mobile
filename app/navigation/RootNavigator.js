import { SwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import IntroStack from './IntroStack'
import HomeTabs from './HomeTabs'

export default SwitchNavigator(
  {
    Landing: AuthLoadingScreen,
    Intro: IntroStack,
    Home: HomeTabs,
  },
  {
    initialRouteName: 'Landing',
    mode: 'modal',
    headerMode: 'none'
  });