import {StyleSheet} from 'react-native';
import {BW} from '../../consts';

const styles = StyleSheet.create({
  imageContainer: {
    height: '33%',
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: '#309059',
    zIndex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 170,
  },
  btnImage: {
    width: 140,
    height: 140,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFD297',
    fontSize: 16,
    textAlign: 'center',
    width: 110,
  },
});

export default styles;
