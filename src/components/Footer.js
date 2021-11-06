import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import NavigationService from '../navigation/NavigationService';

import Text from './Text';

const Footer = ({style, handleBack, lang, handleHome}) => {
  return (
    <View
      style={[
        styles.footer,
        style,
        lang == 'ar' && {flexDirection: 'row-reverse'},
      ]}>
      <View>
        <Text
          style={[
            styles.subtitle,
            {fontFamily: 'ShurikenStd-Boy'},
            lang == 'ar' && {
              textAlign: 'center',
              fontFamily: 'Mothanna-Bold',
              fontSize: 57,
            },
          ]}>
          {lang == 'en' ? 'Ethiopia' : 'إثيوبيا'}
        </Text>
        <Text style={styles.description}>
          {lang == 'en'
            ? 'Land of origins and opportunities'
            : 'أرض المنشأ والفرص'}
        </Text>
      </View>
      <View style={{flexDirection: lang == 'en' ? 'row' : 'row-reverse'}}>
        <TouchableOpacity
          onPress={() =>
            handleBack ? handleBack() : NavigationService.goBack()
          }
          style={styles.footerBtn}>
          <Image
            style={{width: 65, height: 65}}
            source={require('../assets/back.png')}
          />
          <Text style={{color: '#fff', marginTop: 5, fontSize: 20}}>
            {lang == 'en' ? 'Back' : 'رجوع'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleHome ? handleHome() : NavigationService.navigate('Language')
          }
          style={styles.footerBtn}>
          <Image
            style={{width: 65, height: 67}}
            source={require('../assets/home.png')}
          />
          <Text style={{color: '#fff', marginTop: 5, fontSize: 20}}>
            {lang == 'en' ? 'Home' : 'الرئيسية'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    bottom: 40,
  },
  subtitle: {
    fontSize: 57,
    justifyContent: 'flex-end',
    color: '#fff',
  },
  description: {
    fontSize: 18,
    color: '#fff',
  },
  footerBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 35,
  },
});

export default Footer;
