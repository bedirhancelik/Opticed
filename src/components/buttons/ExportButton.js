import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import colors from '../../assets/colors';
import {icons} from '../assets/icons';

const ExportButton = ({onPress}) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image style={styles.image} source={icons.pdf} />
      </TouchableOpacity>
    </View>
  );
};

export default ExportButton;

const styles = StyleSheet.create({
  image: {
    height: 25,
    width: 25,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    backgroundColor: colors.black,
  },
});
