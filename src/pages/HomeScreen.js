/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, PermissionsAndroid} from 'react-native';
import colors from '../assets/colors';
import CameraButton from '../components/buttons/CameraButton';
import RNFetchBlob from 'rn-fetch-blob';
import Card from '../components/Card';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
  navigation.setOptions({
    title: 'Opticed',
    headerStyle: {
      backgroundColor: colors.black,
      height: 50,
    },
    headerTitleAlign: 'center',
    headerTintColor: colors.white,
    headerTitleStyle: {
      fontFamily: 'Cochin',
      fontWeight: 'bold',
      fontSize: 30,
    },
  });
  const [folderArray, setfolderArray] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const pictureFolder = `${RNFetchBlob.fs.dirs.PictureDir}/Opticed`;

  const retrieveArray = async () => {
    const arr = await RNFetchBlob.fs.lstat(pictureFolder);
    console.log('folderArray output ', folderArray);
    setfolderArray(arr);
  };

  const createFolder = () => {
    RNFetchBlob.fs.exists(pictureFolder).then(exist => {
      if (!exist) {
        RNFetchBlob.fs.mkdir(pictureFolder);
        RNFetchBlob.config({path: pictureFolder + '/hitabe.jpg'}).fetch(
          'GET',
          'https://i.pinimg.com/originals/d4/9d/78/d49d78af16fc94c892d2018001fa7ddb.jpg',
          {
            'Cache-Control': 'no-store',
          },
        );
      } else {
        console.log('Opticed klasörü var');
      }
    });
  };

  const requestFilePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Opticed File Access Permission',
          message:
            'Opticed needs access to your file system ' +
            'so you can save your pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        createFolder();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestFilePermission();
    retrieveArray();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {folderArray &&
          folderArray.map(item => (
            <TouchableOpacity
              key={item.filename}
              onPress={() =>
                navigation.navigate('Confirm', {imageUri: item.path})
              }>
              <Card {...item} navigation={navigation} />
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View style={styles.button}>
        <CameraButton onPress={() => navigation.navigate('Camera')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: colors.gray,
  },
  button: {
    width: '100%',
    position: 'absolute',
    bottom: 25,
    right: 0,
    left: 125,
    alignItems: 'center',
  },
});

export default HomeScreen;
