/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, ToastAndroid} from 'react-native';
import colors from '../assets/colors';
import CopyButton from '../components/buttons/CopyButton';
import SaveButton from '../components/buttons/SaveButton';
import ExportButton from '../components/buttons/ExportButton';
import Clipboard from '@react-native-community/clipboard';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const ResultScreen = ({navigation, route}) => {
  const {detectedText} = route.params.detectedText;
  const {imageUri} = route.params.imageUri;
  const [copiedText, setCopiedText] = useState(detectedText);
  console.log('Result screen route params: ', route.params);

  navigation.setOptions({
    title: 'Detected Text',
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
    headerRight: () => (
      <View style={{flexDirection: 'row'}}>
        <CopyButton onPress={copyToClipboard} />
        <SaveButton onPress={saveImage} />
        <ExportButton onPress={createPDF} />
      </View>
    ),
  });

  const copyToClipboard = async () => {
    await Clipboard.setString(copiedText);
    ToastAndroid.showWithGravity(
      'Copied to Clipboard',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const createPDF = async () => {
    let options = {
      html: `<p style="text-align: center;">${copiedText}</p>`,
      fileName: `${'Opticed ' + moment().unix()}`,
      directory: `${RNFetchBlob.fs.dirs.DocumentDir}`,
    };
    let file = await RNHTMLtoPDF.convert(options);
    ToastAndroid.showWithGravity(
      `PDF created at ${file.filePath}`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const saveImage = async () => {
    if (!imageUri.includes('Opticed')) {
      await RNFetchBlob.fs.cp(
        imageUri,
        `${RNFetchBlob.fs.dirs.PictureDir}/Opticed/${'Opticed ' +
          moment().unix()}.jpg`,
      );
      ToastAndroid.showWithGravity(
        'Image saved!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      ToastAndroid.showWithGravity(
        'Image already saved!',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.detectedText}
        defaultValue={detectedText}
        multiline={true}
        textAlignVertical="top"
        onChangeText={text => setCopiedText(text)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detectedText: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    fontSize: 20,
    backgroundColor: colors.gray,
  },
});
export default ResultScreen;
