import { DrawerNavigator } from 'react-navigation';

import HomeTabs from './HomeTabs'

export const HomeNavigator = DrawerNavigator(
  {
    HomeTabs: {
      screen: HomeTabs,
    },
  },
  {
    initialRouteName: 'HomeTabs',
    mode: 'modal',
    headerMode: 'none'
  },
  {
    
  }
);