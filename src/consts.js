import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

export const BW = width / 300;
export const H = height / 600;

export const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
    },
    android: {
      elevation: 5,
    },
  }),
};
