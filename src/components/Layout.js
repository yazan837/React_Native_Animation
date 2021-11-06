import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Animated,
  Easing,
} from 'react-native';

export default function Layout({children, page, lang}) {
  const spinValue = new Animated.Value(0);
  const animatedValueX1 = new Animated.Value(-230);
  const animatedValueX2 = new Animated.Value(-150);
  const animatedValueX3 = new Animated.Value(100);
  const animatedValueX4 = new Animated.Value(200);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 20000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValueX1, {
        toValue: 1,
        delay: 200,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValueX1, {
        toValue: -230,
        delay: 200,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValueX2, {
        toValue: 1,
        delay: 200,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValueX2, {
        toValue: -150,
        delay: 200,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValueX3, {
        toValue: 1,
        delay: 200,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValueX3, {
        toValue: 100,
        delay: 200,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValueX4, {
        toValue: 1,
        delay: 200,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValueX4, {
        toValue: 200,
        delay: 200,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../assets/wood_bg.png')}> */}
      {page == 'language' && (
        <Animated.Image
          source={require('../assets/pattern2.png')}
          style={{
            width: 220,
            height: 220,
            position: 'absolute',
            top: 70,
            left: 60,
            transform: [{rotate: spin}, {translateX: animatedValueX1}],
          }}
        />
      )}
      <Animated.Image
        source={require('../assets/pattern4.png')}
        style={{
          width: 175,
          height: 175,
          position: 'absolute',
          top: 10,
          right: 300,
          transform: [{rotate: spin}, {translateX: animatedValueX2}],
        }}
      />
      <Animated.Image
        source={require('../assets/pattern1.png')}
        style={{
          width: 300,
          height: 300,
          position: 'absolute',
          bottom: lang == 'ar' && page != 'language' ? 20 : 170,
          right: lang == 'ar' && page != 'language' ? 400 : 10,
          transform: [{rotate: spin}, {translateX: animatedValueX3}],
        }}
      />
      {page != 'language' && (
        <Animated.Image
          source={require('../assets/pattern3.png')}
          style={{
            width: 200,
            height: 200,
            position: 'absolute',
            bottom: 20,
            left: 400,
            transform: [{rotate: spin}, {translateX: animatedValueX3}],
          }}
        />
      )}
      {children}
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#963B23',
  },
});
