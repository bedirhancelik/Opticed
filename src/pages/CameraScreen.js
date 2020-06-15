/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */

import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import CameraButton from '../components/buttons/CameraButton';
import GalleryButton from '../components/buttons/GalleryButton';

const CameraScreen = ({navigation}) => {
  navigation.setOptions({
    headerShown: false,
  });
  const camera = useRef(null);
  const [imageUri, setImageUri] = useState('');

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: false};
      const data = await camera.current
        ?.takePictureAsync(options)
        .then(data => {
          setImageUri(data === undefined ? '' : data.uri);
        })
        .catch(error => {
          window.alert(error);
        });
    }
  };
  const chooseImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.path;
        console.log(source);
        setImageUri(source);
      }
    });
  };
  return imageUri === '' ? (
    <View style={styles.container}>
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Kamera izni gerekiyor',
          message: 'Kamera ile fotoğraf çekmek için izin vermeniz gerekiyor.',
          buttonPositive: 'Tamam',
          buttonNegative: 'İptal',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Mikrofon izni gerekiyor',
          message:
            'Mikrofon ile ses kaydı yapmak için izin vermeniz gerekiyor.',
          buttonPositive: 'Tamam',
          buttonNegative: 'İptal',
        }}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.galeri}>
          <GalleryButton onPress={chooseImage} />
        </View>
        <View style={styles.camera}>
          <CameraButton onPress={takePicture} />
        </View>
      </View>
    </View>
  ) : (
    <View style={{flex: 1}}>
      {navigation.navigate('Confirm', {imageUri: imageUri})}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 50,
  },
  galeri: {marginLeft: 50},
  camera: {marginRight: 150},
});
export default CameraScreen;
