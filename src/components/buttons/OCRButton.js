import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import colors from '../../assets/colors';
import {icons} from '../assets/icons';

const OCRButton = ({onPress}) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image style={styles.image} source={icons.ocr} />
      </TouchableOpacity>
    </View>
  );
};

export default OCRButton;

const styles = StyleSheet.create({
  image: {
    height: 35,
    width: 35,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    backgroundColor: colors.black,
    borderRadius: 30,
    elevation: 5,
  },
});
