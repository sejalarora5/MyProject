import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {WebView} from 'react-native-webview';
import {Button} from 'react-native';

const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);
  return (
    <View style={{flex: 1}}>
      <WebView
        ref={webViewRef}
        source={{
          uri: 'https://www.facebook.com/',
        }}
      />
      <Button
        title="Reload"
        onPress={() => {
          webViewRef.current?.reload();
        }}
      />
      <Button
        title="Back"
        onPress={() => {
          webViewRef.current?.goBack();
        }}
      />
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({});
