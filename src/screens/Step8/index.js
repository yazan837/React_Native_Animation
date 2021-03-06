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
    dispatch(updateSurveyResult(`step8,${value}`));
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
            source={require('../../assets/survey_8.jpg')}
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
              bottom: -165,
              left: -165,
              transform: [{rotate: spin}, {scale: scaleble}],
              opacity: fadeIn,
            }}
          />
          <Animated.View style={{opacity: fadeIn}}>
            <Text style={{fontSize: 38, color: '#F9A53A', textAlign: 'center'}}>
              {lang == 'en' ? 'What was your overall ' : '???? ?????????????? ?????????? '}
              <Text
                style={{
                  fontSize: lang == 'en' ? 44 : 40,
                  color: '#F9A53A',
                  textAlign: 'center',
                  color: '#e38f24',
                }}>
                {lang == 'en' ? 'impression of the pavilion?' : '???? ??????????????'}
              </Text>
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginVertical: lang == 'en' ? 10 : 50,
              }}>
              <TouchableOpacity
                onPress={() => (
                  setScreen(10),
                  _updateSurveyResult(lang == 'en' ? 'Excellent' : '????????????'),
                  playSound()
                )}
                activeOpacity={0.8}>
                <ImageBackground
                  style={styles.btnImage}
                  source={require('../../assets/survey_btn.png')}>
                  <Text style={styles.btnText} numberOfLines={2}>
                    {lang == 'en' ? 'Excellent' : '????????????'}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (
                  setScreen(10),
                  _updateSurveyResult(lang == 'en' ? 'Very Good' : '???????? ????????'),
                  playSound()
                )}
                activeOpacity={0.8}>
                <ImageBackground
                  style={styles.btnImage}
                  source={require('../../assets/survey_btn.png')}>
                  <Text style={styles.btnText} numberOfLines={2}>
                    {lang == 'en' ? 'Very Good' : '???????? ????????'}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (
                  setScreen(10),
                  _updateSurveyResult(lang == 'en' ? 'Good' : '????????'),
                  playSound()
                )}
                activeOpacity={0.8}>
                <ImageBackground
                  style={styles.btnImage}
                  source={require('../../assets/survey_btn.png')}>
                  <Text style={styles.btnText} numberOfLines={2}>
                    {lang == 'en' ? 'Good' : '????????'}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (
                  setScreen(10),
                  _updateSurveyResult(lang == 'en' ? 'Poor' : '??????????'),
                  playSound()
                )}
                activeOpacity={0.8}>
                <ImageBackground
                  style={styles.btnImage}
                  source={require('../../assets/survey_btn.png')}>
                  <Text style={styles.btnText} numberOfLines={2}>
                    {lang == 'en' ? 'Poor' : '??????????'}
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
