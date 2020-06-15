/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';

const Loader = ({loading}) => {
  return (
    <Modal visible={loading} transparent={true} animationType={'none'}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Text
            style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Cochin'}}>
            Recognizing
          </Text>
          <ActivityIndicator animating={loading} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#000000B0',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
