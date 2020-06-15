/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
// import ConfirmScreen from '../pages/ConfirmScreen';
import colors from '../assets/colors';

const Card = ({filename, path}) => {
  const exactPath = 'file://' + path;
  return (
    <View style={styles.ProductCard}>
      <View style={styles.productimage}>
        <Image source={{uri: exactPath}} style={{width: 110, height: 110}} />
      </View>

      <View style={styles.productname}>
        <Text style={styles.producttext}>{filename}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProductCard: {
    backgroundColor: colors.white,
    paddingLeft: 10,
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  productimage: {
    height: 110,
    width: 110,
  },
  productname: {
    height: 110,
    width: 200,
    padding: 5,
  },
  producttext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Card;
