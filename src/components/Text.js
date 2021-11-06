import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default ({style, bold, ...props}) => {
  let currentStyle = [styles.defaultTextStyle];
  if (Array.isArray(style)) {
    currentStyle = [...currentStyle, ...style];
  } else {
    currentStyle = [...currentStyle, style];
  }

  //   if (bold) {
  //     currentStyle = [...currentStyle, {fontFamily: AppStyles.fonts.FONT_BOLD}];
  //   }

  return <Text style={currentStyle} {...props} />;
};

const styles = StyleSheet.create({
  defaultTextStyle: {
    fontFamily: 'AraJozoor-Regular',
  },
});
