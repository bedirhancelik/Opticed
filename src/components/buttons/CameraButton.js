import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {icons} from '../assets/icons';
import colors from '../../assets/colors';
const CameraButton = ({onPress}) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image style={styles.image} source={icons.camera} />
      </TouchableOpacity>
    </View>
  );
};
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
export default CameraButton;
