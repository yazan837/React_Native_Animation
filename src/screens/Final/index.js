import React, {useEffect} from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  Animated,
  Easing,
  PermissionsAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import {useDispatch, useSelector} from 'react-redux';
import NavigationService from '../../navigation/NavigationService';
import {resetSurveyResult} from '../../redux/actions/homeAction';
import FullScreen from '../../FullScreen';
FullScreen.enable();
import styles from './styles';
import Text from '../../components/Text';
import reactotron from 'reactotron-react-native';

export default function Language({setScreen}) {
  const dispatch = useDispatch();
  const survey = useSelector(state => state.home.survey);
  const lang = useSelector(state => state.home.language);

  useEffect(() => {
    const saveFile = async (text, fileName) => {
      let dirs = RNFetchBlob.fs.dirs;
      const path =
        Platform.OS === 'ios'
          ? `${dirs.DocumentDir}/survey/Result.CSV`
          : `${dirs.DownloadDir}/survey/Result.CSV`;
      reactotron.log('path', path);
      try {
        if (Platform.OS !== 'ios') {
          const canDownload = await requestCameraPermission();

          if (!canDownload) {
            return '';
          }
        }
      } catch {
        return '';
      }

      RNFetchBlob.fs.appendFile(path, text);
      console.log('path', path);
      return path;
    };

    const path = saveFile(survey, 'Result');
    reactotron.log('suuu', path);
    setTimeout(() => {
      dispatch(resetSurveyResult());
      setScreen(0);
    }, 7000);
  }, []);

  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 20000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const fadeIn = new Animated.Value(0);

  Animated.timing(fadeIn, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
  }).start();

  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  return (
    <>
      <StatusBar hidden />
      <View style={{flex: 1, backgroundColor: '#FFD297'}}>
        <ImageBackground
          style={styles.main}
          source={require('../../assets/final.jpg')}>
          <Animated.Image
            source={require('../../assets/pattern13.png')}
            useNativeDriver={true}
            style={{
              width: 450,
              height: 450,
              position: 'absolute',
              top: -220,
              right: -220,
              transform: [{rotate: spin}],
              opacity: fadeIn,
            }}
          />
          <Animated.View style={{opacity: fadeIn, flex: 1}}>
            <View style={{marginTop: '35%'}}>
              <Text style={{color: '#963B23', fontSize: 28}}>
                {lang === 'en'
                  ? 'Thank you for sharing your feedback.'
                  : 'شكراً لكم على مشاركة ملاحظاتكم معنا.'}
              </Text>
              <Text style={{color: '#963B23', fontSize: 28, marginTop: 20}}>
                {lang === 'en'
                  ? 'We look forward to welcoming you to Ethiopia \nthe Land Of Origins And Opportunities.'
                  : '.في انتظار زيارتكم لأرض الفرص والأصالة'}
              </Text>
            </View>

            <View
              style={{
                marginTop: '18%',
                flexDirection: lang == 'en' ? 'row' : 'row-reverse',
              }}>
              <Image
                source={require('../../assets/location.png')}
                style={{width: 25, height: 25, tintColor: '#fff'}}
              />
              <Text style={{color: '#fff', fontSize: 22, marginHorizontal: 10}}>
                {lang === 'en'
                  ? 'Simien Mountains National Park'
                  : 'منتزه جبال سيمين الوطنية'}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                flexDirection: lang == 'en' ? 'row' : 'row-reverse',
              }}>
              {lang == 'ar' ? (
                <View style={[styles.sideView, {alignSelf: 'flex-end'}]}>
                  <Image
                    source={require('../../assets/ethiopia-ar.png')}
                    style={{height: 200, width: 200}}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <View style={styles.sideView}>
                  <Image
                    source={require('../../assets/ethiopia-en.png')}
                    style={{height: 300, width: 300}}
                    resizeMode="contain"
                  />
                  {/* <Text
                    style={[styles.subtitle, {fontFamily: 'ShurikenStd-Boy'}]}>
                    Ethiopia
                  </Text>
                  <Text style={styles.description}>
                    Land Of Origins And Opportunities
                  </Text> */}
                </View>
              )}
            </View>
          </Animated.View>
        </ImageBackground>
      </View>
    </>
  );
}
