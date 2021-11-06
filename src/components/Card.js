import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import NavigationService from '../navigation/NavigationService';
import * as Animatable from 'react-native-animatable';

import Text from './Text';

const Card = ({item, style, lang}) => {
  return (
    <Animatable.View
      style={{
        height: 325,
        width: 160,
        margin: 10,
      }}
      useNativeDriver={true}
      animation="fadeInUp"
      delay={10}>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => NavigationService.navigate('Category')}>
        <View style={{flex: 5}}>
          <Image style={{height: '100%', width: '100%'}} source={item.image} />
        </View>
        <View
          style={{
            flex: 1,
            borderTopWidth: 1,
            borderTopColor: '#000',
            backgroundColor: '#BB2026',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', color: '#fff'}}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({});

export default Card;
