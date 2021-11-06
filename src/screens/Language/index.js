import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  PanResponder,
  BackHandler,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import aesjs from 'aes-js';
import styles from './styles';
import Text from '../../components/Text';
import Layout from '../../components/Layout';
import RNFS from 'react-native-fs';
import {setLanguage} from '../../redux/actions/homeAction';
import Sound from 'react-native-sound';
import NavigationService from '../../navigation/NavigationService';

export default function Language({setScreen}) {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.home.language);
  const sound = new Sound('preview.mp3', Sound.MAIN_BUNDLE);
  playSound = () => {
    sound.play(() => sound.release());
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
    outputRange: [1, 1.5],
  });

  const spinValue = new Animated.Value(0);

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
  const [shouldAppWork, setShouldAppWork] = useState(false);
  function onFileChange() {
    let filePath = RNFS.ExternalDirectoryPath + '/fsl.lal';
    RNFS.readFile(filePath, 'ascii')
      .then(res => {
        console.log(res);

        var encodedStringAtoB = res;
        var encodedDate = res;

        var key = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var iv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var encryptedBytes = aesjs.utils.hex.toBytes(encodedDate);
        var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
        var decryptedBytes = aesCbc.decrypt(encryptedBytes);
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

        console.log(decryptedText);
        var decodesToDay = new Date(decryptedText);
        var today = new Date();
        console.log('decodesToDay', decodesToDay);
        if (today > decodesToDay) {
          // alert('Fiji app is expired');
          setShouldAppWork(false);
          setTimeout(() => {
            BackHandler.exitApp();
          }, 3000);
          console.log('today is great than date');
        } else {
          console.log('today is less than day');
          if (res == '') {
            setShouldAppWork(false);
            setTimeout(() => {
              BackHandler.exitApp();
            }, 3000);
          } else {
            setShouldAppWork(true);
          }
        }
      })
      .catch(err => {
        // alert('Fiji app is expired');
        setTimeout(() => {
          BackHandler.exitApp();
        }, 3000);
        console.log(err.message, err.code);
      });
  }

  useEffect(() => {
    onFileChange();
  }, [shouldAppWork]);
  const timerId = useRef(false);
  const [timeForInactivityInSecond, setTimeForInactivityInSecond] = useState(
    10000,
  );

  useEffect(() => {
    resetInactivityTimeout();
  }, []);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        // console.log('user starts touch');
        resetInactivityTimeout();
      },
    }),
  ).current;

  const resetInactivityTimeout = () => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      // action after user has been detected idle
      setScreen(0);
    }, timeForInactivityInSecond * 1000);
  };
  return (
    <>
      {shouldAppWork ? (
        <ImageBackground
          style={styles.container}
          source={require('../../assets/bg1.png')}>
          <Animated.Image
            source={require('../../assets/pattern13.png')}
            useNativeDriver={true}
            style={{
              width: 450,
              height: 450,
              position: 'absolute',
              top: -170,
              right: -170,
              transform: [{rotate: spin}, {scale: scaleble}],
              opacity: fadeIn,
            }}
          />
          <Animated.Image
            source={require('../../assets/pattern14.png')}
            useNativeDriver={true}
            style={{
              width: 350,
              height: 350,
              position: 'absolute',
              bottom: -150,
              left: -150,
              transform: [{rotate: spin}, {scale: scaleble}],
              opacity: fadeIn,
            }}
          />
          <Animated.View
            delay={500}
            useNativeDriver={true}
            style={[styles.viewRow, {opacity: fadeIn}]}>
            <View style={styles.sideView}>
              <Image
                source={require('../../assets/ethiopia-en.png')}
                style={{height: 200, width: 300}}
                resizeMode="contain"
              />
              {/* <Text style={[styles.subtitle, {fontFamily: 'ShurikenStd-Boy'}]}>
                Ethiopia
              </Text>
              <Text style={styles.description}>
                Land Of Origins And Opportunities
              </Text> */}
            </View>

            <View style={styles.block}>
              <View>
                <Text style={styles.title}>Share your</Text>
                <Text style={styles.title}>Experience with us</Text>
              </View>
              <View style={{marginVertical: 50}}>
                <Text style={[styles.title, {textAlign: 'right'}]}>
                  شارك تجربتك معنا
                </Text>
              </View>
              <View style={styles.btnView} {...panResponder.panHandlers}>
                <TouchableOpacity
                  onPress={() => (
                    dispatch(setLanguage('en')), setScreen(1), playSound()
                  )}
                  activeOpacity={0.8}>
                  <ImageBackground
                    style={{
                      width: 200,
                      height: 200,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    source={require('../../assets/lang_btn.png')}>
                    <Text style={styles.btnText}>English</Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => (
                    dispatch(setLanguage('ar')), setScreen(1), playSound()
                  )}
                  style={styles.button}
                  activeOpacity={0.8}>
                  <ImageBackground
                    style={{
                      width: 200,
                      height: 200,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    source={require('../../assets/lang_btn.png')}>
                    <Text style={styles.btnText}>العربية</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.sideView, {alignSelf: 'flex-end'}]}>
              <Image
                source={require('../../assets/ethiopia-ar.png')}
                style={{height: 200, width: 200}}
                resizeMode="contain"
              />
              {/* <Text style={styles.subtitle}>إثيوبيا</Text>
              <Text style={styles.description}>أرض المنشأ والفرص</Text> */}
            </View>
          </Animated.View>
        </ImageBackground>
      ) : null}
    </>
  );
}
