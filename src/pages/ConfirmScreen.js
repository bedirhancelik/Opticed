import React, {useState} from 'react';
import {StyleSheet, View, ImageBackground, ToastAndroid} from 'react-native';
import colors from '../assets/colors';
import OCRButton from '../components/buttons/OCRButton';
import vision from '@react-native-firebase/ml-vision';
import Loader from '../components/Loader';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import SaveButton from '../components/buttons/SaveButton';

const ConfirmScreen = ({navigation, route}) => {
  const [detectedText, setDetectedText] = useState(null);
  const [loading, setLoading] = useState(false);

  navigation.setOptions({
    title: 'Confirm Image',
    headerStyle: {
      backgroundColor: colors.black,
      height: 50,
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
      fontFamily: 'Cochin',
      fontWeight: 'bold',
      fontSize: 20,
    },
    headerRight: () => <SaveButton onPress={saveImage} />,
  });

  let imageUri;
  route.params.imageUri.startsWith('/')
    ? (imageUri = 'file://' + route.params.imageUri)
    : (imageUri = route.params.imageUri);
  console.log('Confirm Screen imageUri', imageUri);

  async function handleOCR() {
    setLoading(true);
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(
      imageUri,
    );
    setDetectedText(processed.text);
    setLoading(false);
  }

  async function saveImage() {
    if (!imageUri.includes('Opticed')) {
      await RNFetchBlob.fs.cp(
        imageUri,
        `${RNFetchBlob.fs.dirs.PictureDir}/Opticed/${'Opticed ' +
          moment().unix()}.jpg`,
      );
      ToastAndroid.showWithGravity(
        'Image Saved',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      ToastAndroid.showWithGravity(
        'Image already Saved',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  }
  return (
    <View style={{backgroundColor: colors.gray}}>
      <Loader loading={loading} />
      {detectedText &&
        navigation.navigate('Result', {
          detectedText: {detectedText},
          imageUri: {imageUri},
        })}
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="contain"
        source={{uri: imageUri}}
      />
      <View style={styles.ocrButton}>
        <OCRButton onPress={handleOCR} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  ocrButton: {
    width: '100%',
    position: 'absolute',
    bottom: 25,
    right: 0,
    left: 125,
    alignItems: 'center',
  },
  Button: {
    width: '100%',
    position: 'absolute',
    bottom: 25,
    right: 0,
    left: 50,
    alignItems: 'center',
  },
});

export default ConfirmScreen;
