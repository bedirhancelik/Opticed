import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {icons} from '../assets/icons';
import colors from '../../assets/colors';

const GalleryButton = ({onPress}) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image style={styles.image} source={icons.gallery} />
      </TouchableOpacity>
    </View>
  );
};

export default GalleryButton;

const styles = StyleSheet.create({
  image: {
    height: 25,
    width: 25,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    backgroundColor: colors.black,
    borderRadius: 30,
    elevation: 5,
  },
});
