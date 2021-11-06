import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';
import Text from '../../components/Text';
import Layout from '../../components/Layout';
import NavigationService from '../../navigation/NavigationService';
import Sound from 'react-native-sound';
import FullScreen from '../../FullScreen';
FullScreen.enable();
import {setLanguage, updateSurveyResult} from '../../redux/actions/homeAction';

export default function Language({setScreen}) {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.home.language);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  var empty = new Sound('empty.mp3', Sound.MAIN_BUNDLE, () => {
    empty.play(() => empty.reset());
  });

  const sound = new Sound('preview.mp3', Sound.MAIN_BUNDLE);
  playSound = () => {
    sound.play();
  };
  let fadeIn = null;
  useEffect(() => {
    fadeIn = new Animated.Value(0);

    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

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
    outputRange: [1, 1.5],
  });

  const spinValue = new Animated.Value(0);

  const _updateSurveyResult = () => {
    playSound();
    dispatch(updateSurveyResult(`Name: ${name},Age: ${age},Email: ${email}`));
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

  const _startServuy = () => {
    setNameError(false);
    setAgeError(false);
    setEmailError(false);
    if (!name) {
      setNameError(true);
      return;
    }
    if (!age) {
      setAgeError(true);
      return;
    }
    if (!email) {
      setEmailError(true);
      return;
    }
    let regEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!regEmail.test(email)) {
      setEmailError(true);
      return;
    }
    setScreen(2);

    _updateSurveyResult();
    setName('');
    setAge('');
    setEmail('');
  };

  useEffect(() => {
    sound.release();
  }, []);
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/userInfo_bg.jpeg')}>
      <Animated.Image
        source={require('../../assets/pattern7.png')}
        style={[
          {
            width: 450,
            height: 450,
            position: 'absolute',
            transform: [{rotate: spin}, {scale: scaleble}],
            top: -200,
            opacity: fadeIn,
          },
          lang == 'en' ? {right: -220} : {left: -220},
        ]}
      />
      <Animated.Image
        source={require('../../assets/pattern8.png')}
        style={[
          {
            width: 350,
            height: 350,
            position: 'absolute',
            bottom: -150,
            transform: [{rotate: spin}, {scale: scaleble}],
            opacity: fadeIn,
          },
          lang == 'en' ? {left: -150} : {right: -150},
        ]}
      />
      <Animated.View style={{opacity: fadeIn}}>
        <View style={styles.viewRow}>
          <View style={styles.block}>
            <View>
              <Text
                style={[
                  styles.title,
                  {fontSize: 22, marginBottom: 15},
                  lang == 'ar' && {textAlign: 'right'},
                ]}>
                {lang == 'en'
                  ? 'Thank you for visiting our pavilion.'
                  : 'نشكركم على زيارة جناحنا.'}
              </Text>
              <Text
                style={[
                  styles.title,
                  {marginBottom: 15},
                  lang == 'ar' && {textAlign: 'right'},
                ]}>
                {lang == 'en'
                  ? 'We hope you have enjoyed a truly authentic Ethiopian experience, and\nwe would love to hear your feedback in the following survey.'
                  : 'نتمنى أن تكونوا قد استمتعتم بالتجربة الإثيوبية الأصيلة في جناحنا،\n ونرغب في معرفة ملاحظاتكم من خلال الاستطلاع التالي.'}
              </Text>
              <Text
                style={[styles.title, lang == 'ar' && {textAlign: 'right'}]}>
                {lang == 'en'
                  ? 'Before we start, please fill in your personal information below.*'
                  : 'قبل بداية الاستطلاع، يُرجى تسجيل البيانات الشخصية أدناه. *'}
              </Text>
            </View>
            <View style={{marginVertical: 50}}>
              {nameError && (
                <Text style={{alignSelf: 'center', color: 'red'}}>
                  {lang == 'en'
                    ? 'Please Enter Your Name'
                    : 'من فضلك أدخل اسمك'}
                </Text>
              )}
              <View
                style={[
                  styles.textInput,
                  lang == 'ar' && {flexDirection: 'row-reverse'},
                ]}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#963B23',
                    width: '20%',
                  }}>
                  {lang == 'en' ? 'Name:' : 'الاسم:'}
                </Text>
                <TextInput
                  style={[
                    {
                      fontSize: 18,
                      color: '#963B23',
                      width: lang == 'en' ? '70%' : '80%',
                    },
                    lang == 'ar' && {textAlign: 'right'},
                  ]}
                  onChangeText={text => setName(text)}
                  value={name}
                />
              </View>
              {ageError && (
                <Text style={{alignSelf: 'center', color: 'red'}}>
                  {lang == 'en' ? 'Please Enter Your Age' : 'من فضلك أدخل عمرك'}
                </Text>
              )}
              <View
                style={[
                  styles.textInput,
                  lang == 'ar' && {flexDirection: 'row-reverse'},
                ]}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#963B23',
                    width: '20%',
                  }}>
                  {lang == 'en' ? 'Age:' : 'العمر:'}
                </Text>
                <TextInput
                  style={[
                    {
                      fontSize: 18,
                      color: '#963B23',
                      width: 'en' ? '70%' : '80%',
                    },
                    lang == 'ar' && {textAlign: 'right'},
                  ]}
                  type={''}
                  onChangeText={text => setAge(text)}
                  value={age}
                  keyboardType="numeric"
                />
              </View>
              {emailError && (
                <Text style={{alignSelf: 'center', color: 'red'}}>
                  {lang == 'en'
                    ? 'Please Enter Valid Email'
                    : 'الرجاء إدخال بريد إلكتروني صحيح'}
                </Text>
              )}
              <View
                style={[
                  styles.textInput,
                  lang == 'ar' && {
                    flexDirection: 'row-reverse',
                    // height: 60,
                  },
                ]}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#963B23',
                    width: lang == 'en' ? '20%' : '40%',
                  }}>
                  {lang == 'en' ? 'Email:' : 'البريد الالكتروني:'}
                </Text>
                <TextInput
                  style={[
                    {
                      fontSize: 18,
                      color: '#963B23',
                      width: '70%',
                    },
                    lang == 'ar' && {textAlign: 'right'},
                  ]}
                  onChangeText={text => setEmail(text)}
                  value={email}
                />
              </View>
            </View>

            <View style={styles.btnView}>
              <TouchableOpacity
                onPress={_startServuy}
                style={styles.button}
                activeOpacity={0.8}>
                <ImageBackground
                  style={{
                    width: 225,
                    height: 225,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  source={require('../../assets/lang_btn.png')}>
                  <Text style={styles.btnText} numberOfLines={2}>
                    {lang == 'en' ? 'Start The Survey' : 'بدء الاستبيان'}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </ImageBackground>
  );
}
