import {StyleSheet} from 'react-native';
import {BW} from '../../consts';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#963B23',
  },
  sideView: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 50,
  },
  subtitle: {
    fontSize: 57,
    color: '#fff',
  },
  description: {
    fontSize: 17,
    color: '#fff',
  },
  viewRow: {flex: 1, width: '100%', paddingHorizontal: 50},
  block: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: '#F9A53A',
    fontSize: 54,
    textAlign: 'left',
    fontFamily: 'AraJozoor-Regular',
  },
  btnView: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  btnText: {
    color: '#FFD297',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default styles;
