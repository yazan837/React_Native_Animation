import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import NavigationService from '../../navigation/NavigationService';

import styles from './styles';
import Text from '../../components/Text';
import Sound from 'react-native-sound';
import {updateSurveyResult} from '../../redux/actions/homeAction';

export default function Language({setScreen}) {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.home.language);
  const sound = new Sound('preview.mp3', Sound.MAIN_BUNDLE);
  playSound = () => {
    sound.play(() => sound.reset());
  };
  const sizeValue = new Animated.Value(0);

  Animated.loop(
    Animated.sequence([
      Animated.timing(sizeValue, {
        toValue: 1,
        delay: 100,
        duration: 10000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(sizeValue, {
        toValue: 0,
        delay: 100,
        duration: 10000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  const scaleble = sizeValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const spinValue = new Animated.Value(0);

  const _updateSurveyResult = value => {
    dispatch(updateSurveyResult(`step4,${value}`));
  };

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 40000,
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

  return (
    <>
      <StatusBar hidden />
      <View style={{flex: 1, backgroundColor: '#963D22'}}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/survey_4.jpg')}
            style={styles.image}
          />
        </View>

        <ImageBackground
          style={styles.main}
          source={require('../../assets/step2.png')}>
          <Animated.Image
            source={require('../../assets/pattern5.png')}
            style={{
              width: 450,
              height: 450,
              position: 'absolute',
              top: -220,
              right: -220,
              transform: [{rotate: spin}, {scale: scaleble}],
              opacity: fadeIn,
            }}
          />
          <Animated.Image
            source={require('../../assets/pattern5.png')}
            style={{
              width: 350,
              height: 350,
              position: 'absolute',
              bottom: -160,
              left: -160,
              transform: [{rotate: spin}, {scale: scaleble}],
              opacity: fadeIn,
            }}
          />
          <Animated.View style={{opacity: fadeIn}}>
            {/* <Text
              style={{
                fontSize: 38,
                color: '#F9A53A',
                textAlign: 'center',
              }}>
              {lang == 'en'
                ? 'How was your experience discovering our'
                : 'كيف كانت تجربتك في اكتشاف'}
            </Text>
            <Text
              style={{
                fontSize: lang == 'en' ? 38 : 40,
                color: '#F9A53A',
                textAlign: 'center',
              }}>
              {lang == 'en' ? 'export products?' : 'منتجات التصدير لدينا؟'}
            </Text> */}
            <Text style={{fontSize: 38, color: '#F9A53A', textAlign: 'center'}}>
              {lang == 'en'
                ? 'How was your experience discovering our'
                : 'كيف كانت تجربتك أثناء التعرف على'}{' '}
            </Text>
            <Text
              style={{
                fontSize: lang == 'en' ? 38 : 40,
                color: '#e38f24',
                textAlign: 'center',
              }}>
              {lang == 'en' ? 'export products?' : 'منتجات التصدير لدينا؟'}
            </Text>
            <View style={{flexDirection: 'row', marginVertical: 50}}>
              <TouchableOpacity
                onPress={() => (
                  _updateSurveyResult(lang == 'en' ? 'Excellent' : 'ممتازة'),
                  setScreen(6),
                  playSound()
                )}
                activeOpacity={0.8}>
                <ImageBackground
                  style={styles.btnImage}
                  source={require('../../assets/survey_btn.png')}>
                  <Text style={styles.btnText} numberOfLines={2}>
                    {lang == 'en' ? 'Excellent' : 'ممتازة'}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (
                  setScreen(6),
                  _updateSurveyResult(lang == 'en' ? 'Very Good' : 'جيدة جداَ'),
                  playSound()
                )}
                activeOpacity={0.8}>
                <ImageBackground
                  style={styles.btnImage}
                  source={require('../../assets/survey_btn.png')}>
                  <Text style={styles.btnText} numberOfLines={2}>
                    {lang == 'en' ? 'Very Good' : 'جيدة جداَ'}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (
                  setScreen(6),
                  _updateSurveyResult(lang == 'en' ? 'Good' : 'جيدة'),
                  playSound()
                )}
                activeOpacity={0.8}>
                <ImageBackground
                  style={styles.btnImage}
                  source={require('../../assets/survey_btn.png')}>
                  <Text style={styles.btnText} numberOfLines={2}>
                    {lang == 'en' ? 'Good' : 'جيدة'}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (
                  setScreen(6),
                  _updateSurveyResult(lang == 'en' ? 'Poor' : 'ضعيفة'),
                  playSound()
                )}
                activeOpacity={0.8}>
                <ImageBackground
                  style={styles.btnImage}
                  source={require('../../assets/survey_btn.png')}>
                  <Text style={styles.btnText} numberOfLines={2}>
                    {lang == 'en' ? 'Poor' : 'ضعيفة'}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ImageBackground>
      </View>
    </>
  );
}
