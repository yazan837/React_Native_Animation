import {StyleSheet} from 'react-native';
import {BW} from '../../consts';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFD297',
  },
  viewRow: {
    flex: 1,
    minWidth: '100%',
    paddingHorizontal: 50,
    marginTop: 75,
  },
  block: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: '#E55E26',
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'AraJozoor-Regular',
  },
  btnView: {
    alignSelf: 'center',
  },
  btnText: {
    color: '#FFD297',
    fontSize: 22,
    textAlign: 'center',
    width: 110,
  },
  textInput: {
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: '#F9A53A',
    width: 350,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});

export default styles;
