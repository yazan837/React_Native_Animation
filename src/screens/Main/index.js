import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  I18nManager,
  PanResponder,
} from 'react-native';
import aesjs from 'aes-js';
import RNFS from 'react-native-fs';
import styles from './styles';
import {useSelector} from 'react-redux';
// screen
import Language from '../Language';
import UserInfo from '../UserInfo';
import Step1 from '../Step1';
import Step2 from '../Step2';
import Step3 from '../Step3';
import Step4 from '../Step4';
import Step5 from '../Step5';
import Step6 from '../Step6';
import Step7 from '../Step7';
import Step8 from '../Step8';
import Final from '../Final';

export default function Main() {
  const [Screen, setScreen] = useState(0);
  return (
    <>
      {Screen == 0 ? (
        <Language setScreen={setScreen} />
      ) : Screen == 1 ? (
        <UserInfo setScreen={setScreen} />
      ) : Screen == 2 ? (
        <Step1 setScreen={setScreen} />
      ) : Screen == 3 ? (
        <Step2 setScreen={setScreen} />
      ) : Screen == 4 ? (
        <Step3 setScreen={setScreen} />
      ) : Screen == 5 ? (
        <Step4 setScreen={setScreen} />
      ) : Screen == 6 ? (
        <Step5 setScreen={setScreen} />
      ) : Screen == 7 ? (
        <Step6 setScreen={setScreen} />
      ) : Screen == 8 ? (
        <Step7 setScreen={setScreen} />
      ) : Screen == 9 ? (
        <Step8 setScreen={setScreen} />
      ) : Screen == 10 ? (
        <Final setScreen={setScreen} />
      ) : null}
    </>
  );
}
